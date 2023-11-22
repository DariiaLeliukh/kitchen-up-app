const db = require("../connection");

const getGroceryListItems = () => {
  return db.query("SELECT * FROM grocery_list_items;").then((data) => {
    return data.rows;
  });
};

module.exports = { getGroceryListItems };
