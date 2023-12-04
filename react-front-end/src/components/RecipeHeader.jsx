import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import IngredientList from "./IngredientList";
import "../styles/css/styles.css";
import "../styles/css/recipe.css";
import AddToRecipeList from "./AddToRecipeList";


const RecipeHeader = ({ recipeId, title, imageUrl, ingredients, showButtons }) => {
  const { auth } = useAuth();
  const [loginMessage, setLoginMessage] = useState('');

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

  const showLoginTip = () => {
    setLoginMessage("You need to login to add this recipe to the recipe list");
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
                <AddToRecipeList recipeId={recipeId} notAuthorized={showLoginTip} />
                {loginMessage && (
                  <>
                    <p className='my-3' style={{ color: "red" }}>{loginMessage}</p>
                    <Link to="/login">Login</Link>
                  </>
                )}
              </div>

            }
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeHeader;
