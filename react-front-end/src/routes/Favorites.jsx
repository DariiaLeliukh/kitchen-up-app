import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import axios from "axios";

const Favorites = () => {
  const { auth } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [detailedFavorites, setDetailedFavorites] = useState([]);

  // Need to hide key
  const recipeApiUrl = (recipeId) =>
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=6d4b39f84f3548a3a9bc5061cd0a49b9&includeNutrition=false`;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites/${auth.userId}`);
        const responseData = await response.json();

        if (responseData.data === null) {
          console.log("No favorites found for the user.");
        } else {
          setFavorites(responseData.data);

          const detailsPromises = responseData.data.map(async (favorite) => {
            try {
              const detailResponse = await axios.get(recipeApiUrl(favorite));
              return detailResponse.data;
            } catch (error) {
              return null;
            }
          });

          const detailedFavoritesData = await Promise.all(detailsPromises);
          const validDetailedFavorites = detailedFavoritesData.filter(Boolean);
          setDetailedFavorites(validDetailedFavorites);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchFavorites();
  }, [auth.userId]);

  return (
    <div className="container">
      <div>
        <h2>Favorites</h2>
        {error && <p>Error fetching favorites: {error.message}</p>}
        {detailedFavorites.length > 0 ? (
          <div>
            {detailedFavorites.map((favorite, index) => (
              <div key={`${favorite.id}_${index}`}>
                <h3>{favorite.title}</h3>
                <img src={favorite.image} alt={favorite.title} />
              </div>
            ))}
          </div>
        ) : (
          <p>Loading favorites...</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
