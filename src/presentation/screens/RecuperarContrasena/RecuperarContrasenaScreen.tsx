
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { useUtils } from "../../hooks/useUtils";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { Layout } from "@ui-kitten/components";
import { globalColors, globalStyles } from "../../theme/theme";
import { IMG_LOGO_GOBIERNO, IMG_LOGO_PRINCIPAL } from "@env";
import TypeInput from "../../components/TypeInput";
import PrimaryButton from "../../components/PrimaryButton";
import { useState } from "react";
import { RootStackParams } from "../../routes/StackNavigator";
import { ModalPopUp } from "../../components/ModalPopUp";
import { verificaCedula } from "../../../shared/helpers";
import SeguridadRepositorio from "../../../modules/Auth/SeguridadRepositorio";

interface Props extends StackScreenProps<RootStackParams, 'RecuperarContrasenaScreen'> {}

export const RecuperarContrasenaScreen = ({ navigation }:Props) => {

    const [cedulaUsuario, setCedulaUsuario] = useState('');
    const [seEnvioMail, setSeEnvioMail] = useState<Boolean>(false);

    const {
        isLoadingData,
        setIsLoadingData,
        abrirModal,
        cerrarModal,
        isModalVisible,
        mensajePopUp,
        setMensajePopUp
    } = useUtils();

    const recuperaClaveUsuario = async() => {

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
        const seguridadRepositorio = new SeguridadRepositorio();

        const resp = await seguridadRepositorio.recuperaClaveUsuarioXCedula( cedulaUsuario );

        if ( !resp.isSuccessful || !resp.data || resp.data.Resultado !== 0 ) {
            setMensajePopUp ( (!resp.data || !resp.data.Mensaje ) ? 'No se pudo recuperar la contraseña': resp.data.Mensaje );
            setIsLoadingData(false);
            abrirModal();
            return;
        }

        setIsLoadingData(false);
        setSeEnvioMail(true);

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

                        <View style={{ marginTop: 10 }} >
                            <Text style={ globalStyles.titulosText }>
                                Recupera tu contraseña
                            </Text>
                        </View>

                        {
                            ( seEnvioMail )
                            ?
                                <View style={{ flex: 1, marginTop: 30 }} >
                                
                                    <View style={ styles.contenedorImagen } >
                                        <Image
                                            style={ styles.imgAvatar }
                                            source={ require('../../../assets/imgs/mail.png') }
                                        />
                                    </View>

                                    <Text style={{ ...globalStyles.primaryText, textAlign: 'center', paddingHorizontal: 20 }}>
                                        Hemos enviado un correo con tu nueva contraseña al correo registrado
                                    </Text>

                                    {/* <Text style={{ ...globalStyles.primaryText, ...styles.textoCorreoUsuario }} >
                                        xxxxxxde@gmail.com
                                    </Text> */}

                                </View>
                            :
                                <View style={{ marginTop: 30 }} >

                                    <TypeInput 
                                        label="Cédula:"
                                        placeholder="1234567890"
                                        passwordText={ false }
                                        nameIcon="person-outline"
                                        colorIcon="#828282"
                                        tipo= 'numeric'
                                        value={ cedulaUsuario }
                                        onChangeText={ setCedulaUsuario }
                                    />

                                    <PrimaryButton label="Recuperar contraseña"
                                        buttonColor={ globalColors.primary }
                                        appearance={'filled'}
                                        whithPercentaje={'100%'}
                                        height={ 55 }
                                        nameIcon="arrow-forward-outline"
                                        colorIcon="color-primary-100"
                                        textColor={'white'}
                                        textSize={ 18 }
                                        showIcon={ false }
                                        onPress={ () => recuperaClaveUsuario() }
                                    />

                                </View>
                        }

                        <View style={{ flex: 1 } }>

                            <PrimaryButton label={ seEnvioMail ? 'Ingresar' : 'Volver'}
                                buttonColor={ globalColors.white }
                                height={ 55 }
                                appearance={'outline'}
                                whithPercentaje={'100%'}
                                textColor={ globalColors.primary }
                                textSize={ 18 }
                                showIcon={ false }
                                borderColor={ globalColors.primary }
                                onPress={ () => navigation.goBack() }
                            />

                            <View style={ styles.contenedorLogoGobierno }>
                                <Image
                                    style={ styles.imgLogoGobierno }
                                    source={{ uri: IMG_LOGO_GOBIERNO }} />
                            </View>
                        </View>

                    </Layout>
                    
                </Layout>

                <ModalPopUp 
                    titulo='Error'
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
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColors.background
    },
    contenedorPrincipal: {
        flex: 1,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        paddingHorizontal: 50,
        paddingTop: 40,
        backgroundColor: globalColors.white,
    },
    contenedorImagen: {
        alignItems: 'center',
    },
    contenedorLogoGobierno: {
        marginTop: 30,
        alignItems: 'center'
    },
    imgAvatar: {
        height: 120,
        resizeMode: 'contain',
    },
    imgLogoGobierno: {
        height: 60,
        width: 250,
        resizeMode: 'contain',
    },
    textoCorreoUsuario: {
        marginTop: 5,
        textAlign: 'center',
        color: globalColors.primary,
    }
});