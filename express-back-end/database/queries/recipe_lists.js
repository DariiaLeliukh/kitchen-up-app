const db = require("../connection");

const getRecipeLists = () => {
  return db
    .query("SELECT * FROM recipe_lists ORDER BY created_at DESC;")
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getRecipeLists };
