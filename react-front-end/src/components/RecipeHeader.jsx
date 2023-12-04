import React from "react";
import { Link } from "react-router-dom";
import IngredientList from "./IngredientList";
import "../styles/css/styles.css";
import "../styles/css/recipe.css";


const RecipeHeader = ({ recipeId, title, imageUrl, ingredients, showButtons }) => {
  const handleFavorites = () => {
    alert("Added to Favorites!");
  };

  const handleGroceriList = () => {
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
                  state={{ recipeId: recipeId, recipeTitle: title }}
                  className="button"
                >
                  Cook with Friends
                </Link>
                <button onClick={handleFavorites}>Add Favorites</button>
                <button onClick={handleGroceriList}>Add to Grocery List</button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeHeader;
