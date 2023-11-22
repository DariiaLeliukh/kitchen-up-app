DROP TABLE IF EXISTS invitations CASCADE;

CREATE TABLE invitations (
    id SERIAL PRIMARY KEY,
    guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    cooking_session_id INTEGER REFERENCES cooking_sessions(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(255)
  );