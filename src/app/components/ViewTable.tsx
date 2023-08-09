import { useQueryClient } from "@tanstack/react-query";
import { formatDate, formatLat } from "../utils/format";
import { EQueryKeys } from "../utils/queryClient";
import Uploader from "./Uploader";

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
    <tbody>
      <tr onClick={() => onClickAction()} className="cursor-pointer">
        <th>
          <input
            type="checkbox"
            checked={visible}
            readOnly
            className="checkbox"
          />
        </th>
        <td>{formatLat(a.lat)}</td>
        <td>{formatLat(a.lng)}</td>
        <td>{formatDate(a.timestamp)}</td>
        <td>{formatLat(b.lat)}</td>
        <td>{formatLat(b.lng)}</td>
        <td>{formatDate(b.timestamp)}</td>
      </tr>
    </tbody>
  );
};
type Props = {
  pairs: Pair[];
};

const ViewTable = ({ pairs }: Props) => {
  return (
    <div className="grid">
      <Uploader />
      <div className="min-w-fit overflow-y-scroll">
        <table className="table table-xs table-pin-rows">
          <thead>
            <tr>
              <th>show</th>
              <td>a.lat</td>
              <td>a.lng</td>
              <td>a.date</td>
              <td>b.lat</td>
              <td>b.lng</td>
              <td>b.date</td>
            </tr>
          </thead>
          {pairs.map((pair) => (
            <PairTable key={pair.id} {...pair} />
          ))}
        </table>
      </div>
    </div>
  );
};

export default ViewTable;
