// StopArrivals.js

import React, { useState } from 'react';
import SearchBar from './SearchBar';

const StopArrivals = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${query}`);
      const data = await response.json();

      // For simplicity, assuming the first result contains the relevant information
      const firstResult = data.matches[0];

      // Extract the station ID and set it to the state variable selectedStationId
      if (firstResult) {
        setSelectedStationId(firstResult.id);
      } else {
        setSelectedStationId(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSelectedStationId(null);
    }
  };

  return (
    <div>
      <h2>Stop Arrivals</h2>
      <SearchBar onSearch={handleSearch} />
      {selectedStationId && (
        <p>Selected Station ID: {selectedStationId}</p>
      )}
      {/* Display arrivals and other components here */}
    </div>
  );
};

export default StopArrivals;
