import { useState, useCallback } from "react";
import { Autocomplete } from "@react-google-maps/api";

function RouteFinder({ onSearch }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originRef, setOriginRef] = useState(null);
  const [destinationRef, setDestinationRef] = useState(null);

  const handleOriginLoad = useCallback((ref) => {
    setOriginRef(ref);
  }, []);

  const handleDestinationLoad = useCallback((ref) => {
    setDestinationRef(ref);
  }, []);

  const handleSearch = useCallback(() => {
    if (originRef && destinationRef) {
      const originPlace = originRef.getPlace();
      const destinationPlace = destinationRef.getPlace();
  
      if (!originPlace || !destinationPlace) {
        alert("❌ 正しい場所を選択してください！");
        return;
      }
  
      const originLocation = originPlace.geometry?.location;
      const destinationLocation = destinationPlace.geometry?.location;
  
      if (originLocation && destinationLocation) {
        onSearch(
          { lat: originLocation.lat(), lng: originLocation.lng() },
          { lat: destinationLocation.lat(), lng: destinationLocation.lng() }
        );
      } else {
        alert("⚠️ 位置情報を取得できませんでした");
      }
    }
  }, [originRef, destinationRef, onSearch]);

  return (
    <div>
      <Autocomplete
        onLoad={handleOriginLoad}
        onPlaceChanged={() => {}}
      >
        <input
          type="text"
          placeholder="出発地"
          onChange={(e) => setOrigin(e.target.value)}
          value={origin}
        />
      </Autocomplete>
      <Autocomplete
        onLoad={handleDestinationLoad}
        onPlaceChanged={() => {}}
      >
        <input
          type="text"
          placeholder="目的地"
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </Autocomplete>
      <button onClick={handleSearch}>ルート検索</button>
    </div>
  );
}

export default RouteFinder;
