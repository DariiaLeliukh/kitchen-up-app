import React, { useState, useEffect } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const HomeRoute = (props) => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();

        // Filter out recipes without instructions
        const recipesWithInstructions = data.recipes.filter(
          (recipe) =>
            recipe.analyzedInstructions &&
            recipe.analyzedInstructions.length > 0
        );

        setRandomRecipes(recipesWithInstructions);
      } catch (error) {
        console.error("Error fetching random recipes:", error);
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <div className="home-route">
      <Search />
      <ul>
        {randomRecipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeRoute;
