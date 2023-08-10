import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import React from "react";
import useMap from "../hooks/useMap";
import { formatDate, formatLat } from "../utils/format";

type Props = {
  pairs: Pair[];
};

const Map = ({ pairs }: Props) => {
  const { center } = useMap();
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {pairs
        .filter((p) => p.visible === true)
        .map(({ a, b }, i) => (
          <div key={i}>
            <Polyline
              path={[
                { lat: a.lat, lng: a.lng },
                { lat: b.lat, lng: b.lng },
              ]}
              options={{
                strokeColor: "#1a1a1a",
                strokeWeight: 2,
              }}
            />
            <Marker
              position={{ lat: a.lat, lng: a.lng }}
              title={`${formatLat(a.lat)}:${formatLat(a.lng)}\n${formatDate(
                a.timestamp
              )}`}
              icon={"map/start.svg"}
            />
            <Marker
              position={{ lat: b.lat, lng: b.lng }}
              title={`${formatLat(b.lat)}:${formatLat(b.lng)}\n${formatDate(
                b.timestamp
              )}`}
              icon={"map/end.svg"}
            />
          </div>
        ))}
    </GoogleMap>
  );
};

export default React.memo(Map);
