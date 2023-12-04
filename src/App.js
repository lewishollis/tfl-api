import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const StopArrivals = () => {
  let [selectedStationId, setSelectedStationId] = useState(null);
  let [arrivals, setArrivals] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${query}`);
      const data = await response.json();

      // For simplicity, assuming the first result contains the relevant information
      const firstResult = data.matches[0];

      // Extract the station ID and station name
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
              <h1>Station Name: {arrival.stationName}</h1>
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
