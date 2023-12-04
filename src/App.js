import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import './App.css';

const StopArrivals = () => {
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${query}`);
      const data = await response.json();
      const firstResult = data.matches[0];

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
    <div className="stop-arrivals-container">
      <SearchBar onSearch={handleSearch} />
      {selectedStationId && (
        <p className="selected-station-id">Selected Station ID: {selectedStationId}</p>
      )}

      {loading && <p className="loading-message">Loading arrivals...</p>}

      {error && <p className="error-message">Error fetching arrivals: {error.message}</p>}

      {arrivals.length > 0 && (
        <ul className="arrivals-list">
          {arrivals.map((arrival) => (
            <li key={arrival.id}>
              <h1 className="station-name">Station Name: {arrival.stationName}</h1>
              <p className="line-name">Line: {arrival.lineName}</p>
              <p className="destination-name">Destination: {arrival.destinationName}</p>
              <p className="time-to-arrival">Time to Arrival: {arrival.timeToStation} seconds</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StopArrivals;
