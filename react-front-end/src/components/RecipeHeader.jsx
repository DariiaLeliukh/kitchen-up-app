import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import IngredientList from "./IngredientList";
import "../styles/css/styles.css";
import "../styles/css/recipe.css";


const RecipeHeader = ({ recipeId, title, imageUrl, ingredients, showButtons }) => {
  const { auth } = useAuth();

  const handleFavorites = async () => {
    try {
      
      const response = await fetch("/api/favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: auth.userId, api_recipe_id: recipeId }),
      });

      if (response.ok) {
        alert("Added to Favorites!");
      } else {
        alert("Please login!");
      }
    } catch (error) {
      console.error("Error adding to Favorites:", error);
      alert("Error adding to Favorites!");
    }
  };

  const handleGroceryList = () => {
    alert("Added to Grocery list");
  };

  return (
    <>
      <img className="recipe-img" src={imageUrl} alt={title} />
      <div className="recipe-info">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <h1>{title}</h1>
              <h3 className="ingredients-heading">Ingredients</h3>
              <IngredientList ingredients={ingredients} />
            </div>
            {showButtons &&
              <div className="col-12 col-md-4">
                <Link
                  to="/cooking-sessions/new"
                  state={{ recipeId, recipeTitle: title }}
                  className="button"
                >
                  Cook with Friends
                </Link>
                <button onClick={handleFavorites}>Add Favorites</button>
                <button onClick={handleGroceryList}>Add to Grocery List</button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeHeader;
