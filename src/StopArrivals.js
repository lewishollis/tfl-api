// StopArrivals.js

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const StopArrivals = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchArrivals = async () => {
      if (!selectedStationId) {
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${selectedStationId}/Arrivals`);
        const data = await response.json();

        setArrivals(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArrivals();
  }, [selectedStationId]);

  return (
    <div>
      <h2>Stop Arrivals</h2>
      <SearchBar onSearch={handleSearch} />
      {selectedStationId && (
        <p>Selected Station ID: {selectedStationId}</p>
      )}

      {loading && <p>Loading arrivals...</p>}

      {error && <p>Error fetching arrivals: {error.message}</p>}

      {arrivals.length > 0 && (
        <ul>
          {arrivals.map((arrival) => (
            <li key={arrival.id}>
              <p>Line: {arrival.lineName}</p>
              <p>Destination: {arrival.destinationName}</p>
              <p>Time to Arrival: {arrival.timeToStation} seconds</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StopArrivals;
