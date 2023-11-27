const db = require("../connection");

const getInvitations = () => {
  return db.query("SELECT * FROM invitations;").then((data) => {
    return data.rows;
  });
};

const addInvitation = (guest_id, cooking_session_id, status) => {
  return db.query(`INSERT INTO invitations (guest_id, cooking_session_id, status) VALUES
  ($1, $2, $3) RETURNING *;`, [guest_id, cooking_session_id, status])
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getInvitations, addInvitation };
