/*
 * All routes for Cooking Sessions Invitations are defined here
 * Since this file is loaded in server.js into /invitations,
 *   these routes are mounted onto /invitations
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const invitationsQuery = require('../database/queries/invitations');

router.post("/:id", (req, res) => {
  const invitationId = req.params.id;
  const newStatus = req.body.status;
  
  //update the status of the cooking session's invitation
  invitationsQuery.setInvitationStatus(invitationId, newStatus).then(() => {
  // Send a response indicating success
  res.status(200).json({ message: 'Invitation status updated successfully' });
  })
  .catch(error => {
    console.error("Error when updating the invitation's status:", error);
  });
});

module.exports = router;