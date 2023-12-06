/*
 * All routes for Cooking Sessions are defined here
 * Since this file is loaded in server.js into /cooking-sessions,
 *   these routes are mounted onto /cooking-sessions
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const axios = require('axios');
const recipeApiUrl = require('../routes/helper/api-routes');
const sessionsQuery = require('../database/queries/cooking-sessions');
const usersQuery = require('../database/queries/users');
const invitationsQuery = require('../database/queries/invitations');

router.get("/", async (req, res) => {
  const access_token = req.cookies.jwt;
  const foundUser = await usersQuery.getUserByToken(access_token);

  sessionsQuery.getCookingSessionsByGuestId(foundUser.id).then((cooking_sessions) => {
    res.json(cooking_sessions);
  });
});

router.get("/:id", (req, res) => {
  const cookingSessionId = req.params.id;
      
  //get the cooking session info
  sessionsQuery.getCookingSession(cookingSessionId).then((cookingSession) => {
    //get the recipe details
    axios.get(recipeApiUrl.getRecipeSummary(cookingSession[0].api_recipe_id)).then(async (recipe) => {
      //verify if the user is the cooking session's host 
      const access_token = req.cookies.jwt;
      const userId = await usersQuery.getUserByToken(access_token).id;

      //join the data & send the response
      res.json({
        ...cookingSession[0],
        is_host: (userId === cookingSession[0].host_id),
        api_recipe_summary: recipe.data.summary
      });      
    });
  })
  .catch(error => {
    console.error('At least one connection was rejected:', error);
  });
});

router.get("/:id/invitations", async (req, res) => {
  const cookingSessionId = req.params.id;
  
  //get the cooking session's invitations
  invitationsQuery.getInvitationsByCookingSession(cookingSessionId).then((invitations) => {
    //send the response
    res.json(invitations);      
  })
  .catch(error => {
    console.error('Error when retrieving invitations:', error);
  });
});

router.post("/", async (req, res) => {

  const { emails, host_id, api_recipe_id, api_recipe_name } = req.body;
  const emailServer = require('../routes/helper/send-email');

  const access_token = req.cookies.jwt;
  const hostUser = await usersQuery.getUserByToken(access_token);

  try {
    const newCookingSession = await sessionsQuery.addCookingSession(host_id, api_recipe_id, api_recipe_name);

    const newCookingSessionId = newCookingSession.id;
    await invitationsQuery.addInvitation(host_id, newCookingSessionId, "Accepted");

    const promises = emails.map(async (email) => {
      const existingUser = await usersQuery.getUserByEmail(email);

      if (existingUser) {
        const guestInvitation = await invitationsQuery.addInvitation(existingUser.id, newCookingSessionId, "Pending");
        
        emailServer.sendInvitation(email, existingUser.first_name, `${hostUser.first_name} ${hostUser.last_name}`, api_recipe_name);

        return { name: `${existingUser.first_name} ${existingUser.last_name}`, status: "success" };

      } else {
        return { name: `${existingUser.first_name} ${existingUser.last_name}`, status: "fail" };
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