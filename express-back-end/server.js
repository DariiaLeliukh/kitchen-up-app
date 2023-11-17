require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const app = express();
const PORT = 8080;
const usersQuery = require('./database/queries/users')

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

app.listen(PORT, () => {
  console.log("Express seems to be listening on port " + PORT + " so that's pretty good 👍")
})