/*
 * All routes for Cooking Sessions are defined here
 * Since this file is loaded in server.js into /cooking-sessions,
 *   these routes are mounted onto /cooking-sessions
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// const { Server } = require("socket.io");
// const axios = require('axios');
// const recipeApiUrl = require('../routes/helper/api-routes');
const sessionsQuery = require('../database/queries/cooking-sessions');
const usersQuery = require('../database/queries/users');

router.get("/", async (req, res) => {
  //console.log(`Token received: ${req.cookies.jwt}`);

  const access_token = req.cookies.jwt;
  const foundUser = await usersQuery.getUserByToken(access_token);

  //console.log(`User found: ${foundUser.first_name}`);

  sessionsQuery.getCookingSessions(foundUser.id).then((cooking_sessions) => {
    //console.log(cooking_sessions);
    res.json(cooking_sessions);
  });
});

// router.get("/:id/info", async (req, res) => {
//   const access_token = req.cookies.jwt;

//   //Get the cooking session details
//   const cookingSession = await usersQuery.getUserByToken(access_token);

//   sessionsQuery.getCookingSession(cookingSession.id).then(async (cooking_session) => {
//     //get the recipe's summary
//     await axios.get(recipeApiUrl.getRecipeSummary(cooking_session.id));
    
//     //joing the data
//     cooking_session_info = {...cookingSession
//     res.json(cooking_session_info);
//   });
// });

module.exports = router;