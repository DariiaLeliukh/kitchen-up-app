require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const usersQuery = require('./database/queries/users');
const invitationsQuery = require("./database/queries/invitations");
const recipeListQuery = require("./database/queries/recipe_lists");
const groceryListQuery = require("./database/queries/grocery_list_items");

/*
TODO: For future use, if fetching data from the API from server.js

Import:
  const recipeApiUrl = require('./routes/helper/api-routes');
  const axios = require('axios');

Example:
  const url = recipeApiUrl.getRecipeInformationBulk([715538,716429]);
  
  // Make a GET request using axios
  axios.get(url).then(apiData => {
  // Send the JSON response back to the client
  res.json(apiData.data);
*/

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
const jwt = require('jsonwebtoken');

// Separated Routes for each Resource
// Note: Feel free to add more routes below with your own
const cookingSessionRoutes = require("./routes/cooking-session");

// Mount all resource routes
// Note: Feel free to add routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/cooking-sessions", cookingSessionRoutes);

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log(err);

        return res.sendStatus(403);
      }
      req.user = decoded.username;
      next();
    }
  );

};

app.get('/data', (req, res) => {
  res.json({ message: "Seems to work" });
});

app.get('/users', (req, res) => {
  usersQuery.getUsers().then((users) => {
    console.log(users);
    res.json({ data: users });
  });
});

app.get("/invitations", (req, res) => {
  invitationsQuery.getInvitations().then((invitations) => {
    console.log(invitations);
    res.json({ data: invitations });
  });
});

app.get("/recipe-lists", (req, res) => {
  recipeListQuery.getRecipeLists().then((recipe_lists) => {
    console.log(recipe_lists);
    res.json({ data: recipe_lists });
  });
});
// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;

  if (!username || !first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'Registration failed. Not enough info was provided' });
  }

  const existingUser = await usersQuery.getUserByEmail(email);

  if (existingUser) {
    // User with this email already exists
    return res
      .status(409)
      .json({ error: "User with this email already exists" });
  }

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const userId = await usersQuery.createUser({
      username,
      first_name,
      last_name,
      email,
      password: hashedPwd,
    });

    const accessToken = jwt.sign(
      { "username": userId.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '600s' } //TODO: change later for something longer
    );

    userId.access_token = accessToken;
    const result = await usersQuery.updateUserToken(userId.access_token, userId.id);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ error: `Registration failed. ${error.message}` });
  }
});

app.post('/logout', async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  const access_token = cookies.jwt;

  try {
    // Retrieve the user from the database based on their token
    const foundUser = await usersQuery.getUserByToken(access_token);
    const result = await usersQuery.updateUserToken(null, foundUser.id);

    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ error: 'Logout failed' });
  }

});
// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user from the database based on the email
    const foundUser = await usersQuery.getUserByEmail(email);

    // Check if the user exists and the password matches
    if (!foundUser) {
      // If the user doesn't exist or the password is incorrect
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '600s' } //TODO: change later for something longer
    );

    foundUser.access_token = accessToken;
    const result = await usersQuery.updateUserToken(foundUser.access_token, foundUser.id);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    res.json({ result });

  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Next line specifies that anything bellow `app.use(verifyJWT)` requires to be authorized
// app.use(verifyJWT);

app.get("/grocery-list", (req, res) => {
  groceryListQuery.getGroceryListItems().then((grocery_list_items) => {
    console.log(grocery_list_items);
    res.json({ data: grocery_list_items });
  });
});



app.listen(PORT, () => {
  console.log("Express seems to be listening on port " + PORT + " so that's pretty good 👍");
});