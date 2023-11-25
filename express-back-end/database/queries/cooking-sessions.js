const db = require("../connection");

const getCookingSessions = (guestId) => {
  return db.query(`SELECT cooking_sessions.*, 
                    users.first_name || ' ' || users.last_name AS host_name, 
                    invitations.status, 
                    (host_id = guest_id) as is_host
                  FROM cooking_sessions
                  JOIN users ON cooking_sessions.host_id = users.id
                  JOIN invitations ON cooking_sessions.id = invitations.cooking_session_id
                  WHERE invitations.guest_id = $1`,[guestId]).then((data) => {
    return data.rows;
  });
};

const getCookingSession = (cookingSessionId, guestId) => {
  return db.query(`SELECT cooking_sessions.*, 
                    users.first_name || ' ' || users.last_name AS host_name,
                    (host_id = guest_id) as is_host
                  FROM cooking_sessions
                  JOIN users ON cooking_sessions.host_id = users.id
                  JOIN invitations ON cooking_sessions.id = invitations.cooking_session_id
                  WHERE cooking_sessions.id = $1
                  AND guest_id = $2`, [cookingSessionId, guestId]).then((data) => {
    return data.rows;
  });
};

module.exports = { getCookingSessions, getCookingSession};
