import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ combinedResults }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {combinedResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {combinedResults.map((result, index) => (
            <li key={`${result.id}-${index}`}>{result.recipeName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
