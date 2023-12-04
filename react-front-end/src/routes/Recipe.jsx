import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import RecipeHeader from "../components/RecipeHeader";
import RecipeInstructionList from "../components/RecipeInstructionList";
import "../styles/css/styles.css";

const Recipe = (props) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        // console.log("Data from backend:", data);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <>
      {recipe ? (
        <>
          <RecipeHeader
            recipeId={id}
            title={recipe.title}
            imageUrl={recipe.image}
            ingredients={recipe.extendedIngredients}
            showButtons={true}
          />
          <RecipeInstructionList instructions={recipe.analyzedInstructions} />
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