
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { globalColors, globalStyles } from "../../theme/theme"
import { PrimaryInput } from "../../components/PrimaryInput"
import PrimaryButton from "../../components/PrimaryButton"
import { InputConBotonEditar } from "../../components/InputConBotonEditar"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CanGoBackHeader } from "../../components/shared/CanGoBackHeader"
import { useUtils } from "../../hooks/useUtils"
import { useLocationStore } from "../../../core/Infraestructura/adapters/UseLocationStore"
import { MapModalPopUp } from "../../components/MapModalPopUp"
import { useDataStore } from "../../../core/Infraestructura/adapters/UseDataStore"
import { useCallback, useEffect, useRef, useState } from "react"
import type { PersonaInfoActualizarDto } from "../../../core/Aplicacion/Dto/PersonaInfoActualizarDto"
import PersonaRepositorio from "../../../modules/GestionPersona/PersonaRepositorio"
import { LoadingOverlay } from "../../components/LoadingOverlay"
import { useFocusEffect, useNavigation, type NavigationProp } from "@react-navigation/native"
import { ModalPopUp } from "../../components/ModalPopUp"
import { validaEmail } from '../../../shared/helpers';
import { UseLogStore } from "../../../core/Infraestructura/adapters/UseLogStore"
import type { RootTabParams } from "../../routes/BottomTabsNavigator"
import { UseStorage } from "../../../core/Infraestructura/adapters/UseStorage"
import UbicacionRepositorio from "../../../modules/Ubicacion/UbicacionRepositorio"

