DROP TABLE IF EXISTS recipe_lists CASCADE;

CREATE TABLE recipe_lists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    date DATE
  );