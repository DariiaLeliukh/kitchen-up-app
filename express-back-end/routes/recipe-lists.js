/*
 * All routes for Recipe Lists
 * Since this file is loaded in server.js into /invitations,
 *   these routes are mounted onto /invitations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const recipeListQuery = require("../database/queries/recipe_lists");
const recipeApiUrl = require("./helper/api-routes");
const axios = require("axios");


router.get("/:recipeListId/items", async (req, res) => {

  const { recipeListId } = req.params;

  if (recipeListId) {

    await recipeListQuery.getRecipeListItemsByRecipeId(recipeListId)
      .then((items) => {
        const recipeIds = items.map((item) => {
          return item.api_recipe_id;
        });

        axios.get(recipeApiUrl.getRecipeInformationBulk(recipeIds))
          .then(apiData => {
            const dataRecipes = [];
            apiData.data.forEach((recipe) => {
              dataRecipes.push({
                apiRecipeId: recipe.id,
                recipeTitle: recipe.title,
                recipeImage: recipe.image
              });
            });
            return res.json({ data: dataRecipes });
          }).catch((error) => {
            console.error(error);
          });
      });
  } else {
    return res.sendStatus(500);
  }

});

router.post("/:recipeListId/item/:recipeId", async (req, res) => {

  const { recipeListId, recipeId } = req.params;

  if (recipeListId && recipeId) {
    const addedRecipeToList = await recipeListQuery.addToRecipeList(recipeListId, recipeId);
    const modifiedRecipeList = await recipeListQuery.updateModifyDate(recipeListId);
    return res.sendStatus(200);
  } else {
    return res.sendStatus(500);
  }

});

router.post("/", async (req, res) => {
  const { newListName, recipeId, userId } = req.query;

  if (newListName && recipeId) {
    const createdRecipeList = await recipeListQuery.createRecipeList(userId, newListName);

    if (createdRecipeList.id) {
      const addedRecipeToList = await recipeListQuery.addToRecipeList(createdRecipeList.id, recipeId);
      return res.json({ newRecipeId: createdRecipeList.id });
    }
  } else {
    return res.sendStatus(500);
  }
});

router.delete("/:recipeListId", async (req, res) => {
  const { recipeListId } = req.params;

  try {
    await recipeListQuery.deleteRecipeList(recipeListId);

    res.status(200).json({ message: "Recipe List deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const requestedListId = req.params.id;

  if (requestedListId) {
    recipeListQuery.getRecipeListById(requestedListId)
      .then((recipe_list) => {
        return res.json({ data: recipe_list });
      });
  } else {
    return res.json({ data: [] });
  }
});

router.get("/", async (req, res) => {
  const requestedUserId = req.query.id;
  if (requestedUserId) {
    recipeListQuery.getRecipeListsByUserId(requestedUserId).then((recipe_lists) => {
      return res.json({ data: recipe_lists });
    });
  } else {
    return res.json({ data: [] });
  }
});


module.exports = router;