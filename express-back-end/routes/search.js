const express = require("express");
const router = express.Router();
// const { Server } = require("socket.io");
const axios = require("axios");
const recipeApiUrl = require("../routes/helper/api-routes");
// const sessionsQuery = require('../database/queries/cooking-sessions');

router.get("/", async (req, res) => {
  const { name, ingredients } = req.query;

  if (!name && !ingredients) {
    res
      .status(400)
      .json({ error: "Bad Request. Provide either 'name' or 'ingredients'." });
    return;
  }

  try {
    if (name) {
      const urlByName = recipeApiUrl.getRecipesByNaturalLanguage(name);
      const apiDataByName = await axios.get(urlByName);
      res.json(apiDataByName.data);
    } else {
      const ingredientsArray = Array.isArray(ingredients)
        ? ingredients
        : [ingredients];
      const urlByIngredients =
        recipeApiUrl.getRecipesByIngredient(ingredientsArray);
      const apiDataByIngredients = await axios.get(urlByIngredients);
      res.json(apiDataByIngredients.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
