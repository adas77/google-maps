type Point = {
  lat: number;
  lng: number;
  timestamp: Date;
};

type Pair = {
  id: string;
  visible: boolean;
  a: Point;
  b: Point;
};
