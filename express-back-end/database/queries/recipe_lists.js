const db = require("../connection");

const getAllRecipeLists = () => {
  return db.query("SELECT * FROM recipe_lists;").then((data) => {
    return data.rows;
  });
};

module.exports = { getAllRecipeLists };
