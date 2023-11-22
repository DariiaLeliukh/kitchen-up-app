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
// const apiUrl = require('./routes/helper/api-routes');
const sessionsQuery = require('../database/queries/cooking-sessions');

router.get("/", (req, res) => {
  // const url = apiUrl.getRecipeInformationBulk([715538,716429]);
  
  // // Make a GET request using axios
  // axios.get(url).then(apiData => {
  //   // Send the JSON response back to the client
  //   res.json(apiData.data);
  // });  

  sessionsQuery.getCookingSessions().then((cooking_sessions) => {
    console.log(cooking_sessions);
    res.json({ data: cooking_sessions });
  });
});

module.exports = router;