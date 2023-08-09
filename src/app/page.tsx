"use client";

import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ViewTable from "./components/ViewTable";
import { EQueryKeys } from "./utils/queryClient";
import Loader from "./components/Loader";
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function MyComponent() {
  const callAPI = async () => {
    try {
      const res = await axios.get("/api");
      const data: Pair[] = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, isLoading, error } = useQuery([EQueryKeys.maps], () =>
    callAPI()
  );

  const center: Point = {
    lat: data ? data[0].a.lat : 0,
    lng: data ? data[0].a.lng : 0,
    timestamp: data ? data[0].a.timestamp : new Date(Date.now()),
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.API_KEY!,
  });

  if (isLoading || !isLoaded || !data) return <Loader />;

  if (error) return `Error! ${error}`;

  return (
    <div className="flex max-h-screen">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
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
  );
}

export default React.memo(MyComponent);
