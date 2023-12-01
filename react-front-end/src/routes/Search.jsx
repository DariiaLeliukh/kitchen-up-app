import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResult';

const Search = (props) => {
  const [nameResults, setNameResults] = useState([]);
  const [ingredientResults, setIngredientResults] = useState([]);

  const handleNameSearch = async (search) => {
    try {
      const response = await fetch(`/api/search?name=${search}`);
      const data = await response.json();
      // console.log("Data from backend:", data);
      setNameResults(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIngredientSearch = async (search) => {
  try {
    const response = await fetch(`/api/search?ingredients=${search}`);
    const data = await response.json();
    // console.log("Data from backend:", data);
    setIngredientResults(Array.isArray(data) ? data : []);
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

export default Search;