/*
 * All routes for Cooking Sessions are defined here
 * Since this file is loaded in server.js into /cooking-sessions,
 *   these routes are mounted onto /cooking-sessions
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// const { Server } = require("socket.io");
const axios = require('axios');
const recipeApiUrl = require('../routes/helper/api-routes');
const sessionsQuery = require('../database/queries/cooking-sessions');
const usersQuery = require('../database/queries/users');

router.get("/", async (req, res) => {
  const access_token = req.cookies.jwt;
  const foundUser = await usersQuery.getUserByToken(access_token);

  sessionsQuery.getCookingSessions(foundUser.id).then((cooking_sessions) => {
    res.json(cooking_sessions);
  });
});

router.get("/:id", async (req, res) => {
  const cookingSessionId = req.params.id;
  const access_token = req.cookies.jwt;
  const foundUser = await usersQuery.getUserByToken(access_token);

  //get the cooking session info
  sessionsQuery.getCookingSession(cookingSessionId, foundUser.id).then((cookingSession) => {
    //get the recipe details
    axios.get(recipeApiUrl.getRecipeSummary(cookingSession[0].api_recipe_id)).then((recipe) => {
      //join the data & send the response
      res.json({ ...cookingSession[0], api_recipe_summary: recipe.data.summary });      
    });
  })
  .catch(error => {
    console.error('At least one connection was rejected:', error);
  });
});

module.exports = router;