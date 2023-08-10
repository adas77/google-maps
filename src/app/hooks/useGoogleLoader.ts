import { useJsApiLoader } from "@react-google-maps/api";

// FIXME add api key
// const apiKey = process.env.API_KEY;
// if (!apiKey) {
// throw new Error("Add Google Maps API key");
// }
export const useGoogleLoader = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: undefined as any,
  });
  return { isLoaded };
};
