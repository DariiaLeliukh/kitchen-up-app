import React from "react";
import { Link } from "react-router-dom";

const RecipeListItem = ({ recipeList }) => {
  // Hardcoded fake recipe data
  const fakeRecipes = [
    {
      id: 1,
      recipeName: "Fake Recipe 1",
      ingredients: ["ingredient1", "ingredient2"]
    },
    {
      id: 2,
      recipeName: "Fake Recipe 2",
      ingredients: ["ingredient3", "ingredient4"]
    }
  ];

  return (
    <div>
      <h2>{recipeList && recipeList.name}</h2>
      <p>
        Created on{" "}
        {recipeList && new Date(recipeList.created_at).toLocaleDateString()}
      </p>

      <div>
        <button>Edit List</button>
        {/* <Link to={`/grocery-list/${recipeList.id}`}> */}
        <button>Grocery List</button>
        {/* </Link> */}
      </div>

      <h3>Recipes:</h3>
      <ul>
        {fakeRecipes.map((recipe) => (
          <li key={recipe.id}>{recipe.recipeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListItem;
