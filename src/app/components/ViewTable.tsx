import { useQueryClient } from "@tanstack/react-query";

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
    const data: Pair[] | undefined = queryClient.getQueryData(["maps"]);
    if (data) {
      console.log(data);
      const copy = [...data];
      console.log(copy);

      const update = copy.map((p) => {
        if (p.id === id) {
          return { ...p, visible: !p.visible };
        }
        return p;
      });
      queryClient.setQueryData(["maps"], update);
    }
  };
  return (
    <>
      <button onClick={() => onClickAction()}>{visible ? "X" : "O"}</button>
      <div className="grid grid-cols-2">
        <PointTable {...a} />
        <PointTable {...b} />
        <p>visible:{JSON.stringify(visible)}</p>
      </div>
    </>
  );
};
type Props = {
  pairs: Pair[];
};

const ViewTable = ({ pairs }: Props) => {
  return (
    <div>
      {pairs.map((pair) => (
        <PairTable key={JSON.stringify(pair.a.timestamp)} {...pair} />
      ))}
    </div>
  );
};

export default ViewTable;
