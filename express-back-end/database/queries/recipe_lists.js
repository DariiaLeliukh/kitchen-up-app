const db = require("../connection");

const getRecipeLists = () => {
  return db.query("SELECT * FROM recipe_lists;").then((data) => {
    return data.rows;
  });
};

module.exports = { getRecipeLists };
