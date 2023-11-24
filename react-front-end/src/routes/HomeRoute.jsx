import React, { useState, useEffect } from "react";

const HomeRoute = (props) => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();
        setRandomRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching random recipes:", error);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <div className="home-route">
      <ul>
        {randomRecipes.map((recipe) => (
          <li key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeRoute;
