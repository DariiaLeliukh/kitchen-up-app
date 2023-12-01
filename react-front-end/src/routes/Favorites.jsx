import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = () => {

  const { auth } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [detailedFavorites, setDetailedFavorites] = useState([]);

  const fetchRecipe = async (api_recipe_id) => {
    try {
      const response = await axios.get(`/api/recipe/${api_recipe_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const response = await fetch(`/api/favorites/${auth.userId}`);
      const responseData = await response.json();

      if (responseData.data === null) {
        // Handle the case when no favorites are found for the user
      } else {
        setFavorites(responseData.data);

        const detailsPromises = responseData.data.map(async (api_recipe_id) => {
          try {
            const detailResponse = await fetchRecipe(api_recipe_id);
            return detailResponse;
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
                <Link to={`/recipe/${favorite.id}`}>
                  <img src={favorite.image} alt={favorite.title}
                    
                    style={{
                    width: '295px',
                    height: '253px',
                    top: '580px',
                    left: '93px',
                  }} />
                  <p>{favorite.title}</p>
                </Link>
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


