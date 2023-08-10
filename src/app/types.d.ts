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
