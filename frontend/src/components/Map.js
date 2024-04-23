import { useState, useRef, useMemo, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import { Places } from './Places';
// import Distance from './Distance';

// const LatLngLiteral = google.maps.LatLngLiteral;
// const DirectionsResult = google.maps.DirectionsResult;
// const MapOptions = google.maps.MapOptions;

// const generateHomes = (position: LatLngLiteral) => {
//     const home: Array<LatlngLiteral> = [];
// }
export const Map = (props) => {
  const { isLoaded } = props;
  const [home, setHome] = useState(null);
  const mapRef = useRef();
  const center = { lat: 23.8041, lng: 90.4152 };
  const options = useMemo(() => ({
    mapId: "92273de6b6ac3dd1",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);


  return (
    <div className="flex flex-col">
      <div className="controls w-[20%] p-1 bg-black text-text">
        <h1>commute?</h1>
        <Places setHome={(position) => {
          setHome(position);
          mapRef.current?.panTo(position);
        }} />
      </div>
      <div className="map w-full h-[80vh]">
        {isLoaded && (<GoogleMap zoom={11} center={center} mapContainerClassName="w-full h-full" options={options} onLoad={onLoad}></GoogleMap>)}
      </div>
    </div>
  );
};
