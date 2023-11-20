require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 8080;
const usersQuery = require('./database/queries/users');
const sessionsQuery = require('./database/queries/cooking-sessions')


app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))



app.get('/data', (req, res) => {
  res.json({message: "Seems to work"})
})

app.get('/users', (req, res) => {
  usersQuery.getUsers().then((users) => {
    console.log(users)
    res.json({data: users})
  })
})

app.get("/cooking-sessions", (req, res) => {
  sessionsQuery.getCookingSessions().then((cooking_sessions) => {
    console.log(cooking_sessions);
    res.json({ data: cooking_sessions });
  });
});


// Registration endpoint
app.post('/register', async (req, res) => {
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
  const { email, password } = req.body;

  try {
    // Retrieve the user from the database based on the email
    const user = await usersQuery.getUserByEmail(email);
    
    // Check if the user exists and the password matches
    if (!user) {
      // If the user doesn't exist or the password is incorrect
      return res.status(401).json({ error: 'Invalid credentials' });
    }
      
      // Respond with a success message or any other desired response
      res.json({ message: 'Login successful' });
  
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log("Express seems to be listening on port " + PORT + " so that's pretty good 👍")
})