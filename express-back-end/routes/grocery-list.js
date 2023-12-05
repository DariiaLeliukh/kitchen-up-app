/*
 * All routes for Individual recipe list
 * Since this file is loaded in server.js into /invitations,
 *   these routes are mounted onto /invitations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const recipeApiUrl = require("./helper/api-routes");
const recipeListQuery = require("../database/queries/recipe_lists");
const groceryListQuery = require("../database/queries/grocery_list_items");
const axios = require("axios");

router.get("/:requestedListId", async (req, res) => {
  const { requestedListId } = req.params;
  if (!requestedListId) {
    return res.sendStatus(400);
  }

  try {
    const items = await recipeListQuery.getRecipeListItemsByRecipeId(requestedListId);
    const recipeIds = items.map(item => item.api_recipe_id);
    //at this moment the query will insert only non-existing values in the db, when in fact we need to check if the recipe has already been added before and only then insert new ones without checking if it exists (or combine those duplicating products summing the amounts)
    const arrayOfPromises = [];
    const apiData = await axios.get(recipeApiUrl.getRecipeInformationBulk(recipeIds));
    apiData.data.forEach((recipe) => {
      recipe.extendedIngredients.forEach((ingredientList) => {
        arrayOfPromises.push(
          groceryListQuery.addIngredient(
            ingredientList.id,
            requestedListId,
            ingredientList.image,
            ingredientList.nameClean,
            ingredientList.amount,
            ingredientList.unit
          )
        );
      });
    });

    let addedIngredients = await Promise.all(arrayOfPromises);
    addedIngredients = addedIngredients.flat();

    const fullIngredientList = await groceryListQuery.getGroceryListItemsByRecipeId(requestedListId);
    res.json({ fullIngredientList });


  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/:ingredientId", async (req, res) => {
  const { ingredientId } = req.params;

  if (!ingredientId) {
    return res.sendStatus(400);
  }

  try {
    const updatedIngredient = await groceryListQuery.togglePurchasedStatus(ingredientId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;