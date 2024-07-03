
import { StyleSheet, View, Text, ScrollView, Pressable, TouchableOpacity } from "react-native"
import { globalColors, globalStyles } from '../../theme/theme';
import PrimaryButton from "../../components/PrimaryButton"
import { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";
import { FechaInput } from "../../components/FechaInput";
import TypeInput from "../../components/TypeInput";
import { PasswordInput } from "../../components/PasswordInput";
import { Icon, Layout } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { useAuthStore } from "../../../core/Infraestructura/adapters/UseAuthStore";
import { ModalPopUp } from "../../components/ModalPopUp";
import { useUtils } from "../../hooks/useUtils";
import { useLocationStore } from "../../../core/Infraestructura/adapters/UseLocationStore";
import { FechaDatePicker, RegistroForm } from "./RegistroInterfaces";
import { devuelveSoloFecha, validaDatosRegistroUsuario } from "../../../shared/helpers";
import { RegistroRequest } from "../../../core/Dominio/GestionPersona/Request/RegistroRequest";
import PersonaRepositorio from "../../../modules/GestionPersona/PersonaRepositorio";
import { RootStackParams } from "../../routes/StackNavigator";
import SeguridadRepositorio from "../../../modules/Auth/SeguridadRepositorio";
import UbicacionRepositorio from "../../../modules/Ubicacion/UbicacionRepositorio";

interface Props extends StackScreenProps<RootStackParams, 'RegistroDatosScreen'> {}

export const RegistroDatosScreen = ({ navigation }:Props) => {

    const { finalUserLocation } = useLocationStore();
    const [registroOk, setRegistroOk] = useState<Boolean>(false);
    const [openModalFecha, setOpenModalFecha] = useState(false);
    const [fecha, setFecha] = useState<FechaDatePicker>({
        dia: '01',
        mes: '09',
        anio: '1995'
    });    

    const [form, setForm] = useState<RegistroForm>({
        fechaNacimiento: '',
        email: '',
        celular: '',
        contrasenia: '',
        confirmaContrasenia: '',
        aceptaPoliticas: false
    })

    const { infoPersonaRegistro, logoutRegistro } = useAuthStore();
    
    const {
        abrirModal,
        cerrarModal,
        isModalVisible,
        isLoadingData,
        setIsLoadingData,
        mensajePopUp,
        setMensajePopUp
    } = useUtils();

    const agregarFecha = ( fechaPick: Date ) => {

        const fechaIngresada: string = devuelveSoloFecha( fechaPick );
        const fechaNacimiento: string = devuelveSoloFecha( new Date(infoPersonaRegistro!.fechaNacimiento) );

        if ( fechaIngresada !== fechaNacimiento ) {            
            setMensajePopUp('La fecha de nacimiento no coincide con el Registro Civil. Por favor, ingrese la fecha correcta de su nacimiento.');
            abrirModal();
            setOpenModalFecha(false);
            return;
        }

        const fechaSplit = fechaIngresada.split('-');

        setFecha({
            dia: fechaSplit[2],
            mes: fechaSplit[1],
            anio: fechaSplit[0]
        });
        
        setForm({ ...form, fechaNacimiento });
        setOpenModalFecha(false);
        
    }

    const registrarUsuario = async() => {

        const respValidacion = validaDatosRegistroUsuario( form );

        if ( !respValidacion.esValido ) {
            setMensajePopUp( respValidacion.mensaje );
            abrirModal();
            return;
        }

        setIsLoadingData( true );

        const ubicacionRepositorio = new UbicacionRepositorio();
        const ubicResp = await ubicacionRepositorio.obtenerGeolocalizacionInversa( finalUserLocation! );

        const existeUbicacion: boolean = ubicResp.isSuccessful && ubicResp.data !== undefined;

        const persona = {
            identificacion: infoPersonaRegistro!.identificacion,
            primerNombre: infoPersonaRegistro!.primerNombre,
            segundoNombre: infoPersonaRegistro!.segundoNombre,
            primerApellido: infoPersonaRegistro!.primerApellido,
            segundoApellido: infoPersonaRegistro!.segundoApellido,
            fechaNacimiento: form.fechaNacimiento,
            contraseña: form.contrasenia,
            sexo: infoPersonaRegistro!.sexo,
            estadoCivil: infoPersonaRegistro!.estadoCivil,
            nacionalidad: infoPersonaRegistro!.nacionalidad,
            esVerificado: true,
            celular: form.celular,
            sesionId: 0,
            correo: form.email,
            ciudad: existeUbicacion ? ubicResp.data!.ciudad : "N/A",
            sector: existeUbicacion ? ubicResp.data!.sector : "N/A",
            calle:  existeUbicacion ? ubicResp.data!.calle : "N/A",
            interseccion: existeUbicacion ? ubicResp.data!.interseccion : "N/A",
            latitud: finalUserLocation!.latitude.toString(),
            longitud: finalUserLocation!.longitude.toString(),
            aceptaCondEnvio: form.aceptaPoliticas
        } as RegistroRequest;

        const personaRepositorio = new PersonaRepositorio();
        const resp = await personaRepositorio.registroPersona( persona );

        if ( !resp.isSuccessful || !resp.data || resp.data.personaId <= 0 ) {
            setMensajePopUp('No se pudo registrar al usuario');
            setIsLoadingData( false );
            abrirModal();
            return;
        }

        const seguridadRepositorio = new SeguridadRepositorio();
        await seguridadRepositorio.enviaNotificacionUsuarioXCedula( infoPersonaRegistro!.identificacion );

        setMensajePopUp('A partir de este momento ya puedes acceder al agendamiento de citas médicas del Ministerio de Salud Pública del Ecuador');
        setRegistroOk( true );
        await logoutRegistro();
        setIsLoadingData( false );
        abrirModal();

    }

    return (
        <LoadingOverlay isLoading={ isLoadingData } >
            <ScrollView contentContainerStyle= {{flexGrow: 1}}>
                <Layout style={ globalStyles.container } >

                    <PrimaryButton
                        label="Volver"
                        appearance={ 'outline' }
                        marginButton={ 0 }
                        height={ 55 }
                        whithPercentaje={ '40%' }
                        showIcon={ false }
                        textSize={ 18 }
                        buttonColor={ globalColors.white }
                        textColor={ globalColors.primary }
                        borderColor={ globalColors.primary }
                        onPress={ () => navigation.goBack() }
                    />
                    
                    <Text
                        style={[
                            { paddingHorizontal: 20, marginTop: 20 },
                            globalStyles.primaryText
                        ]} >
                        Ingresar fecha de nacimiento para validación
                    </Text>

                    <Pressable
                        onPress={ () => setOpenModalFecha(true) }
                        style={ styles.contenedorFecha } >

                        <FechaInput
                            dia={ fecha.dia }
                            mes={ fecha.mes }
                            anio={ fecha.anio }
                        />

                        <DatePicker
                            modal
                            mode="date"
                            locale="es"
                            open={ openModalFecha }
                            title="Seleccione la fecha"
                            date={ new Date() }
                            onConfirm={ agregarFecha }
                            onCancel={ () => setOpenModalFecha(false) }
                        />

                    </Pressable>

                    <TypeInput 
                        label="Email"
                        placeholder="paciente@gmail.com"
                        passwordText={ false }
                        showIcon={ false }
                        tipo= 'email-address'
                        value={ form.email }
                        onChangeText={ (email) => setForm({ ...form, email })}
                    />

                    <TypeInput 
                        label="Celular"
                        placeholder="0986699987"
                        passwordText={ false }
                        showIcon={ false }
                        tipo= 'numeric'
                        value={ form.celular }
                        onChangeText={ (celular) => setForm({ ...form, celular })}
                    />

                    <PasswordInput
                        label="Contraseña:"
                        placeholder="*********"
                        value={ form.contrasenia }
                        mostrarTextoInfo
                        textoInfo="La contraseña debe contener al menos 6 caractes, una letra mayúscula y un número"
                        onChangeText={ (contrasenia) => setForm({ ...form, contrasenia })}
                    />

                    <View style={{ marginTop: 10 }} />

                    <PasswordInput
                        label="Confirmar Contraseña"
                        placeholder="*********"
                        value={ form.confirmaContrasenia }
                        onChangeText={ (confirmaContrasenia) => setForm({ ...form, confirmaContrasenia })}
                    />

                    {/* <Text style={ globalStyles.secondaryText }>{JSON.stringify(form,null,2)}</Text> */}

                    <View style={ styles.contenedorPoliticas } >

                        <TouchableOpacity
                            style={ styles.check }
                            onPress={ () => {
                                const aceptaPoliticas = !form.aceptaPoliticas;
                                setForm({ ...form, aceptaPoliticas })
                            }}
                        >
                            {
                                ( form.aceptaPoliticas )
                                ?
                                    <Icon name="checkmark-outline" fill="white" style={{ with: 20, height: 20 }} />
                                :
                                    <></>
                            }
                        </TouchableOpacity>

                        <Text style={ globalStyles.secondaryText }>
                            He leido y acepto las &nbsp;
                            <Text style={
                                    [
                                        globalStyles.secondaryText, 
                                        styles.textPoliticas,
                                    ]
                                }
                                onPress={ () => {} }
                            >
                                condiciones de uso
                            </Text>
                            &nbsp; y autorizo a aque el Ministerio de Salud Pública del
                            Ecuador y a otras instituciones del Estado me contacten por medio de WhatsApp
                        </Text>

                    </View>

                    <PrimaryButton
                        label="Registratrse"
                        appearance={ 'filled' }
                        height={ 55 }
                        whithPercentaje={ '100%' }
                        textColor={ 'white' }
                        showIcon={ false }
                        textSize={ 18 }
                        buttonColor={ globalColors.primary }
                        onPress={ () => registrarUsuario() }
                    />

                </Layout>

                <ModalPopUp 
                    titulo='Alerta'
                    isModalVisible={ isModalVisible }
                    descripcion={ mensajePopUp }
                    onAcept={ () => {
                        if ( !registroOk ) {
                            cerrarModal();
                        } else {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'LoginScreen' }],
                            })
                        }
                    }}
                />
                
            </ScrollView>
        </LoadingOverlay>
    )
}

const styles = StyleSheet.create({
    contenedorFecha: {
        height: 90,
        marginVertical: 10,
        justifyContent: 'center'
    },
    contenedorLabel: {
        flex: 1,
        borderRadius: 18,
        justifyContent: 'center',
        backgroundColor: '#E9E9E9'
    },
    contenedorPoliticas: {
        marginVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
        
    },
    textPoliticas: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: globalColors.primary,
    },
    check: {
        height: 25,
        width: 25,
        borderRadius: 25,
        marginRight: 20,
        backgroundColor: globalColors.primary,
        justifyContent: 'center'
    }
});
