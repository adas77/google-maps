import { GoogleMap } from "@react-google-maps/api";
import React from "react";
import useMap from "../../hooks/useMap";
import Marker from "./Marker";
import Polyline from "./Polyline";

type Props = {
  pairs: Pair[];
};

const Map = ({ pairs }: Props) => {
  const { center, zoom } = useMap();

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100vw",
        height: "100vh",
      }}
      center={center}
      zoom={zoom}
    >
      {pairs
        .filter((p) => p.visible === true)
        .map(({ a, b }, i) => (
          <div key={i}>
            <Polyline p1={a} p2={b} />
            <Marker point={a} type={"start"} />
            <Marker point={b} type={"end"} />
          </div>
        ))}
    </GoogleMap>
  );
};

export default React.memo(Map);
