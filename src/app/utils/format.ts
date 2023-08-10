export function formatLat(lat: number): string {
  const formated = lat.toFixed(2);
  return formated;
}

export function formatDate(date: number): string {
  try {
    const formated = new Date(date).toLocaleString();
    return formated;
  } catch (error) {
    return "-";
  }
}

export function strToDate(str: string): number {
  const arr = str.split(/-|\s|:/).map((s) => +s);
  const date = new Date(
    arr[0],
    arr[1] - 1,
    arr[2],
    arr[3],
    arr[4],
    arr[5]
  ).getTime();
  return date;
}
