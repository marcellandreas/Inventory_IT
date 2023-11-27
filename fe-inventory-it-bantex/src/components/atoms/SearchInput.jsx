import React from "react";

const SearchInput = ({ search, onChange }) => {
  return (
    <div className="input-group order-3 md:order-2 w-full">
      <input
        type="search"
        placeholder="Search Data..."
        value={search}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
