
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import { CanGoBackHeader } from '../../components/shared/CanGoBackHeader'
import { globalColors } from '../../theme/theme'
import { VersionApp } from '@env'
import { ScrollView } from 'react-native-gesture-handler'

export const AboutScreen = () => {

    return (
        <View style={{flex: 1, backgroundColor: globalColors.white}}>
            
            <CanGoBackHeader parm={true}/>

            <ScrollView style={{ flex: 1 }} >

                <View style={ styles.contenedorPrincipal } >

                    <View style={ styles.contenedorLogo }>
                        <Image
                            style={ styles.imgLogo }
                            source={ require('../../../assets/imgs/logoApp.png') } />
                    </View>

                    <View style={ styles.contenedorTexto }>

                        <Text style={ styles.aboutText }>Salud EC</Text>

                        <Text style={{ ...styles.aboutText, marginVertical: 20 }}>
                            Versión { VersionApp }
                        </Text>

                        <Text style={{ ...styles.aboutText, marginBottom: 5 }}>
                            Descripción de la aplicación:
                        </Text>

                        <Text style={{ ...styles.aboutText, fontStyle: 'italic' }}>
                            - Plataforma integral de Gestión Médica.
                        </Text>

                        <Text style={{ ...styles.aboutText, fontStyle: 'italic' }}>
                            - Agendamiento de citas fácil y rápido.
                        </Text>
                        
                        <Text style={{ ...styles.aboutText, fontStyle: 'italic' }}>
                            - Comunicación fluida con sus pacientes.
                        </Text>
                        
                        <Text style={{ ...styles.aboutText, fontStyle: 'italic' }}>
                            - Registro y gestión de pacientes eficiente
                        </Text>

                        <Text style={{ ...styles.aboutText, marginTop: 20, marginBottom: 5 }}>
                            Canales de agendamiento:
                        </Text>

                        <Text
                            style={{ ...styles.aboutText, fontWeight: 'bold' }}
                            onPress={ () => { Linking.openURL('https://wabot.citas.med.ec/wa'); }}
                        >
                            WhatsApp
                        </Text>

                        <Text
                            style={{ ...styles.aboutText, fontWeight: 'bold' }}
                            onPress={ () => { Linking.openURL('https://www.citas.med.ec/'); }}
                        >
                            Página web
                        </Text>

                        <Text
                            style={{ ...styles.aboutText, fontWeight: 'bold' }}
                            onPress={ () => { Linking.openURL('https://wabot.citas.med.ec/fb'); }}
                        >
                            Facebook Messenger
                        </Text>

                        <Text
                            style={{ ...styles.aboutText, marginVertical: 20 }}
                            onPress={ () => { Linking.openURL('https://wabot.citas.med.ec/ACMSP'); }}
                        >
                            Más información: https://wabot.citas.med.ec/ACMSP
                        </Text>

                        <Text style={ styles.aboutText }>
                            Copyright © Prichsouth Tecnologías del Sur, { new Date().getFullYear() }
                        </Text>

                    </View>

                </View>

            </ScrollView>


        </View>
    )

}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
    },
    contenedorLogo: {
        marginTop: 30,
        alignItems: 'center'
    },
    contenedorTexto: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
    },
    imgLogo: {
        height: 180,
        resizeMode: 'contain',
    },
    aboutText: {
        color: globalColors.dark,
        fontSize: 19,
    },  
});