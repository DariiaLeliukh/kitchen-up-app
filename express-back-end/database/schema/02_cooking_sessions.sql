DROP TABLE IF EXISTS cooking_sessions CASCADE;

CREATE TABLE cooking_sessions (
    id SERIAL PRIMARY KEY NOT NULL,
    host_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    api_recipe_id INTEGER NOT NULL,
    api_recipe_name VARCHAR(255) NOT NULL,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL
)