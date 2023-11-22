const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const createUser = (user) => {
  const { username, first_name, last_name, email, password } = user;

  return db.query(
    "INSERT INTO users(username, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *;",
    [username, first_name, last_name, email, password]
  )
    .then((data) => {
      return data.rows[0];
    });
};

const getUserByEmail = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((data) => {
      return data.rows[0] || null; // Return user data or null if not found
    });
};

const updateUserToken = (access_token, id) => {
  return db
    .query("UPDATE users SET access_token = $1 WHERE id = $2 RETURNING *;", [access_token, id])
    .then((data) => {
      return data.rows[0] || null; // Return user data or null if not found
    });
};

const getUserByToken = (token) => {
  return db
    .query("SELECT * FROM users WHERE access_token = $1;", [token])
    .then((data) => {
      return data.rows[0] || null; // Return user data or null if not found
    });
};

module.exports = { getUsers, createUser, getUserByEmail, updateUserToken, getUserByToken };