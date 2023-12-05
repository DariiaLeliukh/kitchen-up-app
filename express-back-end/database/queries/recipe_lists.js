const db = require("../connection");

const getRecipeLists = () => {
  return db
    .query("SELECT * FROM recipe_lists ORDER BY modified_at DESC;")
    .then((data) => {
      return data.rows;
    });
};

const getRecipeListsByUserId = (userId) => {
  return db
    .query("SELECT * FROM recipe_lists WHERE user_id=$1 ORDER BY modified_at DESC;", [userId])
    .then((data) => {
      return data.rows;
    });
};

const createRecipeList = (userId, name) => {
  return db
    .query(`
    INSERT INTO recipe_lists (user_id, name) VALUES
    ($1, $2) RETURNING *;`, [userId, name])
    .then((data) => {
      return data.rows[0];
    });
};

const deleteRecipeList = async (userId, recipeListId) => {
  return db
    .query(
      "DELETE FROM recipe_lists WHERE user_id = $1 AND id = $2;",
      [userId, recipeListId]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.error("Error deleting from recipe lists:", error);
      throw error;
    });
};

const getRecipeListById = (recipeListId) => {
  return db
    .query("SELECT * FROM recipe_lists WHERE id=$1 ORDER BY modified_at DESC;", [recipeListId])
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

const updateModifyDate = (recipeListId) => {
  return db
    .query(`
    UPDATE recipe_lists
    SET modified_at = NOW()
    WHERE id = $1 
    RETURNING *;`, [recipeListId])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getRecipeLists, getRecipeListsByUserId, createRecipeList, deleteRecipeList, addToRecipeList, getRecipeListItemsByRecipeId, getRecipeListById, updateModifyDate };
