import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSockets from "../hooks/useSockets";
import axios from "axios";
import RecipeHeader from "../components/RecipeHeader";
import RecipeInstructionList from "../components/RecipeInstructionList";
import "../styles/css/styles.css";
import Loading from "../components/Loading";


const CookingSession = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  //TODO: Move the useSockets hook to the RecipeInstructionList component if no other socket event is taking place, such as text/voice messages
  const { setCookingInstructions, setCurrentStep, positions } = useSockets(id);

  // Fetch data for the specific cooking session using the id from the URL params
  useEffect(() => {
    axios
      .get(`/api/recipes/${id}/cooking-session`)
      .then((response) => {
        setRecipe(response.data);
        setCookingInstructions(response.data.analyzedInstructions[0]?.steps)
      })
      .catch((error) =>
        console.error(
          "Error fetching the cooking session's recipe details:",
          error
        )
      );
  }, []);

  // Conditional render based on whether the cookingSession is available
  if (recipe === null) {
    return <Loading />;
  }

  return (
    <>
      <RecipeHeader
        recipeId={id}
        title={recipe.title}
        imageUrl={recipe.image}
        ingredients={recipe.extendedIngredients}
        showButtons={false}
      />
      <RecipeInstructionList
        instructions={recipe.analyzedInstructions}
        positions={positions}
        onClickHandler={setCurrentStep}
      />
      {/*messages.map((item, index) => (
        <p key={index}>{item}</p>
      ))*/}
    </>
  );
};

export default CookingSession;


