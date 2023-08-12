import useMap from "@/app/hooks/useMap";
import { formatDate, formatLat, formatRouteStats } from "@/app/utils/format";
import { EQueryKeys } from "@/app/utils/queryClient";
import { useQueryClient } from "@tanstack/react-query";

const PairTable = ({ a, b, id, visible }: Pair) => {
  const { updateCenter } = useMap();
  const queryClient = useQueryClient();

  const onClickChangePairVisibility = () => {
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

  const onClickUpdateMapCenter = ({ lat, lng }: Point) => {
    updateCenter({
      lat,
      lng,
      timestamp: Date.now(),
    });
  };

  return (
    <tbody
      className="hover:bg-slate-300 cursor-pointer"
      onClick={() => {
        onClickUpdateMapCenter(a);
      }}
    >
      <tr>
        <th>
          <input
            type="checkbox"
            checked={visible}
            onChange={() => {
              onClickChangePairVisibility();
            }}
            onClick={(e) => e.stopPropagation()}
            className="checkbox"
          />
        </th>
        <td className="text-green-600 ">{formatLat(a.lat)}</td>
        <td className="text-green-600 ">{formatLat(a.lng)}</td>
        <td>{formatDate(a.timestamp)}</td>
        <td className="text-red-700">{formatLat(b.lat)}</td>
        <td className="text-red-700">{formatLat(b.lng)}</td>
        <td>{formatDate(b.timestamp)}</td>
        <td>
          <b>{formatRouteStats(a, b).distance}</b>
        </td>
      </tr>
    </tbody>
  );
};

export default PairTable;
