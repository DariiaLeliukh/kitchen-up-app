import { useState, useEffect } from "react";
import Search from "./Search";
import RecipeCardItem from "../components/RecipeCardItem";

const HomeRoute = () => {
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

  const removeDefaultRecipes = () => {
    setRandomRecipes([]);
  };

  return (
    <div className="home-route container">
      <Search removeDefaultRecipes={removeDefaultRecipes} />
      {randomRecipes &&
        <div className="row random-recipes">
          {randomRecipes.map((recipe) => (
            <RecipeCardItem key={recipe.id} id={recipe.id} imageUrl={recipe.image} title={recipe.title} />
          ))}
        </div>
      }


    </div>
  );
};

export default HomeRoute;
