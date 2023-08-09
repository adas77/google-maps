import { useJsApiLoader } from "@react-google-maps/api";

// const apiKey = process.env.API_KEY!;
// console.log(apiKey);
// if (!apiKey) {
//   throw new Error("Add Google Maps API key");
// }
export const useGoogleLoader = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
  });
  return { isLoaded };
};
