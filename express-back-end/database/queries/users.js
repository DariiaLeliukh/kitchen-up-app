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
    "INSERT INTO users(username, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING id",
    [username, first_name, last_name, email, password]
  )
    .then((data) => {
      return data.rows[0].id;
    });
};

const getUserByEmail = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((data) => {
      return data.rows[0] || null; // Return user data or null if not found
    });
};

const updateUser = (data) => {
  return db
    .query("UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *;", [data.refresh_token, data.id])
    .then((data) => {
      return data.rows || null; // Return user data or null if not found
    });
};

module.exports = { getUsers, createUser, getUserByEmail, updateUser };