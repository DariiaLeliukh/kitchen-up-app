const db = require("../connection");

const createFavorites = (user_id, api_recipe_id) => {
  return db
    .query(
      "INSERT INTO favorites (user_id, api_recipe_id) VALUES ($1, $2) RETURNING *",
      [user_id, api_recipe_id]
    )
    .then((data) => {
      console.log("Inserted data:", data.rows);
      return data.rows;
    })
    .catch((error) => {
      console.error("Error inserting into favorites:", error);
      throw error; 
    });
};

const getFavoriteIdsByUserId = (user_id) => {
  return db
    .query("SELECT api_recipe_id FROM favorites WHERE user_id = $1", [user_id])
    .then((data) => {
      return data.rows.map((row) => row.api_recipe_id);
    });
};

module.exports = { createFavorites, getFavoriteIdsByUserId };
