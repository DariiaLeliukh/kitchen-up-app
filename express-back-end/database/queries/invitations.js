const db = require("../connection");

const getInvitations = () => {
  return db.query("SELECT * FROM invitations;").then((data) => {
    return data.rows;
  });
};

module.exports = { getInvitations };
