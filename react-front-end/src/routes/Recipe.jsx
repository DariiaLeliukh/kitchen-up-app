import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/css/forms.css";

const Recipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipe/${recipeId}`);
        const data = await response.json();
        console.log("Data from backend:", data);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleCookSession = () => {
    alert("Opened Cooking Session!");
  };

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
  const handleGroceriList = () => {
    alert("Added to Grocery list");
  };

  return (
    <div className="container">
      {recipe ? (
        <div>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <h3>Ingredients</h3>
          <ul>
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>
          <div>
            <button onClick={handleCookSession}>Cook with Friends</button>
            <button onClick={handleFavorites}>Add Favorites</button>
            <button onClick={handleGroceriList}>Add to Grocery List</button>
          </div>
          <hr />
          {recipe.analyzedInstructions &&
          recipe.analyzedInstructions.length > 0 ? (
            <section className="form">
              <ol>
                {recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>
                    <p>{`STEP ${step.number}: ${step.step}`}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : (
            <p>No instructions available.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Recipe;
