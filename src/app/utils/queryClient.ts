import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
export enum EQueryKeys {
  maps = "maps",
}

export default queryClient;
