/* eslint-disable no-unused-vars */
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import LogoMap from '../assets/yoga-logo-map.png';

const containerStyle = {
  width: '100%', height: '500px',
};

const center = { lat: 47.90334, lng: 20.37158 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((mapLoaded) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    setMap(mapLoaded);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={center}
        icon={{ url: LogoMap, scaledSize: new window.google.maps.Size(65, 60) }}
      />
    </GoogleMap>
  ) : <></>;
}

export default Map;
