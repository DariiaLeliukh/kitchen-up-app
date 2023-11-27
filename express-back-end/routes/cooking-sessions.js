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
const invitationsQuery = require('../database/queries/invitations');

router.get("/", async (req, res) => {
  console.log(`Token received: ${req.cookies.jwt}`);

  const access_token = req.cookies.jwt;
  const foundUser = await usersQuery.getUserByToken(access_token);

  console.log(`User found: ${foundUser.first_name}`);

  sessionsQuery.getCookingSessions(foundUser.id).then((cooking_sessions) => {
    console.log(cooking_sessions);
    res.json(cooking_sessions);
  });

  // console.log(`User ID: ${req.cookies.user_id}`);

  // sessionsQuery.getCookingSessions(req.cookies.user_id).then((cooking_sessions) => {
  //   console.log(cooking_sessions);
  //   res.json(cooking_sessions);
  // });
});

router.post("/new", async (req, res) => {

  const { emails, host_id, api_recipe_id, api_recipe_name } = req.body;

  try {
    const newCookingSession = await sessionsQuery.addCookingSession(host_id, api_recipe_id, api_recipe_name);

    const newCookingSessionId = newCookingSession.id;
    await invitationsQuery.addInvitation(host_id, newCookingSessionId, "Accepted");

    const promises = emails.map(async (email) => {
      const existingUser = await usersQuery.getUserByEmail(email);

      if (existingUser) {
        const guestInvitation = await invitationsQuery.addInvitation(existingUser.id, newCookingSessionId, "Pending");
        return { email, status: "success" };

      } else {
        return { email, status: "fail" };
      }
    });

    // Getting info on what invitations has been created 
    // and which ones failed
    const dataMessage = await Promise.all(promises);

    return res.status(200).json({ dataMessage, newCookingSessionId });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;