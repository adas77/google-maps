import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type State = {
  center: Point;
  zoom: number;
};

type Action = {
  updateCenter: (center: State["center"]) => void;
  updateZoom: (zoom: State["zoom"]) => void;
};

const useMap = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        center: {
          lat: 0,
          lng: 0,
          timestamp: Date.now(),
        },
        zoom: 10,
        updateCenter: (center) => set(() => ({ center: center })),
        updateZoom: (zoom) => set(() => ({ zoom: zoom })),
      }),
      {
        name: "_STORAGE_MAP_STATE_eskVdMRsesMz3ZgAGywjMFjT58rJb4SSXUMJzJmZico=",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useMap;
