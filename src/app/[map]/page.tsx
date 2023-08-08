"use client";
import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
// import { withGoogleMap, GoogleMap, Marker, InfoWindow,Polyline } from 'react-google-maps';
import { useQuery } from "@tanstack/react-query";
import React from "react";
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function MyComponent() {
  const callAPI = async () => {
    try {
      const res = await fetch(`/api`, {
        method: "GET",
      });
      const data: Pair[] = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, isLoading, error } = useQuery(["maps"], () => callAPI());

  const center: Point = {
    lat: data ? data[0].a.lat : 0,
    lng: data ? data[0].a.lng : 0,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.API_KEY!,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error || !data) return `Error! ${error}`;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {data.map(({ a, b }, i) => (
        <Polyline
          key={i}
          path={[
            { lat: a.lat, lng: a.lng },
            { lat: b.lat, lng: b.lng },
          ]}
          geodesic={true}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