export const PerfilScreen = () => {
    const personaRepositorio = new PersonaRepositorio();
    const ubicacionRepositorio = new UbicacionRepositorio();
    const navigation = useNavigation<NavigationProp<RootTabParams>>();
    const { top } = useSafeAreaInsets();
    const { actualUserLocation, finalUserLocation, getLocation } = useLocationStore();
    const { dataPersona, dataInfoPersona, saveDateInfoPersona, saveDataActualizada, saveDataPersona } = useDataStore();
    const { getSesionState } = UseLogStore();
    const [tipoModal, setTipoModal] = useState('');
    const [tipoTitle, setTipoTitle] = useState('');
    const [getSesionId, setSesionId] = useState(0);
    const [getDireccion, setDireccion] = useState(dataPersona?.direccion ?? '');
    const {
        abrirModal,
        cerrarModal,
        isModalVisible,
        isLoadingData,
        setIsLoadingData,
        setMensajePopUp,
        mensajePopUp
    } = useUtils();
    useEffect(() => {
        const fetchSesionId = async () => {
            try {
                const sesionId = await getSesionState();
                setSesionId(sesionId);

            } catch (error) {
                console.error("No se puede obtener el SesionId:", error);
            }
        };
        fetchSesionId();
    }, []);

    const [personaInfoActualizar, setPersonaInfoActualizar] = useState<PersonaInfoActualizarDto>({
        personaId: dataPersona?.personaId ?? 0,
        esActualizacionCorreo: false,
        esActualizacionDireccion: false,
        esActualizacionTelefono: false,
        personaTelefono: {
            personaTelefonoId: dataInfoPersona?.lstPersonaTelefono?.lstPersonaTelefono[0].personaTelefonoId,
            usuarioTelefonoId: 0,
            sesionId: 0,
            tipoTelefono: 'Movil',
            numero: dataInfoPersona?.lstPersonaTelefono?.lstPersonaTelefono[0].numero ?? ''
        },
        personaCorreo: {
            personaCorreoId: dataInfoPersona?.lstPersonaCorreo?.lstPersonaCorreo[0].personaCorreoId,
            sesionId: 0,
            correo: dataInfoPersona?.lstPersonaCorreo?.lstPersonaCorreo[0].correo ?? ''
        },
        personaDireccion: {
            personaDireccionId: dataInfoPersona?.lstPersonaDireccion?.lstPersonaDireccion[0].personadireccionid,
            sector: '-N/A-',
            ciudad: '-N/A-',
            calle: '-N/A-',
            interseccion: '-N/A-',
            sesionId: 0,
            latitud: dataInfoPersona?.lstPersonaDireccion?.lstPersonaDireccion[0].latitud ?? '0',
            longitud: dataInfoPersona?.lstPersonaDireccion?.lstPersonaDireccion[0].longitud ?? '0',
        }
    });

    const ObtenerInfoPersona = useCallback(async () => {
        if (dataPersona !== undefined) {
            const personaId = dataPersona?.personaId ?? 0;
            if (personaId !== undefined) {
                const response = await personaRepositorio.obtenerInformacionPersona(personaId, 0);
                if (response !== undefined) {
                    saveDateInfoPersona(response);
                }
            }
        }
    }, [dataPersona, saveDateInfoPersona]);

    const obtenerUbicacionActual = async () => {
        setTipoModal('direccion');
        await getLocation();
        abrirModal();
    }

    const actualizaDireccionUsuario = async() => {

        setTipoModal('direccion');
        if (finalUserLocation) {
            const ubicResp = await ubicacionRepositorio.obtenerGeolocalizacionInversa( finalUserLocation );
            const existeUbicacion: boolean = ubicResp.isSuccessful && ubicResp.data !== undefined;
            console.info("ubicResp", ubicResp.data);
            
            const nuevaDireccion = existeUbicacion ? `${ubicResp.data!.calle}, ${ubicResp.data!.interseccion}` : "N/A";
            setPersonaInfoActualizar((prevState) => ({
                ...prevState,
                
                esActualizacionDireccion: true,
                personaDireccion: {
                    ...prevState.personaDireccion,
                    ciudad: existeUbicacion ? ubicResp.data!.ciudad : "N/A",
                    sector: existeUbicacion ? ubicResp.data!.sector : "N/A",
                    calle:  existeUbicacion ? ubicResp.data!.calle : "N/A",
                    interseccion: existeUbicacion ? ubicResp.data!.interseccion : "N/A",
                    latitud: finalUserLocation.latitude.toString(),
                    longitud: finalUserLocation.longitude.toString(),
                },
            }));
            setDireccion(nuevaDireccion);
            cerrarModal();
        } else {
            console.error("finalUserLocation es null");
        }
    };
    const getAvatarUri = (sexo?: string): any => {
        switch (sexo) {
            case '1':

                return require('../../../assets/imgs/avatar1.png');
            case '2':

                return require('../../../assets/imgs/avatarMujer.png');
            default:
                return require('../../../assets/imgs/avatar1.png');
        }
    };
    const handlePressEditarTelefono = (nuevoValor: any) => {

        setPersonaInfoActualizar((prevState) => ({
            ...prevState,
            esActualizacionTelefono: true,
            personaTelefono: {
                ...prevState.personaTelefono,
                numero: nuevoValor.replace(/[^a-zA-Z0-9]/g, ''),
            },
        }));

    };
    const handlePressEditarCorreo = (nuevoValor: any) => {

        if (!validaEmail(nuevoValor)) {
            setTipoModal('actualizar');
            setTipoTitle('Alerta');
            setMensajePopUp('Correo no válido');
            abrirModal();
            return;
        }

        setPersonaInfoActualizar((prevState) => ({
            ...prevState,
            esActualizacionCorreo: true,
            personaCorreo: {
                ...prevState.personaCorreo,
                correo: nuevoValor,
            },
        }));

    };

    const ActualizarDatosPaciente = async () => {
        try {
            setTipoModal('actualizar');
            setTipoTitle('Información');
            setIsLoadingData(true);


            const response = await personaRepositorio.actualizarInforamcionPersona(personaInfoActualizar, getSesionId);

            if (response) {

                setMensajePopUp('Los datos se actualizaron de manera exitosa');
                abrirModal();
                await ObtenerInfoPersona();
                saveDataActualizada(true);
            }

            setIsLoadingData(false);
        }
        catch (error) {
            setTipoTitle('Alerta');
            setMensajePopUp('El sistema se esta actualizando en este momento, por favor intente mas tarde');
            abrirModal();
            setIsLoadingData(false);
        }

    }
    const manejoCerrarModal = async () => {
        cerrarModal();

        const cedula = await UseStorage.getItem('cedula') ?? '';

        const resp = await personaRepositorio.obtenerInformacionBascioPersona(cedula);

        if (!resp.isSuccessful) {
            return;
        }

        saveDataPersona(resp.data);
        navigation.navigate('PerfilHome')
    }
    useFocusEffect(
        useCallback(() => {
            ObtenerInfoPersona();
        }, [ObtenerInfoPersona])
    );
    return (
        <LoadingOverlay isLoading={isLoadingData} >
            <View
                style={{
                    flex: 1,
                    marginTop: top
                }}
            >
                <CanGoBackHeader />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={globalStyles.container} >

                        <View style={styles.contenedorAvatar} >
                            <Image
                                style={styles.imgAvatar}
                                source={getAvatarUri(dataPersona?.sexoId)} />
                        </View>

                        <PrimaryInput
                            esDeshabilitado
                            label="Nombres"
                            placeholder="Edwin Gonzalo"
                            value={dataPersona?.primerNombre + ' ' + dataPersona?.segundoNombre}
                        />

                        <PrimaryInput
                            esDeshabilitado
                            label="Apellidos"
                            placeholder="Yupangui Chiluisa"
                            value={dataPersona?.primerApellido + ' ' + dataPersona?.segundoApellido}
                        />

                        <InputConBotonEditar
                            label="Dirección"
                            esEdicionDIreccion={true}
                            data={getDireccion}
                            tipo="default"
                            onPressEditar={obtenerUbicacionActual}
                        />
                        <InputConBotonEditar

                            label="Celular"
                            labelButton="Editar"
                            data={dataPersona?.telefono ?? ''}
                            mostrarAgregarMas={false}
                            tipo='numeric'
                            onPressEditar={handlePressEditarTelefono}
                            onPressagregarMas={() => { }}
                        />
                        <InputConBotonEditar

                            label="Email"
                            data={dataPersona?.correo ?? ''}
                            mostrarAgregarMas={false}
                            onPressEditar={handlePressEditarCorreo}
                            tipo='email-address'
                            onPressagregarMas={() => { }}
                        />
                        <PrimaryButton
                            label="Actualizar datos"
                            buttonColor={globalColors.primary}
                            appearance={'filled'}
                            height={55}
                            whithPercentaje={'100%'}
                            textColor={'white'}
                            showIcon={false}
                            textSize={18}
                            onPress={ActualizarDatosPaciente}
                        />

                    </View>
                    {
                        tipoModal === 'direccion' &&
                        <MapModalPopUp
                            initialLocation={actualUserLocation!}
                            isModalVisible={isModalVisible}
                            onCancel={() => { cerrarModal(); }}
                            onConfirm={() => { actualizaDireccionUsuario(); }}
                        />
                    }
                    {
                        tipoModal === 'actualizar' &&
                        <ModalPopUp
                            titulo={tipoTitle}
                            isModalVisible={isModalVisible}
                            descripcion={mensajePopUp}
                            onAcept={manejoCerrarModal}
                        />
                    }

                </ScrollView>
            </View>
        </LoadingOverlay>
    )
}

const styles = StyleSheet.create({
    contenedorAvatar: {
        alignItems: 'center',
        marginVertical: 15
    },
    imgAvatar: {
        height: 150,
        width: 150
    }
});