export function calculateRouteStats(
  { lat: lat1, lng: lng1, timestamp: timestamp1 }: Point,
  { lat: lat2, lng: lng2, timestamp: timestamp2 }: Point
): RouteStats {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  const distanceInKm = d / 1e3;

  const timeInSeconds = timestamp2 - timestamp1;

  return {
    distanceInKm,
    timeInSeconds,
  };
}
