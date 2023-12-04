import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const { auth } = useAuth();
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites", {
          params: { id: auth.userId }
        });

        if (response.data && response.data.data) {
          setDetailedFavorites(response.data.data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchFavorites();
  }, []);
  console.log(detailedFavorites);
  return (
    <div className="container">
      <div>
        <h2>Favorites</h2>
        {error && <p>Error fetching favorites: {error.message}</p>}
        {Array.isArray(detailedFavorites) && detailedFavorites.length > 0 ? (
          <div>
            {detailedFavorites.map((favorite) => {
              return (
                <div key={favorite.id}>
                  <Link to={`/recipe/${favorite.apiRecipeId}`}>
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
          <p>Loading favorites...</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
