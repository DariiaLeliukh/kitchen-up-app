DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    api_recipe_id INTEGER
  );