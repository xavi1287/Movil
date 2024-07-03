
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { globalColors, globalStyles } from "../../theme/theme";
import PrimaryButton from "../../components/PrimaryButton";
import { PrimaryInput } from "../../components/PrimaryInput";
import { IMG_LOGO_PRINCIPAL } from "@env";
import { Mapa } from "../../components/Mapa";
import { useEffect, useState } from "react";
import { useLocationStore } from "../../../core/Infraestructura/adapters/UseLocationStore";
import PersonaRepositorio from "../../../modules/GestionPersona/PersonaRepositorio";
import { Layout } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import { LoadingScreen } from "../loading/LoadingScreen";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useUtils } from "../../hooks/useUtils";
import { useAuthStore } from "../../../core/Infraestructura/adapters/UseAuthStore";
import { ModalPopUp } from "../../components/ModalPopUp";
import { UseStorage } from "../../../core/Infraestructura/adapters/UseStorage";
import { verificaCedula } from "../../../shared/helpers";
import { RootStackParams } from "../../routes/StackNavigator";
import { usePermissionStore } from "../../../core/Infraestructura/adapters/UsePermissionStore";
import { isTokenValid } from "../../../shared/deviceInfo/ValidacionToken";
import { UseLogStore } from "../../../core/Infraestructura/adapters/UseLogStore";

interface Props extends StackScreenProps<RootStackParams, 'RegistroScreen'> {}

export const RegistroScreen = ({ navigation }:Props) => {

    const [cedulaUsuario, setCedulaUsuario] = useState('');
    const { actualUserLocation, getLocation } = useLocationStore();
    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const { loginRegistroState, guardarInfoPersonaRegistro, infoPersonaRegistro, logoutRegistro, logout } = useAuthStore();
    const {SesionState}=UseLogStore();
    const {
        abrirModal,
        cerrarModal,
        isModalVisible,
        isLoadingData,
        setIsLoadingData,
        mensajePopUp,
        setMensajePopUp
    } = useUtils();

    useEffect(() => {
        verificaPermisosGeolocalizacion();
        guardarInfoPersonaRegistro();
        if ( actualUserLocation === null ) {
            getLocation();
        }
    }, [])

    const verificaPermisosGeolocalizacion = async () => {
        await checkLocationPermission();
        if ( locationStatus !== 'granted' ) {
            return( <LoadingScreen /> )
        }
    }

    const verificaTokenRegistro = async () => {
        const token = await UseStorage.getItem('tokenRegistro');
        if (token && isTokenValid(token)) return;
        await logout();
        await logoutRegistro();
        await loginRegistroState();
    }

    const obtenerUsuario = async () => {
        
        if ( cedulaUsuario === '' ) {
            setMensajePopUp('La cédula es requerida');
            abrirModal();
            return;
        };

        if ( !verificaCedula( cedulaUsuario ) ) {
            setMensajePopUp('Cedula incorrecta');
            abrirModal();
            return;
        }

        setIsLoadingData(true);
        await verificaTokenRegistro();
        const personaRepositorio = new PersonaRepositorio();
        const resp = await personaRepositorio.obtenerPersonaXCedula(cedulaUsuario);
        
        if ( !resp.isSuccessful || !resp.data ) {
            setMensajePopUp ( resp.message );
            setIsLoadingData(false);
            abrirModal();
            return;
        }

        if ( !resp.data.puedeRegistrarse ) {
            setMensajePopUp ('La persona ya se encuentra registrada, intente iniciar sesión');
            setIsLoadingData(false);
            abrirModal();
            return;
        }

        guardarInfoPersonaRegistro( resp.data );
        SesionState(cedulaUsuario);
        setIsLoadingData(false);

    }

    if( actualUserLocation === null ) {
        return( <LoadingScreen /> )
    }

    return (
        <LoadingOverlay isLoading={ isLoadingData } >
            <ScrollView contentContainerStyle= {{flexGrow: 1}}>
                <Layout style={{ ...globalStyles.containerAzul }} >

                    <Layout style={{ ...styles.contenedorLogo }}>
                        <Image
                            style={{ resizeMode: 'contain', width: 300, height: 150 }}
                            source={{ uri: IMG_LOGO_PRINCIPAL }} />
                    </Layout>
                    
                    <Layout style={{ ...styles.contenedorPrincipal }} >

                        <Text style={ globalStyles.titulosText }>
                            Regístrate
                        </Text>

                        <View style={ styles.contenedorBusqueda } >

                            <View style={{ width: '55%' }}>
                                <PrimaryInput
                                    label="Cédula"
                                    placeholder="123456780"
                                    keyboardType="numeric"
                                    value={ cedulaUsuario }
                                    onChangeText={ setCedulaUsuario }
                                />
                            </View>

                            <View style={{ width: '40%'}}>
                                <PrimaryButton
                                    whithPercentaje='100%'
                                    marginButton={ 0 }
                                    height={ 55 }
                                    label="Buscar"
                                    textSize={ 18 }
                                    appearance="filled"
                                    showIcon={ false }
                                    textColor={ globalColors.white }
                                    buttonColor={ globalColors.secondary }
                                    onPress={ () => {
                                        obtenerUsuario();
                                    } }
                                />
                            </View>

                        </View>

                        <Layout style={ styles.contenedorNombre } >
                            <Text style={ globalStyles.primaryText }>
                                { infoPersonaRegistro === undefined ? 'Nombre del usuario' : infoPersonaRegistro.nombreCompleto }
                            </Text>
                        </Layout>

                        <Text
                            style={[
                                {paddingHorizontal: 20 },
                                globalStyles.primaryText
                            ]} >
                            Para ubicar tu dirección, selecciona un punto en el mapa
                        </Text>

                        <Layout style={ styles.contenedorMapa } >
                            <Mapa initialLocation={ actualUserLocation } />
                        </Layout>

                        <PrimaryButton label="Continuar"
                            buttonColor={ globalColors.primary }
                            appearance={ 'filled' }
                            height={ 55 }
                            whithPercentaje={ '100%' }
                            textColor={ 'white' }
                            showIcon={ false }
                            textSize={ 18 }
                            isDisabled={ infoPersonaRegistro === undefined }
                            onPress={ () => navigation.navigate( 'RegistroDatosScreen' ) }
                        />

                    </Layout>

                </Layout>

                <ModalPopUp 
                    titulo='Alerta'
                    isModalVisible={ isModalVisible }
                    descripcion={ mensajePopUp }
                    onAcept={ (() => {
                        cerrarModal();
                    })}
                />
                
            </ScrollView>
        </LoadingOverlay>
    )

}

const styles = StyleSheet.create({
    contenedorLogo: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColors.background
    },
    contenedorPrincipal: {
        flex: 2,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        paddingHorizontal: 40,
        paddingTop: 40,
        backgroundColor: globalColors.white,
    },
    contenedorBusqueda: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    contenedorNombre: {
        flex: 0.15,
        borderRadius: 30,
        paddingLeft: 20,
        marginBottom: 10,
        justifyContent: 'center',
        backgroundColor: '#EDF4FF',
    },
    contenedorMapa: {
        flex: 0.8,
        marginVertical: 10,
    }
});