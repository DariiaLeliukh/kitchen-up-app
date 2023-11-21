import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResult';

const HomeRoute = (props) => {
const [searchResults, setSearchResults] = useState([]);

const handleSearch = (search) => {
  console.log(`Searching for: ${search}`);

  const fakeData = [
    { id: 1, recipeName: "Spaghetti Alfredo" },
    { id: 2, recipeName: "Lasagna" }
  ];

  const filteredResults = fakeData.filter((result) =>
    result.recipeName.toLowerCase().includes(search.toLowerCase())
  );

  setSearchResults(filteredResults);
};
  return (
    <div className="home-route">
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default HomeRoute;