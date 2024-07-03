import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { globalColors, globalStyles } from "../../theme/theme"
import PrimaryButton from "../../components/PrimaryButton";
import { IMG_LOGO_GOBIERNO, IMG_LOGO_PRINCIPAL, OneSignalAppId } from "@env";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../core/Infraestructura/adapters/UseAuthStore";
import { StackScreenProps } from "@react-navigation/stack";
import { useUtils } from "../../hooks/useUtils";
import { ModalPopUp } from "../../components/ModalPopUp";
import { Layout } from "@ui-kitten/components";
import TypeInput from "../../components/TypeInput";
import { PasswordInput } from "../../components/PasswordInput";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { RootStackParams } from "../../routes/StackNavigator";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { useDataStore } from "../../../core/Infraestructura/adapters/UseDataStore";
import PersonaRepositorio from "../../../modules/GestionPersona/PersonaRepositorio";
import NucleosRepositorio from "../../../modules/GestionPersona/NucleosRepositorio";
import { UseStorage } from "../../../core/Infraestructura/adapters/UseStorage";
import CitasVigentesRepositorio from "../../../modules/Citas/CitasVigentesRepositorio";
import { UseLogStore } from "../../../core/Infraestructura/adapters/UseLogStore";
import { createLogRequest } from "../../../shared/shared";
import { EnumInteraccionEstado, EnumPasosFlujo } from "../../../shared/helpers";
import type { Input } from "../../../core/Dominio/Log/Request/LogRequest";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

    const citasVigentesRepositorio = new CitasVigentesRepositorio();
    const personaRepositorio = new PersonaRepositorio();

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const { loginState, logoutRegistro, logout } = useAuthStore();
    const { SesionState, getSesionState } = UseLogStore();
    const {
        abrirModal,
        cerrarModal,
        isModalVisible,
        isLoadingData,
        setIsLoadingData,
        mensajePopUp,
        setMensajePopUp
    } = useUtils();

    const handleLogin = async () => {
        let startTime, endTime;
        try {
            if (!form.username || !form.password) {
                setMensajePopUp('Usuario y contraseña requeridos');
                abrirModal();
                return;
            }
            await obtenerSesionId(form.username);
            await logout();
            await logoutRegistro();
            setIsLoadingData(true);
            startTime = Date.now();
        
            const response = await loginState(form.username, form.password);
            endTime = Date.now();
            console.log('loginState duration:', ((endTime - startTime) / 1000) + 's');

            if (!response) {
                setMensajePopUp('Usuario o contraseña incorrectos');
                abrirModal();
            }
            
            setIsLoadingData(false);
        } catch (error) {
            console.error('Error during login process', error);
            setMensajePopUp('Error durante el proceso de inicio de sesión');
            abrirModal();
        }
        finally {
            setIsLoadingData(false);
        }
    }
    const obtenerSesionId = async (cedula: string) => {
        if (await getSesionState() === 0) {

            SesionState(cedula);


        }
        
    }
    return (
        <LoadingOverlay isLoading={isLoadingData} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <Layout style={{ ...globalStyles.containerAzul }} >

                    <Layout style={{ ...styles.contenedorLogo }}>
                        <Image
                            style={styles.imgLogoPrincipal}
                            source={{ uri: IMG_LOGO_PRINCIPAL }}
                        // source={{ uri: 'https://i.postimg.cc/gkZD0hBh/ICONSPLASH001.png' }}
                        />
                    </Layout>

                    <Layout style={{ ...styles.contenedorPrincipal }} >

                        <Text style={globalStyles.titulosText}>Ingresa a tu cuenta</Text>

                        <Layout style={{ marginTop: 20, backgroundColor: 'white' }} >

                            <TypeInput
                                label="Cédula:"
                                placeholder="1234567890"
                                passwordText={false}
                                nameIcon="person-outline"
                                colorIcon="#828282"
                                tipo='numeric'
                                value={form.username}
                                onChangeText={(username) => setForm({ ...form, username })}
                            />

                            <PasswordInput
                                label="Contraseña:"
                                placeholder="*********"
                                value={form.password}
                                onChangeText={(password) => setForm({ ...form, password })}
                            />

                        </Layout>

                        <View style={{ flex: 1 }}>
                            <PrimaryButton label="Ingresar"
                                buttonColor={globalColors.primary}
                                appearance={'filled'}
                                whithPercentaje={'100%'}
                                height={55}
                                nameIcon="arrow-forward-outline"
                                textColor={'white'}
                                textSize={18}
                                onPress={handleLogin}
                            />

                            <PrimaryButton label="Registrar"
                                buttonColor={globalColors.white}
                                height={55}
                                appearance={'outline'}
                                whithPercentaje={'100%'}
                                nameIcon="book-outline"
                                textColor={'#4285F4'}
                                textSize={18}
                                borderColor={globalColors.primary}
                                onPress={() => navigation.navigate('RegistroScreen')}
                            />

                            <Text style={styles.text}
                                onPress={() => navigation.navigate('RecuperarContrasenaScreen')} >
                                Olvidó su contraseña
                            </Text>

                            <View style={styles.contenedorLogoGobierno}>
                                <Image
                                    style={styles.imgLogoGobierno}
                                    source={{ uri: IMG_LOGO_GOBIERNO }} />
                            </View>
                        </View>
                    </Layout>
                </Layout>

                <ModalPopUp
                    titulo='Error'
                    isModalVisible={isModalVisible}
                    descripcion={mensajePopUp}
                    onAcept={(() => {
                        cerrarModal();
                    })}
            
                />

            </ScrollView>
        </LoadingOverlay>

    )

}

const styles = StyleSheet.create({
    contenedorLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#28516F'
    },
    contenedorLogoGobierno: {
        marginVertical: 20,
        alignItems: 'center',
    },
    contenedorPrincipal: {
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        paddingHorizontal: 40,
        paddingTop: 40,
        backgroundColor: globalColors.white,
        // backgroundColor: 'red',
    },
    contenedorInputs: {
        marginTop: 15,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        // marginTop: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: globalColors.primary,
    },
    imgLogoPrincipal: {
        flex: 1,
        width: 300,
        resizeMode: 'contain',
    },
    imgLogoGobierno: {
        height: 60,
        width: 250,
        resizeMode: 'contain',
    },
});