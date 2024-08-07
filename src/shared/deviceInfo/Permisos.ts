import { Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS, PermissionStatus as RNPermissionStatus, openSettings } from 'react-native-permissions';

export type PermissionStatus =
  | 'granted'
  | 'denied'
  | 'blocked'
  | 'limited'
  | 'unavailable'
  | 'undetermined';

export class Permisos {

    /// <summary>
    /// Método que verifica si la aplicación tiene permisos para poder obtener la ip y la mac del dispositivo
    /// </summary>
    async checkAndRequestPermissions():Promise<boolean> {
        let permission;
        if (Platform.OS === 'android') {
            permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (permission !== RESULTS.GRANTED) {
                permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            }
        } else if (Platform.OS === 'ios') {
            permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (permission !== RESULTS.GRANTED) {
                permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            }
        }
        return permission === RESULTS.GRANTED;
    }

    /// <summary>
    /// Método que solicita los permisos de GEOLOCALICAZIÓN
    /// </summary>
    requestLocationPermission = async():Promise<PermissionStatus> => {

        let status: RNPermissionStatus = 'unavailable';
      
        if ( Platform.OS === 'ios' ) {
          status = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        } else if ( Platform.OS === 'android' ) {
          status = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        } else {
          throw new Error( 'Unsupported platform' );
        }
      
        if ( status === 'blocked' ) {
          await openSettings();
          return await this.checkLocationPermission();
        }
      
        const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
          granted: 'granted',
          denied: 'denied',
          blocked: 'blocked',
          unavailable: 'unavailable',
          limited: 'limited',
        };
      
        return permissionMapper[status] ?? 'unavailable';
      
      }

    /// <summary>
    /// Método que verifica si la aplicación tiene permisos de GEOLOCALICAZIÓN
    /// </summary>
    checkLocationPermission = async():Promise<PermissionStatus> => {

        let status: RNPermissionStatus = 'unavailable';
      
        if ( Platform.OS === 'ios' ) {
          status = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        } else if ( Platform.OS === 'android' ) {
          status = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        } else {
          throw new Error( 'Unsupported platform' );
        }      
      
        const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
          granted: 'granted',
          denied: 'denied',
          blocked: 'blocked',
          unavailable: 'unavailable',
          limited: 'limited',
        };
      
        return permissionMapper[status] ?? 'unavailable';      
      
    }

}