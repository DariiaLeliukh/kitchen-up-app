import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/css/forms.css";

const Recipe = (props) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        console.log("Data from backend:", data);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleFavorites = () => {
    alert("Added to Favorites!");
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
            <Link to="/cooking-sessions/new" state={{ id, recipeTitle: recipe.title }} className="button">Cook with Friends</Link>
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
