import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch, placeholder }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // try {
    //   const response = await axios.get(
    //     `https://api.spoonacular.com/recipes/complexSearch`,
    //     {
    //       params: {
    //         apiKey: "da20f6d285c34e9fb39f9f33fcdebe11",
    //         query: search,
    //       },
    //     }
    //   );

    onSearch(search); //response.data.results

    // Clear the search bar
    setSearch("");
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default SearchBar;
