import React from 'react'

const SearchNotes = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="search-notes">
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          setSearchQuery(e.target.value);
        }}
      />
    </section>
  );
};

export default SearchNotes