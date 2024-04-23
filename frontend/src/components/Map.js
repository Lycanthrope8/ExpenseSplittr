import { useState, useRef, useMemo, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
// import Places from './Places';
// import Distance from './Distance';

// const LatLngLiteral = google.maps.LatLngLiteral;
// const DirectionsResult = google.maps.DirectionsResult;
// const MapOptions = google.maps.MapOptions;

// const generateHomes = (position: LatLngLiteral) => {
//     const home: Array<LatlngLiteral> = [];
// }
export const Map = () => {
  const mapRef = useRef(null);
  const center = useMemo(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo(
    () => ({
      mapId: "92273de6b6ac3dd1",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  return (
    <div className="flex">
      <div className="controls w-[20%] p-1 bg-black text-text">
        <h1>commute?</h1>
      </div>
      <div className="map w-[80%] h-[20vh]">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="width-full h-full"
          options={options}
          onLoad={onLoad}
        ></GoogleMap>
      </div>
    </div>
  );
};
