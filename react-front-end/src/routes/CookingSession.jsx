import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/css/forms.css";

const CookingSession = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data for the specific cooking session using the id from the URL params
    axios
      .get(`/api/recipes/${id}/cooking-session`)
      .then((response) => setRecipe(response.data))
      .catch((error) =>
        console.error("Error fetching the cooking session's recipe details:", error)
      );
  }, []);

  // Conditionally render based on whether cookingSession is available
  if (recipe === null) {
    // If cookingSession is still null, you can render a loading state or return null
    return <p>Loading...</p>;
  }

  return (<p>{recipe.summary}</p>);
};

export default CookingSession;