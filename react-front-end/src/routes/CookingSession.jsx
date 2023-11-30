import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/css/forms.css";
import RecipeHeader from "../components/RecipeHeader";
import RecipeInstructionList from "../components/RecipeInstructionList";

const CookingSession = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data for the specific cooking session using the id from the URL params
    axios
      .get(`/api/recipes/${id}/cooking-session`)
      .then((response) => setRecipe(response.data))
      .catch((error) =>
        console.error(
          "Error fetching the cooking session's recipe details:",
          error
        )
      );
  }, []);

  // Conditionally render based on whether cookingSession is available
  if (recipe === null) {
    // If cookingSession is still null, you can render a loading state or return null
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <RecipeHeader
        title={recipe.title}
        imageUrl={recipe.image}
        ingredients={recipe.extendedIngredients}
      />
      <hr />
      {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
        <RecipeInstructionList
          instructions={recipe.analyzedInstructions[0].steps}
        />
      ) : (
        <p>No instructions available.</p>
      )}
    </div>
  );
};

export default CookingSession;
