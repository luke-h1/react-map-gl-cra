import { useEffect, useState } from 'react';

import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import * as parkData from './data/skateboards.json';
import img from './skate.jpeg';

const App = () => {
  const [viewport, setViewport] = useState<any>({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    width: '100vw',
    height: '100vh',
  });
  const [selectedPark, setSelectedPark] = useState<any>(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);
  }, []);

  return (
    <div>
      <ReactMapGl
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...viewport}
        onViewportChange={(v: any) => setViewport(v)}
        mapStyle="mapbox://styles/lukehowsammap/ckqfmx27z1vc317qhv5oizdj0"
      >
        {parkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              type="button"
              value={selectedPark}
              onClick={(e) => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src={img} alt="skateboard icon" />
            </button>
          </Marker>
        ))}
        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTION}</p>

            </div>
          </Popup>
        ) : null}
      </ReactMapGl>
    </div>
  );
};

export default App;
