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
      <div className="recipe-info">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              {imageUrl && (
                <img src={imageUrl} className="recipe-img" alt={title} />
              )}
              {!imageUrl && (
                <img src="/src/assets/recipe-demo-card.jpg" className="recipe-img" alt="..." />
              )}
            </div>
            <div className="col-12 col-md-6">
              <h1>{title}</h1>
              <h3 className="ingredients-heading">Ingredients</h3>
              <IngredientList ingredients={ingredients} />
            </div>
          </div>
          <div className="row recipe-actions">
            {showButtons && (
              <>
                <div className="col">
                  {
                    auth.userId ? (
                      <p>
                        <Link
                          to="/cooking-sessions/new"
                          state={{ recipeId, recipeTitle: title }}
                          className="button text-center"
                        >
                          Cook with Friends
                        </Link>
                      </p>) : (
                      <>
                        <button onClick={showLoginTip}>Cook with Friends</button>
                      </>)
                  }
                </div>
                <div className="col">
                  {
                    auth.userId ? (
                      <>
                        <button onClick={handleFavorites}>Add To Favorites</button>
                      </>) : (
                      <>
                        <button onClick={showLoginTip}>Add To Favorites</button>
                      </>)
                  }
                </div>
                <div className="col">
                  < AddToRecipeList recipeId={recipeId} notAuthorized={showLoginTip} />
                </div>
              </>
            )}
          </div>
          <div className="row">
            <div className="col-12">
              {showLoginMessage && (
                <div className="warning-message">
                  <p>You need to <Link to="/login">login</Link> to use these features</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div >

    </>
  );
};

export default RecipeHeader;
