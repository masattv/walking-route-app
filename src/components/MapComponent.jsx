import { useState, useCallback, useMemo } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 35.6895, // 東京
  lng: 139.6917,
};

function MapComponent({ origin, destination }) {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  const directionsCallback = useCallback((response, status) => {
    if (response !== null) {
      if (status === "OK") {
        setDirections(response);
        setError(null);
      } else {
        console.error("Directions request failed due to " + status);
        setError(status);
      }
    }
  }, []);

  const directionsOptions = useMemo(() => {
    if (!origin || !destination) return null;
    return {
      destination: destination,
      origin: origin,
      travelMode: "WALKING"
    };
  }, [origin, destination]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
    >
      {directionsOptions && (
        <DirectionsService
          options={directionsOptions}
          callback={directionsCallback}
        />
      )}
      {directions && <DirectionsRenderer directions={directions} />}
      {error && <div style={{ color: "red" }}>ルート検索エラー: {error}</div>}
    </GoogleMap>
  );
}

export default MapComponent;
