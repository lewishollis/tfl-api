import React, { useEffect, useState } from 'react';

const StopArrivals = ({ stopId }) => {
  const [arrivals, setArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArrivals = async () => {
      try {
        // Fetch arrivals data from the TFL API
        const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals`);
        const data = await response.json();

        setArrivals(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArrivals();
  }, [stopId]);

  return (
    <div>
      <h2>Arrivals at Stop ID: {stopId}</h2>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>}

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
