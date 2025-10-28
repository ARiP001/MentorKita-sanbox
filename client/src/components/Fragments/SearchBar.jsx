import React, { useState } from "react";

function SearchBar({ onSearch, searchValue, setSearchValue }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    // Real-time search as user types
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <>
      <form className="relative flex justify-between items-center w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Search by name, job, or course"
          value={searchValue}
          onChange={handleInputChange}
          className="my-auto h-11 w-full px-5 bg-gray-200 rounded-3xl placeholder:truncate pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          aria-label="Search by name, job, or course"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-0 mr-2 rounded-full p-2 hover:bg-gray-300 transition-all"
        >
          <img
            loading="lazy"
            src="../svg/search-icon.svg"
            alt="Search icon"
            className="shrink-0 w-6 aspect-square"
          />
        </button>
      </form>
    </>
  );
}

export default SearchBar;
