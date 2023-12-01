import React, { useState } from "react";


const SearchBar = ({ onSearch, placeholder }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(search);

    // Clear the search bar
    setSearch("");
  };

  return (
    <form className="col-12 col-md-6" onSubmit={handleSearchSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleSearchChange}
      />
    </form>
  );
};

export default SearchBar;
