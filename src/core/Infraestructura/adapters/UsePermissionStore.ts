
import { create } from 'zustand';
import { Permisos, PermissionStatus } from '../../../shared/deviceInfo/Permisos';

interface PermissionsState {
  locationStatus: PermissionStatus;
  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}
const permisos = new Permisos();

export const usePermissionStore = create<PermissionsState>()(  set => ({

  
  locationStatus: 'undetermined',

  requestLocationPermission: async () => {
    const status = await permisos.requestLocationPermission();
    set({ locationStatus: status });

    return status;
  },

  checkLocationPermission: async () => {
    const status = await permisos.checkLocationPermission();
    set({ locationStatus: status });
    return status;
  },

}))