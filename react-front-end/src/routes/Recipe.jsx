import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/css/forms.css";
import "../styles/css/styles.css";
import "../styles/css/recipe.css";

const Recipe = (props) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipe/${recipeId}`);
        const data = await response.json();
        // console.log("Data from backend:", data);
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
    <>
      {
        recipe ? (
          <>
            <img className="recipe-img" src={recipe.image} alt={recipe.title} />
            <div className="recipe-info">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-8">
                    <h1>{recipe.title}</h1>
                    <h3 className="ingredients-heading" >Ingredients</h3>
                    <ul className="ingredient-list">
                      {recipe.extendedIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.original}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-12 col-md-4">
                    <Link to="/cooking-sessions/new" state={{ recipeId, recipeTitle: recipe.title }} className="button">Cook with Friends</Link>
                    <button onClick={handleFavorites}>Add Favorites</button>
                    <button onClick={handleGroceriList}>Add to Grocery List</button>

                  </div>

                </div>
              </div>
            </div>
            <div className="container" >
              <div>
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
            </div >

          </>
        ) : (
          <div className="container">
            <p>Loading...</p>
          </div>
        )}
    </>
  );
};

export default Recipe;
