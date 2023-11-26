const db = require("../connection");

const getInvitations = () => {
  return db.query("SELECT * FROM invitations;").then((data) => {
    return data.rows;
  });
};

const getInvitationsByCookingSession = (cookingSessionId) => {
  return db.query(` SELECT first_name, last_name, status, (host_id = guest_id) AS is_host
                    FROM invitations
                    JOIN users ON invitations.guest_id = users.id
                    JOIN cooking_sessions ON cooking_sessions.id = invitations.cooking_session_id
                    WHERE cooking_session_id = $1
                    ORDER BY is_host DESC, first_name, last_name;`, [cookingSessionId]).then((data) => {
    return data.rows;
  });
};

module.exports = { getInvitations };
