const express = require("express");
const router = express.Router();
const { createFavorites } = require("../database/queries/favorites");
const favoriteQuery = require("../database/queries/favorites");


// Endpoint to add a recipe to favorites
router.post("/add", async (req, res) => {
  const { user_id, api_recipe_id } = req.body;

  try {
    console.log(
      "Received request to add to favorites:",
      user_id,
      api_recipe_id
    );

    // Call your function to add to favorites in the database
    const result = await createFavorites(user_id, api_recipe_id);

    // Send the added favorite as a response
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  favoriteQuery
    .getFavoriteIdsByUserId(userId)
    .then((recipeIds) => {
      console.log("Favorite ID:", recipeIds);
      res.json({ data: recipeIds });
    })
    .catch((error) => {
      console.error("Error fetching favorite ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


module.exports = router;
