// StationId.js

import React from 'react';

const StationId = ({ selectedStationId }) => {
  return (
    <div>
      {selectedStationId ? (
        <p>Selected Station ID: {selectedStationId}</p>
      ) : (
        <p>No station selected</p>
      )}
    </div>
  );
};

export default StationId;
