const express = require("express");
const router = express.Router();
const favoriteQuery = require("../database/queries/favorites");
const recipeApiUrl = require("./helper/api-routes");
const axios = require("axios");

// Endpoint to add a recipe to favorites
router.post("/add", async (req, res) => {
  const { user_id, api_recipe_id } = req.body;

  try {
    // Validate that user_id is not null or undefined
    if (!user_id) {
      return res.status(400).json({ error: "Please login!" });
    }
    // Check if the recipe already exists in favorites
    const existingFavorites = await favoriteQuery.getFavoriteIdsByUserId(
      user_id
    );
    const isRecipeAlreadyAdded = existingFavorites.some(
      (favorite) => favorite.api_recipe_id === api_recipe_id
    );

    if (isRecipeAlreadyAdded) {
      return res.status(400).json({ error: "Recipe already in favorites." });
    }

    // If the recipe doesn't exist, add it to favorites in the database
    const result = await favoriteQuery.createFavorites(user_id, api_recipe_id);

    // Send the added favorite as a response
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get favorite recipe IDs by user ID
router.get("/", async (req, res) => {
  const userId = req.query.id;

  try {
    const api_recipe_ids = await favoriteQuery.getFavoriteIdsByUserId(userId);
    if (api_recipe_ids.length === 0) {
      return res.json({ dataFavorites: [] });
    }

    const recipeIdsArray = api_recipe_ids.map((item) => item.api_recipe_id);

    const requestUrl = recipeApiUrl.getRecipeInformationBulk(recipeIdsArray);
    axios
      .get(requestUrl)
      .then((apiData) => {
        const dataFavorites = [];
        apiData.data.forEach((recipe) => {
          dataFavorites.push({
            apiRecipeId: recipe.id,
            recipeTitle: recipe.title,
            recipeImage: recipe.image
          });
        });
        return res.json({ data: dataFavorites });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
