import { useState, useRef } from "react";
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
  const center = { lat: 40.7128, lng: -74.006 };
  return (
    <div className="flex">
      <div className="controls w-[20%] p-1 bg-black text-text">
        <h1>commute?</h1>
      </div>
      <div className="map w-[80%] h-[20vh]">
        <GoogleMap
          id="marker-example"
          zoom={10}
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          center={{
            lat: 40.7128,
            lng: -74.006,
          }}
        >
          <Marker
            position={{
              lat: 40.7128,
              lng: -74.006,
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
};
