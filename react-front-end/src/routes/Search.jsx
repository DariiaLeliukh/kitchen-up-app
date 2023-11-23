import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResult';

const HomeRoute = (props) => {
const [nameResults, setNameResults] = useState([]);
const [ingredientResults, setIngredientResults] = useState([]);
  
//  Will connect to API
  const recipes = [
    {
      id: 1,
      recipeName: "Spaghetti Alfredo",
      ingredients: ["pasta", "cream", "parmesan"]
    },
    {
      id: 2,
      recipeName: "Lasagna",
      ingredients: ["pasta", "tomato sauce", "cheese"]
    },
    {
      id: 3,
      recipeName: "Pasta with Tomato Sauce",
      ingredients: ["pasta", "tomato sauce"]
    },
    {
      id: 4,
      recipeName: "Chicken Stir-Fry",
      ingredients: ["chicken", "vegetables", "soy sauce"]
    }
  ];

const handleNameSearch = (search) => {
  console.log(`Searching by name for: ${search}`);

const filteredNameResults = recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search.toLowerCase())
    );
    setNameResults(filteredNameResults);
  };

const handleIngredientSearch = (search) => {
  console.log(`Searching by ingredient for: ${search}`);

  const filteredIngredientResults = recipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(search.toLowerCase())
    )
  );
  setIngredientResults(filteredIngredientResults);
};
  const handleSearchSubmit = (search, searchType) => {
    // Clear old results based on searchType
    if (searchType === "name") {
      setIngredientResults([]);
    } else if (searchType === "ingredient") {
      setNameResults([]);
    }

    // Perform the new search
    if (searchType === "name") {
      handleNameSearch(search);
    } else if (searchType === "ingredient") {
      handleIngredientSearch(search);
    }
  };
  
  const combinedResults = [...nameResults, ...ingredientResults];

  return (
    <div className="home-route">
      <div className="search-container">
        <SearchBar
          onSearch={(search) => handleSearchSubmit(search, "name")}
          placeholder="Search by Name"
        />
        <SearchBar
          onSearch={(search) => handleSearchSubmit(search, "ingredient")}
          placeholder="Search by Ingredient"
        />
      </div>
      <div className="results-container">
        <SearchResults combinedResults={combinedResults} />
      </div>
    </div>
  );
};

export default HomeRoute;