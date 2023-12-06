const express = require("express");
const router = express.Router();
const usersQuery = require("../database/queries/users");

router.get("/", (req, res) => {
  usersQuery.getUsers().then((users) => {
    res.json({ data: users });
  });
});

router.get("/:id/friends", (req, res) => {
  const { id } = req.params;

  usersQuery.getUsersFriends(id).then((users) => {
    const friendList = users.map((guest) => { return { name: `${guest.first_name} ${guest.last_name}`, email: guest.email }; });
    res.json(friendList);
  });
});

module.exports = router;
