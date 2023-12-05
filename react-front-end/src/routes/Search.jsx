import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCardItem from '../components/RecipeCardItem';

const Search = (props) => {
  const [nameResults, setNameResults] = useState([]);
  const [ingredientResults, setIngredientResults] = useState([]);

  const handleNameSearch = async (search) => {
    try {
      const response = await fetch(`/api/search?name=${search}`);
      const data = await response.json();
      setNameResults(Array.isArray(data.results) ? data.results : []);
      // quick fix for now
      // TODO: fix properly later
      if (typeof props.removeDefaultRecipes !== "undefined") {
        props.removeDefaultRecipes();
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIngredientSearch = async (search) => {
    try {
      const response = await fetch(`/api/search?ingredients=${search}`);
      const data = await response.json();
      setIngredientResults(Array.isArray(data) ? data : []);
      props.removeDefaultRecipes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    <div className='search-container container'>
      <div className="row search-fields">
        <div className="col-12 col-md-6">
          <SearchBar
            onSearch={(search) => handleSearchSubmit(search, "name")}
            placeholder="Search by Name"
          />
        </div>
        <div className="col-12 col-md-6">
          <SearchBar
            onSearch={(search) => handleSearchSubmit(search, "ingredient")}
            placeholder="Search by Ingredient"
          />
        </div>
      </div>
      <div className="results-container">
        <div className="row">
          {combinedResults.map((recipe) => (
            <RecipeCardItem key={recipe.id} id={recipe.id} imageUrl={recipe.image} title={recipe.title} />
          ))}
        </div>
      </div>
    </div>

  );
};

export default Search;