import { Polyline as _Polyline } from "@react-google-maps/api";
type Props = {
  p1: Point;
  p2: Point;
};

const Polyline = ({ p1, p2 }: Props) => {
  return (
    <_Polyline
      path={[
        { lat: p1.lat, lng: p1.lng },
        { lat: p2.lat, lng: p2.lng },
      ]}
      options={{
        strokeColor: "#1a1a1a",
        strokeWeight: 2,
      }}
    />
  );
};

export default Polyline;
