const express = require("express");
const router = express.Router();
const axios = require("axios");
const recipeApiUrl = require("./helper/api-routes");

router.get("/:recipeId", async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipeInformation = recipeApiUrl.getRecipeInformation(recipeId);
    const apiDataByRecipe = await axios.get(recipeInformation);
    res.json(apiDataByRecipe.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
