import { useJsApiLoader } from "@react-google-maps/api";
import { env } from "../utils/env";

export const useGoogleLoader = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.API_KEY,
  });
  return { isLoaded };
};
