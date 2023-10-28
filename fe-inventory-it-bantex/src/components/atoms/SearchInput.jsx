import React from "react";

const SearchInput = ({ search, handleSearchChange }) => {
  return (
    <div className="input-group order-3 md:order-2">
      <input
        type="search"
        placeholder="Search Data..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
