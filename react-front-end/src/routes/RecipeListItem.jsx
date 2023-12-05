import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import RecipeCardItem from "../components/RecipeCardItem";

const RecipeListItem = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();  //recipe list id

  const [recipeList, setRecipeList] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/recipe-lists/${id}`)
      .then((response) => {
        setRecipeList(response.data.data[0]);
      })
      .catch((error) => console.error("Error fetching recipe lists:", error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`/api/recipe-lists/${id}/items`)
      .then((response) => {
        setRecipes(response.data.data);
      })
      .catch((error) => console.error("Error fetching recipe items:", error));
  }, []);

  const deleteList = () => {
    axios
      .delete(`/api/recipe-lists/${id}`)
      .then(() => {
        navigate(`/recipe-lists`);
      })
      .catch((error) => console.error("Error fetching recipe items:", error));

  };

  return (
    <>
      {recipeList && (
        <div className="container recipe-list-single-page">
          <div className="row align-items-center">
            <div className="col-6">
              <h1>{recipeList.name}</h1>
            </div>
            <div className="col-6">
              <Link to={`/recipe-list/${id}/grocery-list`} className="button text-center mr-2">
                Grocery List
              </Link>
              <button onClick={deleteList}>Delete</button>
            </div>
          </div>
          {
            recipes.length > 0 ? (
              <>
                <div className="row mt-5">
                  {recipes.map((recipe) => (
                    <RecipeCardItem key={recipe.apiRecipeId} id={recipe.apiRecipeId} imageUrl={recipe.recipeImage} title={recipe.recipeTitle} />
                  ))}
                </div>
              </>
            ) : (<Loading />)
          }

        </div>
      )
      }
    </>
  );
};
export default RecipeListItem;
