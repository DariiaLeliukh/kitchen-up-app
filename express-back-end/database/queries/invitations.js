const db = require("../connection");

const getAllInvitations = () => {
  return db.query("SELECT * FROM invitations;").then((data) => {
    return data.rows;
  });
};

module.exports = { getAllInvitations };
