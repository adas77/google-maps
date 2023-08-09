import { useQueryClient } from "@tanstack/react-query";
import { EQueryKeys } from "../utils/queryClient";
import Uploader from "./Uploader";

const PointTable = ({ lat, lng, timestamp }: Point) => {
  return (
    <div>
      <p>lat: {lat}</p>
      <p>lng: {lng}</p>
      <p>tms: {JSON.stringify(timestamp)}</p>
    </div>
  );
};

const PairTable = ({ a, b, id, visible }: Pair) => {
  const queryClient = useQueryClient();

  const onClickAction = () => {
    const data: Pair[] | undefined = queryClient.getQueryData([
      EQueryKeys.maps,
    ]);
    if (data) {
      const copy = [...data];
      const update = copy.map((p) => {
        if (p.id === id) {
          return { ...p, visible: !p.visible };
        }
        return p;
      });
      queryClient.setQueryData([EQueryKeys.maps], update);
    }
  };
  return (
    <div
      onClick={() => onClickAction()}
      className="cursor-pointer bg-slate-600 border-2"
    >
      <button>{visible ? "X" : "O"}</button>
      <div className="grid grid-cols-2">
        <PointTable {...a} />
        <PointTable {...b} />
        <p>visible:{JSON.stringify(visible)}</p>
      </div>
    </div>
  );
};
type Props = {
  pairs: Pair[];
};

const ViewTable = ({ pairs }: Props) => {
  return (
    <div>
      <Uploader />
      {pairs.map((pair) => (
        <PairTable key={JSON.stringify(pair.a.timestamp)} {...pair} />
      ))}
    </div>
  );
};

export default ViewTable;
