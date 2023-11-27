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
                  WHERE invitations.guest_id = $1`, [guestId]).then((data) => {
    return data.rows;
  });
};

const addCookingSession = (host_id, api_recipe_id, api_recipe_name) => {
  return db.query(`INSERT INTO cooking_sessions (host_id, api_recipe_id, api_recipe_name, session_datetime) VALUES
  ($1, $2, $3, '2023-12-05 12:00:00') RETURNING *;`, [host_id, api_recipe_id, api_recipe_name])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { getCookingSessions, addCookingSession };
