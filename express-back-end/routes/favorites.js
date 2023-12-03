const express = require("express");
const router = express.Router();
const favoriteQuery = require("../database/queries/favorites");
const recipeApiUrl = require("./helper/api-routes");
const axios = require("axios");

// Endpoint to add a recipe to favorites
router.post("/add", async (req, res) => {
  const { user_id, api_recipe_id } = req.body;

  try {
    // add to favorites in the database
    const result = await favoriteQuery.createFavorites(user_id, api_recipe_id);

    // Send the added favorite as a response
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Returns a Promise that resolves after "ms" Milliseconds
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// Endpoint to get favorite recipe IDs by user ID
router.get("/", async (req, res) => {
  const userId = req.query.id;
  // console.log(userId);

  try {
    const api_recipe_ids = await favoriteQuery.getFavoriteIdsByUserId(userId);
    console.log("Favorite ID:", api_recipe_ids);
    const dataFavorites = [];

    async function load() {
      for (let i = 0; i < api_recipe_ids.length; i++) {
        // console.log("index before try", i);
        const recipeInformation = recipeApiUrl.getRecipeInformation(
          api_recipe_ids[i].api_recipe_id
        );

        try {
          // console.log("index", i);
          const apiDataByRecipe = await axios.get(recipeInformation);
          console.log(apiDataByRecipe.data.title);
          dataFavorites.push(apiDataByRecipe.data); // Add data to the array
        } catch (error) {
          console.error(error);
        }

        await timer(i *1);
      }

      res.json({ dataFavorites });
      // console.log(dataFavorites);
    }

    await load(); // Wait for the entire loop to finish before sending the response
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
});

module.exports = router;
