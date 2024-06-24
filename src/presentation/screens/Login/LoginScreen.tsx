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

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const { height } = useWindowDimensions();
    const { loginState, logoutRegistro } = useAuthStore();

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

        if (!form.username || !form.password) {
            setMensajePopUp('Usuario y contraseña requeridos');
            abrirModal();
            return;
        }

        logoutRegistro();
        setIsLoadingData(true);

        const response = await loginState(form.username, form.password);
        if (!response) {
            setMensajePopUp('Usuario o contraseña incorrectos');
            abrirModal();
        }

        setIsLoadingData(false);
    }
    
    return (
        <LoadingOverlay isLoading={isLoadingData} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <Layout style={{ ...globalStyles.containerAzul }} >

                    <Layout style={{ ...styles.contenedorLogo, height: height * 0.25 }}>
                        <Image
                            style={styles.imgLogoPrincipal}
                            source={{ uri: IMG_LOGO_PRINCIPAL }}
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
                                textSize={20}
                                onPress={handleLogin}
                            />

                            <PrimaryButton label="Registrar"
                                buttonColor={globalColors.white}
                                height={55}
                                appearance={'outline'}
                                whithPercentaje={'100%'}
                                nameIcon="book-outline"
                                textColor={'#4285F4'}
                                textSize={20}
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
                        console.log('Se cerro el pop up');
                    })}
                // onConfirm={() => {
                //     cerrarModal();
                //     console.log('Se confirmo en el pop up');
                // }}
                // onCancel={ () => {
                //     cerrarModal();
                //     console.log('Se canceló en el pop up');
                // }}
                />

            </ScrollView>
        </LoadingOverlay>

    )

}

const styles = StyleSheet.create({
    contenedorLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#28516F'
    },
    contenedorLogoGobierno: {
        marginTop: 20,
        alignItems: 'center'
    },
    contenedorPrincipal: {
        flex: 1,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        paddingHorizontal: 50,
        paddingTop: 40,
        backgroundColor: globalColors.white,
    },
    contenedorInputs: {
        // flex: 0.7,
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