import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Favorites = () => {
  const { auth } = useAuth();
  const [favorites, setFavorites] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites/${auth.userId}`);
        const responseData = await response.json();

        if (responseData.data === null) {
          console.log("No favorites found for the user.");
        } else {
          setFavorites(responseData.data);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [auth.userId]);

  return (
    <div className="container">
      <div>
        <h2>Favorites</h2>
        {favorites && (
          <div>
            {favorites.map((favorite) => (
              <div key={favorite.id}>
                <h3>{favorite.title}</h3>
                <p>{favorite.image}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Favorites;
