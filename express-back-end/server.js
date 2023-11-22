require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
const usersQuery = require('./database/queries/users');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const jwt = require('jsonwebtoken');

app.get('/data', (req, res) => {
  res.json({ message: "Seems to work" });
});

app.get('/users', (req, res) => {
  usersQuery.getUsers().then((users) => {
    console.log(users);
    res.json({ data: users });
  });
});
// Registration endpoint
app.post('/register', async (req, res) => {

  console.log('req.body');
  console.log(req.body);
  const { username, first_name, last_name, email, password } = req.body;

  try {
    const existingUser = await usersQuery.getUserByEmail(email);
    if (existingUser) {
      // User with this email already exists
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Insert the user into the database
    const userId = await usersQuery.createUser({
      username,
      first_name: first_name,
      last_name: last_name,
      email,
      password,
    });

    res.json({ userId });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const cookies = req.cookies;

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
      { expiresIn: '30s' } //TODO: change later for something longer
    );

    const newRefreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    let newRefreshTokenArray =
      !cookies?.jwt
        ? foundUser.refresh_token
        : foundUser.refresh_token.filter(rt => rt !== cookies.jwt);

    if (cookies?.jwt) {

      /* 
      Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      */
      const refreshToken = cookies.jwt;
      const foundToken = foundUser.refresh_token;

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    // Saving refreshToken with current user
    foundUser.refresh_token = [...newRefreshTokenArray, newRefreshToken];
    const result = await usersQuery.updateUser(foundUser);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    // Send authorization roles and access token to user
    res.json({ accessToken });

  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log("Express seems to be listening on port " + PORT + " so that's pretty good 👍");
});