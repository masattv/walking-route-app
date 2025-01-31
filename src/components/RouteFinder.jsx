import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

function RouteFinder({ onSearch }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originRef, setOriginRef] = useState(null);
  const [destinationRef, setDestinationRef] = useState(null);

  const handleSearch = () => {
    if (originRef && destinationRef) {
      const originPlace = originRef.getPlace();
      const destinationPlace = destinationRef.getPlace();
  
      console.log("🟢 originPlace:", originPlace);
      console.log("🟢 destinationPlace:", destinationPlace);
  
      if (!originPlace || !destinationPlace) {
        alert("❌ 正しい場所を選択してください！");
        return;
      }
  
      const originLocation = originPlace.geometry?.location;
      const destinationLocation = destinationPlace.geometry?.location;
  
      console.log("✅ 出発地（緯度・経度）:", originLocation);
      console.log("✅ 目的地（緯度・経度）:", destinationLocation);
  
      if (originLocation && destinationLocation) {
        onSearch(
          { lat: originLocation.lat(), lng: originLocation.lng() },
          { lat: destinationLocation.lat(), lng: destinationLocation.lng() }
        );
      } else {
        alert("⚠️ 位置情報を取得できませんでした");
      }
    }
  };

  return (
    <div>
      <Autocomplete onLoad={(ref) => setOriginRef(ref)}>
        <input
          type="text"
          placeholder="出発地"
          onChange={(e) => setOrigin(e.target.value)}
          value={origin}
        />
      </Autocomplete>
      <Autocomplete onLoad={(ref) => setDestinationRef(ref)}>
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
