import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const RecipeListItem = () => {
  const { id } = useParams();  //recipe list id

  const [recipeList, setRecipeList] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recipe-list", { params: { id } })
      .then((response) => {
        setRecipeList(response.data.data[0]);
      })
      .catch((error) => console.error("Error fetching recipe lists:", error));
  }, [id]);

  useEffect(() => {
    axios
      .get("/api/recipe-list-items", { params: { recipeListId: id } })
      .then((response) => {
        console.log(response);
        setRecipes(response.data.data);
      })
      .catch((error) => console.error("Error fetching recipe items:", error));
  }, []);

  return (
    <div className="container">
      <h1>{recipeList && recipeList.name}</h1>
      <p>
        Created on{" "}
        {recipeList && new Date(recipeList.created_at).toLocaleDateString()}
      </p>

      <h3>Recipes:</h3>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.apiRecipeId}>
            ID: {recipe.apiRecipeId}
            Title : {recipe.recipeTitle}
            Image: {recipe.recipeImage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListItem;
