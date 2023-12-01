const express = require("express");
const router = express.Router();
const favoriteQuery = require("../database/queries/favorites");

// Endpoint to add a recipe to favorites
router.post("/add", async (req, res) => {
  const { user_id, api_recipe_id } = req.body;

  try {
  // Call your function to add to favorites in the database
    const result = await favoriteQuery.createFavorites(user_id, api_recipe_id);

  // Send the added favorite as a response
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  favoriteQuery.getFavoriteIdsByUserId(userId).then((api_recipe_id) => {
      // console.log("Favorite ID:", api_recipe_id);
      res.json({ data: api_recipe_id });
    })
    .catch((error) => {
      console.error("Error fetching favorite ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


module.exports = router;
