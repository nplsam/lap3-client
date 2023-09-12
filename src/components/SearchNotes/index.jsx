import React from 'react'

const SearchNotes = ({ searchQuery, setSearchQuery, clearSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          setSearchQuery(e.target.value);
        }}
      />
      <button onClick={clearSearch}>Clear Search</button>
    </div>
  );
};

export default SearchNotes