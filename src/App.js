// App.js

import React from 'react';
import StopArrivals from './StopArrivals';

const App = () => {
  const stopId = '940GZZLUEPY';

  return (
    <div>
      <h1>My TFL App</h1>
      <StopArrivals stopId={stopId} />
    </div>
  );
};

export default App;
