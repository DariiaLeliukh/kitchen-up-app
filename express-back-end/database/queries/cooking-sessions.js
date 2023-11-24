const db = require("../connection");

const getCookingSessions = (guestId) => {
  console.log(`Executing SELECT  cooking_sessions.*, users.first_name || ' ' || users.last_name AS host_name
  FROM cooking_sessions
  JOIN users ON cooking_sessions.host_id = users.id
  JOIN invitations ON cooking_sessions.id = invitations.cooking_session_id
  WHERE invitations.guest_id = ${guestId}`);
  return db.query(`SELECT  cooking_sessions.*, users.first_name || ' ' || users.last_name AS host_name
                  FROM cooking_sessions
                  JOIN users ON cooking_sessions.host_id = users.id
                  JOIN invitations ON cooking_sessions.id = invitations.cooking_session_id
                  WHERE invitations.guest_id = $1`,[guestId]).then((data) => {
    return data.rows;
  });
};

module.exports = { getCookingSessions };
