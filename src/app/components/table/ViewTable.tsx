import Uploader from "../atoms/Uploader";
import PairTable from "./PairTable";

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
              <td>lat</td>
              <td>lng</td>
              <td>date</td>
              <td>lat</td>
              <td>lng</td>
              <td>date</td>
              <td>km</td>
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
