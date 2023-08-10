"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "./components/atoms/Loader";
import Map from "./components/maps/Map";
import ViewTable from "./components/table/ViewTable";
import { useGoogleLoader } from "./hooks/useGoogleLoader";
import useMap from "./hooks/useMap";
import mapService from "./service/mapSevrice";
import { EQueryKeys } from "./utils/queryClient";

function App() {
  const { isLoaded } = useGoogleLoader();
  const { updateCenter } = useMap();

  const { data, error } = useQuery(
    [EQueryKeys.maps],
    mapService.getDefaultCSV,
    {
      onSuccess: (data) => {
        data && updateCenter(data[0].a);
      },
      refetchOnWindowFocus: false,
    }
  );

  if (!isLoaded || !data) return <Loader />;

  if (error) return `Error! ${error}`;

  return (
    <div className="flex max-h-screen">
      <ViewTable pairs={data} />
      <Map pairs={data} />
    </div>
  );
}

export default React.memo(App);
