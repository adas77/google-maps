export function formatLat(lat: number): string {
  const formated = lat.toFixed(2);
  return formated;
}

export function formatDate(date: Date): string {
  try {
    const formated = date.toUTCString();
    return formated;
  } catch (error) {
    return "-";
  }
}

export function strToDate(str: string): Date {
  // FIXME: date
  const arr = str.split(/-|\s|:/).map((s) => +s);
  const date = new Date(8.64e15);
  //   const date = new Date(arr[0], arr[1] - 1, arr[2]);
  return date;
}
