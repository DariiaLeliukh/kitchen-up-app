import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const { auth } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [detailedFavorites, setDetailedFavorites] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites", {
          params: { id: auth.userId }
        });

        if (response.data && response.data.dataFavorites) {
          setFavorites(response.data.dataFavorites);

        setDetailedFavorites(response.data.dataFavorites);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container">
      <div>
        <h2>Favorites</h2>
        {error && <p>Error fetching favorites: {error.message}</p>}
        {detailedFavorites.length > 0 ? (
          <div>
            {detailedFavorites.map((favorite) => {
              console.log("Favorite ID:", favorite.id);
              console.log("Favorite Title:", favorite.title);
              console.log("Favorite Image:", favorite.image);
              return (
                <div key={favorite.id}>
                  <Link to={`/recipe/${favorite.id}`}>
                    <img
                      src={favorite.image}
                      alt={favorite.title}
                      style={{
                        width: "295px",
                        height: "253px",
                        top: "580px",
                        left: "93px"
                      }}
                    />
                    <p>{favorite.title}</p>
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


