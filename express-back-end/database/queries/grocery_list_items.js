const db = require("../connection");

const getGroceryListItemsByRecipeId = (recipeId) => {
  return db.query("SELECT * FROM grocery_list_items WHERE recipe_list_id= $1 ORDER BY api_ingredient_id DESC;", [recipeId]).then((data) => {
    return data.rows;
  });
};

const addIngredient = (api_ingredient_id, recipe_list_id, api_image, api_nameClean, api_amount, api_unit) => {

  return db
    .query(`
    INSERT INTO grocery_list_items (api_ingredient_id, recipe_list_id, api_image, api_nameClean, api_amount, api_unit) 
    SELECT $1, $2, CAST($3 as VARCHAR), CAST($4 as VARCHAR), $5, CAST($6 as VARCHAR)
    WHERE
    NOT EXISTS (
      SELECT api_ingredient_id, recipe_list_id, api_image, api_nameClean, api_amount, api_unit FROM grocery_list_items 
      WHERE api_ingredient_id = $1 
        AND recipe_list_id = $2 
        AND api_image = $3 
        AND api_nameClean = $4
        AND api_amount = $5
        AND api_unit = $6
    ) RETURNING *;
    `, [api_ingredient_id, recipe_list_id, api_image, api_nameClean, api_amount, api_unit])
    .then((data) => {
      return data.rows;
    });
};

const togglePurchasedStatus = (ingredientId) => {

  return db
    .query(`
    UPDATE grocery_list_items
                    SET is_purchased = NOT is_purchased
                    WHERE id = $1
                    RETURNING *;
    `, [ingredientId])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getGroceryListItemsByRecipeId, addIngredient, togglePurchasedStatus };
