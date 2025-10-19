import React from "react";

function SearchBar() {
  return (
    <>
      <form className="relative flex justify-between items-center w-full">
        <input
          type="text"
          id="search"
          placeholder="Search by name, job, or skill"
          className="my-auto h-11 w-full px-5 bg-gray-200 rounded-3xl placeholder:truncate pr-14 focus:outline-none"
          aria-label="Search by name, job, or skill"
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
