DROP TABLE IF EXISTS recipe_list_items CASCADE;

CREATE TABLE recipe_list_items (
    id SERIAL PRIMARY KEY,
    recipe_list_id INTEGER REFERENCES recipe_lists(id) ON DELETE CASCADE NOT NULL,
    api_recipe_id INTEGER NOT NULL
  );