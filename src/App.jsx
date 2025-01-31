import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import MapComponent from "./components/MapComponent";
import RouteFinder from "./components/RouteFinder";

// 静的な配列として定義
const libraries = ["places"];

function App() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <div>
      <h1>ルート検索アプリ</h1>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        libraries={libraries}
        loadingElement={<div>読み込み中...</div>}
      >
        <RouteFinder
          onSearch={(o, d) => {
            setOrigin(o);
            setDestination(d);
          }}
        />
        <MapComponent origin={origin} destination={destination} />
      </LoadScript>
    </div>
  );
}

export default App;
