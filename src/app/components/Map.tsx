import { GoogleMap, Polyline } from "@react-google-maps/api";
import React from "react";

type Props = {
  pairs: Pair[];
};

const Map = ({ pairs }: Props) => {
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const center: Point = {
    lat: pairs ? pairs[0].a.lat : 0,
    lng: pairs ? pairs[0].a.lng : 0,
    timestamp: pairs ? pairs[0].a.timestamp : new Date(Date.now()),
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {pairs
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
  );
};

export default React.memo(Map);
