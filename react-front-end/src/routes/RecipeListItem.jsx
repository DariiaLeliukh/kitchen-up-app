import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router";

const RecipeListItem = () => {
  const { id } = useParams();

  const [recipeList, setRecipeList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    axios
      .get("/api/recipe-lists", { params: { id } })
      .then((response) => {
        setRecipeList(response.data.data[0]);
      })
      .catch((error) => console.error("Error fetching recipe lists:", error));
  }, []);

  useEffect(() => {
    axios
      .get("/api/recipe-list-items", { params: { recipeListId: id } })
      .then((response) => {
        console.log(response);
        setRecipes(response.data.items);
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
          <li key={recipe.id}>{recipe.api_recipe_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListItem;
