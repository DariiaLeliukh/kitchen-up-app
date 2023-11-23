const db = require("../connection");

const getCookingSessions = () => {
  return db.query("SELECT * FROM cooking_sessions;").then((data) => {
    return data.rows;
  });
};


module.exports = { getCookingSessions };
