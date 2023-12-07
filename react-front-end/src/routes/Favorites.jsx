import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import RecipeCardItem from "../components/RecipeCardItem";

const Favorites = () => {
  const { auth } = useAuth();
  const [detailedFavorites, setDetailedFavorites] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites", {
          params: { id: auth.userId }
        });

        setDetailedFavorites(response.data);

        setDetailedFavorites(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchFavorites();
  }, []);

  // Conditional render based on whether the recipe is available
  if (detailedFavorites === null) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  const handleDeleteFavorite = async (apiRecipeId) => {
    try {
      const response = await axios.delete(`/api/favorites/delete/${apiRecipeId}?user_id=${auth.userId}`);

      setDetailedFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.apiRecipeId !== apiRecipeId)
      );
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
    <div className="container favorites-page">
      <div className="row">
        <div className="col-12">
          <h1>Favorites</h1>
        </div>
      </div>

      {error && (
        <div className="row">
          <div className="col-12">
            <p>Error fetching favorites: {error.message}</p>
          </div>
        </div>
      )}
      {detailedFavorites.length > 0 ? (
        <div className="row">
          {detailedFavorites.map((favorite) => {
            return (
              <>
                <RecipeCardItem id={favorite.apiRecipeId} imageUrl={favorite.recipeImage} title={favorite.recipeTitle} />

                {/* <button onClick={() => handleDeleteFavorite(favorite.apiRecipeId)}>Delete</button> */}
              </>
            );
          })}
        </div>
      ) : (
        <p>You haven&apos;t selected any recipe as a Favorite.  <Link to={`/`}>Here</Link> are some suggestions for you!</p>
      )}

    </div>
  );
};

export default Favorites;
