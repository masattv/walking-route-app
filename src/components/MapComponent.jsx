import { useState } from "react";
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

  const directionsCallback = (response, status) => {
    if (response !== null) {
      if (status === "OK") {
        setDirections(response);
      } else {
        console.error("Directions request failed due to " + status);
        setError(status);
      }
    }
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      {origin && destination && (
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: "WALKING",
          }}
          callback={directionsCallback}
        />
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default MapComponent;
