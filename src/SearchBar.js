import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a station..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
