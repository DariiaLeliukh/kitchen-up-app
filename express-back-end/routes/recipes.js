const express = require("express");
const router = express.Router();
const axios = require("axios");
const recipeApiUrl = require("./helper/api-routes");
const sessionsQuery = require('../database/queries/cooking-sessions');

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipeInformation = recipeApiUrl.getRecipeInformation(id);
    const apiDataByRecipe = await axios.get(recipeInformation);
    res.json(apiDataByRecipe.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/cooking-session", async (req, res) => {
  const { id } = req.params;

  //get the cooking session's recipe Id
  sessionsQuery.getCookingSession(id).then((cookingSession) => {
    //get the recipe details
    axios.get(recipeApiUrl.getRecipeInformation(cookingSession[0].api_recipe_id)).then(async (recipe) => {
      //Send the API response
      res.json(recipe.data);
    });
  })
    .catch(error => {
      console.error('At least one connection was rejected:', error);
    });
});


module.exports = router;
