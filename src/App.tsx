import { useState } from 'react';
import ReactMapGl from 'react-map-gl';

const App = () => {
  const [viewport] = useState<any>({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  });
  return (
    <div>
      <ReactMapGl disableTokenWarning {...viewport}>
        Markers go here
      </ReactMapGl>
    </div>
  );
};

export default App;
