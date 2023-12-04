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
const recipeApiUrl = require("./routes/helper/api-routes");
const axios = require("axios");

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
const jwt = require('jsonwebtoken');

// Separated Routes for each Resource
// Note: Feel free to add more routes below with your own
const cookingSessionRouter = require("./routes/cooking-sessions");
const searchRouter = require("./routes/search");
const invitationsRouter = require("./routes/invitations");
const recipeRouter = require("./routes/recipe");
// Mount all resource routes
// Note: Feel free to add routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/cooking-sessions", cookingSessionRouter);
app.use("/search", searchRouter);
app.use("/invitations", invitationsRouter);
app.use("/recipe", recipeRouter);

async function findUserByJWTcookie(access_token) {
  const foundUser = await usersQuery.getUserByToken(access_token);
  return foundUser || null;
}

app.post('/verifyJWT', async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).send({ message: `No JWT cookie` });
  }

  const access_token = cookies.jwt;

  jwt.verify(
    access_token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.status(403).send({ message: `Expired access_token` });
      }

      findUserByJWTcookie(access_token)
        .then((result) => {
          return res.json({ result });
        });
    }
  );

  // const authHeader = req.headers['authorization'];

  // if (!authHeader) {
  //   return res.sendStatus(401);
  // }

  // const token = authHeader.split(' ')[1];

  // jwt.verify(
  //   token,
  //   process.env.ACCESS_TOKEN_SECRET,
  //   (err, decoded) => {
  //     if (err) {
  //       console.log(err);

  //       return res.sendStatus(403);
  //     }
  //     req.user = decoded.username;
  //     next();
  //   }
  // );

});

app.get('/data', (req, res) => {
  res.json({ message: "Seems to work" });
});


app.get('/', (req, res) => {
  const url = recipeApiUrl.getRandomRecipes({ number: 10 });

  // Make a GET request using axios
  axios.get(url).then(apiData => {
    // Send the JSON response back to the client
    res.json(apiData.data);
  });
});

app.get('/users', (req, res) => {
  usersQuery.getUsers().then((users) => {
    res.json({ data: users });
  });
});

app.get("/recipe-lists", async (req, res) => {
  const requestedUserId = req.query.id;
  if (requestedUserId) {
    recipeListQuery.getRecipeListsByUserId(requestedUserId).then((recipe_lists) => {
      return res.json({ data: recipe_lists });
    });
  } else {
    return res.json({ data: [] });
  }
});

app.get("/recipe-list", async (req, res) => {
  const requestedListId = req.query.id;

  if (requestedListId) {
    recipeListQuery.getRecipeListById(requestedListId).then((recipe_list) => {
      return res.json({ data: recipe_list });
    });
  } else {
    return res.json({ data: [] });
  }
});

app.get("/recipe-list-items", async (req, res) => {

  const { recipeListId } = req.query;
  if (recipeListId) {

    await recipeListQuery.getRecipeListItemsByRecipeId(recipeListId)
      .then((items) => {
        const recipeIds = items.map((item) => {
          return item.api_recipe_id;
        });

        axios.get(recipeApiUrl.getRecipeInformationBulk(recipeIds))
          .then(apiData => {
            const dataRecipes = [];
            apiData.data.forEach((recipe) => {
              dataRecipes.push({
                apiRecipeId: recipe.id,
                recipeTitle: recipe.title,
                recipeImage: recipe.image
              });
            });
            return res.json({ data: dataRecipes });
          }).catch((error) => {
            console.error(error);
          });
      });
  } else {
    return res.sendStatus(500);
  }

});

app.post("/recipe-list-items", async (req, res) => {

  const { recipeListId, recipeId } = req.body;

  if (recipeListId && recipeId) {
    const addedRecipeToList = await recipeListQuery.addToRecipeList(recipeListId, recipeId);
    return res.sendStatus(200);
  } else {
    return res.sendStatus(500);
  }

});

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, first_name, last_name, email, profile_picture_url, password } = req.body;

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
      profile_picture_url,
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
      { expiresIn: '600s' } //10m TODO: change later for something longer
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

app.get("/grocery-list", async (req, res) => {
  const requestedListId = req.query.id;
  if (!requestedListId) {
    return res.sendStatus(400);
  }

  try {
    const items = await recipeListQuery.getRecipeListItemsByRecipeId(requestedListId);
    const recipeIds = items.map(item => item.api_recipe_id);
    //at this moment the query will insert only non-existing values in the db, when in fact we need to check if the recipe has already been added before and only then insert new ones without checking if it exists (or combine those duplicating products summing the amounts)
    const arrayOfPromises = [];
    const apiData = await axios.get(recipeApiUrl.getRecipeInformationBulk(recipeIds));
    apiData.data.forEach((recipe) => {
      recipe.extendedIngredients.forEach((ingredientList) => {
        arrayOfPromises.push(
          groceryListQuery.addIngedient(
            ingredientList.id,
            requestedListId,
            ingredientList.image,
            ingredientList.nameClean,
            ingredientList.amount,
            ingredientList.unit
          )
        );
      });
    });

    let addedIngredients = await Promise.all(arrayOfPromises);
    addedIngredients = addedIngredients.flat();

    const fullIngredientList = await groceryListQuery.getGroceryListItemsByRecipeId(requestedListId);
    res.json({ fullIngredientList });


  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/grocery-list", async (req, res) => {
  const { ingredientId } = req.body;

  if (!ingredientId) {
    return res.sendStatus(400);
  }

  try {
    const updatedIngredient = await groceryListQuery.updateIngedient(ingredientId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.listen(PORT, () => {
  console.log("Express seems to be listening on port " + PORT + " so that's pretty good 👍");
});