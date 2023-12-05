import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import IngredientList from "./IngredientList";
import "../styles/css/styles.css";
import "../styles/css/recipe.css";
import AddToRecipeList from "./AddToRecipeList";


const RecipeHeader = ({ recipeId, title, imageUrl, ingredients, showButtons }) => {
  const { auth } = useAuth();
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const navigate = useNavigate();

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
        navigate(`/favorites`);
      } else {
        setShowLoginMessage(true);
      }
    } catch (error) {
      console.error("Error adding to Favorites:", error);
      alert("Error adding to Favorites!");
    }
  };

  const showLoginTip = () => {
    setShowLoginMessage(true);
  };

  return (
    <>
      <img className="recipe-img" src={imageUrl} alt={title} />
      <div className="recipe-info">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <h1>{title}</h1>
              <h3 className="ingredients-heading">Ingredients</h3>
              <IngredientList ingredients={ingredients} />
            </div>
            {showButtons &&
              <div className="col-12 col-md-4">
                {
                  auth.userId ? (
                    <>
                      <Link
                        to="/cooking-sessions/new"
                        state={{ recipeId, recipeTitle: title }}
                        className="button"
                      >
                        Cook with Friends
                      </Link>
                    </>) : (
                    <>
                      <button onClick={showLoginTip}>Cook with Friends</button>
                    </>)
                }
                {
                  auth.userId ? (
                    <>
                      <button onClick={handleFavorites}>Add Favorites</button>
                    </>) : (
                    <>
                      <button onClick={showLoginTip}>Add Favorites</button>
                    </>)
                }
                <AddToRecipeList recipeId={recipeId} notAuthorized={showLoginTip} />
                {showLoginMessage && (
                  <>
                    <p className='my-3' style={{ color: "red" }}>You need to login to use these features</p>
                    <Link to="/login">Login</Link>
                  </>
                )}
              </div>

            }
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeHeader;
