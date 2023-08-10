"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "./components/Loader";
import Map from "./components/Map";
import ViewTable from "./components/ViewTable";
import { EQueryKeys } from "./utils/queryClient";
import { useGoogleLoader } from "./utils/useGoogleLoader";
import useMap from "./hooks/useMap";

function MyComponent() {
  const { isLoaded } = useGoogleLoader();
  const { updateCenter } = useMap();
  const callAPI = async () => {
    try {
      const res = await axios.get("/api");
      const data: Pair[] = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, error } = useQuery([EQueryKeys.maps], () => callAPI(), {
    onSuccess: (data) => {
      data && updateCenter(data[0].a);
    },
    refetchOnWindowFocus: false,
  });

  if (!isLoaded || !data) return <Loader />;

  if (error) return `Error! ${error}`;

  return (
    <div className="flex max-h-screen">
      <ViewTable pairs={data} />
      <Map pairs={data} />
    </div>
  );
}

export default React.memo(MyComponent);
