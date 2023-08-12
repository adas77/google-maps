const node = process.env.NODE_ENV;
const google_maps_key =
  node === "development" ? (undefined as any) : process.env.API_KEY;

if (node !== "development" && google_maps_key === undefined) {
  throw new Error("API_KEY required for google_maps");
}

export const env = {
  API_KEY: google_maps_key,
};
