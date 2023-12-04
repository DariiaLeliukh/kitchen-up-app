import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const Favorites = () => {
  const { auth } = useAuth();
  const [detailedFavorites, setDetailedFavorites] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites", {
          params: { id: auth.userId }
        });

        setDetailedFavorites(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchFavorites();
  }, []);
  console.log(detailedFavorites);
  // Conditional render based on whether the recipe is available
  if (detailedFavorites === null) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div>
        <h2>Favorites</h2>
        {error && <p>Error fetching favorites: {error.message}</p>}
        {detailedFavorites.length > 0 ? (
          <div>
            {detailedFavorites.map((favorite) => {
              return (
                <div key={favorite.id}>
                  <Link to={`/recipes/${favorite.apiRecipeId}`}>
                    <img
                      src={favorite.recipeImage}
                      alt={favorite.recipeTitle}
                      style={{
                        width: "295px",
                        height: "253px",
                        top: "580px",
                        left: "93px"
                      }}
                    />
                    <p>{favorite.recipeTitle}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p>You haven&apos;t selected any recipe as a Favorite.  <Link to={`/`}>Here</Link> are some suggestions for you!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
