type Point = {
  lat: number;
  lng: number;
  timestamp: number;
};

type Pair = {
  id: string;
  visible: boolean;
  a: Point;
  b: Point;
};

type UploadState = "wrong" | "yes";

type RouteStats = {
  distanceInKm: number;
  timeInSeconds: number;
};

type RouteStatsFormated = {
  distance: string;
  time: string;
};
