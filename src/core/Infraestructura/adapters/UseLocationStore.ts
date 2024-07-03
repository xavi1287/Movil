
import { create } from "zustand";
import { Location } from "../../../presentation/components/Mapa";
import { getCurrentLocation } from "../../../actions/location/location";

interface LocationState {
    actualUserLocation: Location|null;
    finalUserLocation: Location|null;

    getLocation(): Promise<Location|null>;
    saveFinalUserLocation( ubicacion: Location ): void;
}

export const useLocationStore = create<LocationState>()( (set, get) => ({
    actualUserLocation: null,
    finalUserLocation: null,

    getLocation: async() => {
        const location = await getCurrentLocation();
        set({ actualUserLocation: location });
        set({ finalUserLocation: location });
        return location;
    },
    saveFinalUserLocation: ( ubicacion: Location ) => {
        set({ finalUserLocation: ubicacion });
    }
}))