require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 8080;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const usersQuery = require("./database/queries/users");
const recipeApiUrl = require("./routes/helper/api-routes");
const axios = require("axios");
const socketConfig = require("./sockets");


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
const jwt = require("jsonwebtoken");

// Separated Routes for each Resource
// Note: Feel free to add more routes below with your own
const cookingSessionRouter = require("./routes/cooking-sessions");
const searchRouter = require("./routes/search");
const invitationsRouter = require("./routes/invitations");
const recipesRouter = require("./routes/recipes");
const favoritesRouter = require("./routes/favorites");
const recipeListsRouter = require("./routes/recipe-lists");
const groceryListRouter = require("./routes/grocery-list");
// Mount all resource routes
// Note: Feel free to add routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/cooking-sessions", cookingSessionRouter);
app.use("/search", searchRouter);
app.use("/invitations", invitationsRouter);
app.use("/recipes", recipesRouter);
app.use("/favorites", favoritesRouter);
app.use("/recipe-lists", recipeListsRouter);
app.use("/grocery-list", groceryListRouter);

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
});

app.get("/data", (req, res) => {
  res.json({ message: "Seems to work" });
});

app.get("/", (req, res) => {
  const url = recipeApiUrl.getRandomRecipes({ number: 20 });

  // Make a GET request using axios
  axios.get(url).then((apiData) => {
    // Send the JSON response back to the client
    res.json(apiData.data);
  });
});

app.get("/users", (req, res) => {
  usersQuery.getUsers().then((users) => {
    res.json({ data: users });
  });
});

// Registration endpoint
app.post("/register", async (req, res) => {
  const {
    username,
    first_name,
    last_name,
    email,
    profile_picture_url,
    password,
  } = req.body;

  if (!username || !first_name || !last_name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Registration failed. Not enough info was provided" });
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
      { username: userId.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "6000s" } //TODO: change later for something longer
    );

    userId.access_token = accessToken;
    const result = await usersQuery.updateUserToken(
      userId.access_token,
      userId.id
    );

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ result });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Registration failed. ${error.message}` });
  }
});

app.post("/logout", async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  const access_token = cookies.jwt;

  try {
    // Retrieve the user from the database based on their token
    const foundUser = await usersQuery.getUserByToken(access_token);
    const result = await usersQuery.updateUserToken(null, foundUser.id);

    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ error: "Logout failed" });
  }
});
// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user from the database based on the email
    const foundUser = await usersQuery.getUserByEmail(email);

    // Check if the user exists and the password matches
    if (!foundUser) {
      // If the user doesn't exist or the password is incorrect
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '600s' } //10m TODO: change later for something longer
    );

    foundUser.access_token = accessToken;
    const result = await usersQuery.updateUserToken(
      foundUser.access_token,
      foundUser.id
    );

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ result });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

const httpServer = app.listen(PORT, () => {
  console.log(
    "Express seems to be listening on port " +
    PORT +
    " so that's pretty good 👍"
  );
});

socketConfig.configureSocketConnections(httpServer);