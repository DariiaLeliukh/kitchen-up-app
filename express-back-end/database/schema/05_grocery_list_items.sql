DROP TABLE IF EXISTS grocery_list_items CASCADE;

CREATE TABLE grocery_list_items (
    id SERIAL PRIMARY KEY,
    api_ingredient_id INTEGER NOT NULL,
    recipe_list_id INTEGER REFERENCES recipe_lists(id) ON DELETE CASCADE NOT NULL,
    api_image VARCHAR(255),
    api_nameClean VARCHAR(255) NOT NULL,
    api_amount DECIMAL NOT NULL,
    api_unit VARCHAR(50),
    is_purchased BOOLEAN DEFAULT false NOT NULL
  );