import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ combinedResults }) => {
  return (
    <div>
      {/* <h2>Search Results</h2> */}
      {combinedResults.length > 0 ? (
        <ul>
          {combinedResults.map((result, index) => (
            <li key={`${result.id}-${index}`}>
              <Link to={`/recipe/${result.id}`}>
                <img src={result.image} alt={result.title} />
                <p>{result.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchResults;
