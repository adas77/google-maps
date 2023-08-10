import { formatDate, formatLat } from "@/app/utils/format";
import { Marker as _Marker } from "@react-google-maps/api";
type Props = {
  point: Point;
  type: "start" | "end";
};

const Marker = ({ point: { lat, lng, timestamp }, type }: Props) => {
  return (
    <_Marker
      position={{ lat, lng }}
      title={`${formatLat(lat)}:${formatLat(lng)}\n${formatDate(timestamp)}`}
      icon={`map/${type as string}.svg`}
    />
  );
};

export default Marker;
