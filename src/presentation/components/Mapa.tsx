
import MapView, { Marker, MarkerDragStartEndEvent, PROVIDER_GOOGLE } from 'react-native-maps'
import PrimaryButton from './PrimaryButton';
import { globalColors } from '../theme/theme';
import { StyleSheet, View } from 'react-native';
import { useRef, useState } from 'react';
import { useLocationStore } from '../../core/Infraestructura/adapters/UseLocationStore';

export interface Location {
    latitude: number,
    longitude: number
}

interface Props {
    initialLocation: Location
}

export const Mapa = ({
    initialLocation
} : Props) => {

    const mapRef = useRef<MapView>();
    const cameraLocation = useRef<Location>( initialLocation );
    const [latLngMarker, setLatLngMarker] = useState<Location>(initialLocation);

    const { getLocation, actualUserLocation, saveFinalUserLocation } = useLocationStore();

    const moveCameraToLocation = (location: Location) => {
        if (!mapRef.current) return;
        mapRef.current.animateCamera({center: location});
    };

    const moveToCurrentLocation = async() => {

        if( !actualUserLocation) {
            moveCameraToLocation(initialLocation);
            setLatLngMarker(initialLocation);
        }

        const location = await getLocation();        

        if (!location) return;
        moveCameraToLocation(location);
        setLatLngMarker(location);
    }

    const cambiaUbicacionMarker = ( e: MarkerDragStartEndEvent ) => {
        const ubicacion = e.nativeEvent.coordinate;
        setLatLngMarker( ubicacion );
        saveFinalUserLocation( ubicacion );
    }

    return (
        <>
            <MapView
                ref={ map => (mapRef.current = map!) }
                provider={ PROVIDER_GOOGLE }
                style={{ flex: 1 }}
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    draggable
                    coordinate={ latLngMarker }
                    onDragEnd={ cambiaUbicacionMarker }
                />
            </MapView>

            <View style={ styles.contenedorBtn } >
                <PrimaryButton
                    label='Ir a ubicación actual'
                    buttonColor={ globalColors.primary }
                    textSize={ 16 }
                    appearance="outline"
                    showIcon={ false }
                    height={50}
                    textColor={ globalColors.white }
                    onPress={ moveToCurrentLocation }
                />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    contenedorBtn: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 10,
        marginRight: 10
    }
});