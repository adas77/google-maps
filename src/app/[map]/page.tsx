"use client";
import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
// import { withGoogleMap, GoogleMap, Marker, InfoWindow,Polyline } from 'react-google-maps';
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ViewTable from "../components/ViewTable";
const containerStyle = {
  width: "70vw",
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
    timestamp: data ? data[0].a.timestamp : new Date(Date.now()),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.API_KEY!,
  });

  const [map, setMap] = useState(null);
  const [chosen, setChosen] = useState(data);

  const choose = (id: string) => {
    if (!data) return;
    const copy = { ...data };
    const update = copy.filter((x) => x.id === id);
    setChosen(update);
  };

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
    <div className="flex">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {data
          .filter((p) => p.visible === true)
          .map(({ a, b }, i) => (
            <Polyline
              key={i}
              path={[
                { lat: a.lat, lng: a.lng },
                { lat: b.lat, lng: b.lng },
              ]}
            />
          ))}
      </GoogleMap>
      <ViewTable pairs={data} />
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
