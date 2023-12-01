const db = require("../connection");

const getRecipeLists = () => {
  return db
    .query("SELECT * FROM recipe_lists ORDER BY created_at DESC;")
    .then((data) => {
      return data.rows;
    });
};

const getRecipeListsByUserId = (userId) => {
  return db
    .query("SELECT * FROM recipe_lists WHERE user_id=$1 ORDER BY created_at DESC;", [userId])
    .then((data) => {
      return data.rows;
    });
};

const getRecipeListItemsByRecipeId = (recipeId) => {
  return db
    .query("SELECT * FROM recipe_list_items WHERE recipe_list_id=$1;", [recipeId])
    .then((data) => {
      return data.rows;
    });
};

const addToRecipeList = (recipeListId, api_recipe_id) => {
  return db
    .query(`
    INSERT INTO recipe_list_items(recipe_list_id, api_recipe_id) 
    SELECT $1, $2
    WHERE
    NOT EXISTS (
      SELECT recipe_list_id, api_recipe_id FROM recipe_list_items WHERE recipe_list_id = $1 AND api_recipe_id = $2
    ) RETURNING *;`, [recipeListId, api_recipe_id])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getRecipeLists, getRecipeListsByUserId, addToRecipeList, getRecipeListItemsByRecipeId };
