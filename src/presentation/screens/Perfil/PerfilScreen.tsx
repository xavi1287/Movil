
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { globalColors, globalStyles } from "../../theme/theme"
import { PrimaryInput } from "../../components/PrimaryInput"
import PrimaryButton from "../../components/PrimaryButton"
import { InputConBotonEditar } from "../../components/InputConBotonEditar"
import { MainLayout } from "../../layouts/MainLayout"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const PerfilScreen = () => {

    const { top } = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1, 
                // paddingHorizontal: 20,
                marginTop: top
            }}
        >
            <ScrollView contentContainerStyle= {{flexGrow: 1}}>
                <View style={ globalStyles.container } >

                    <View style={ styles.contenedorAvatar } >
                        <Image
                            style={ styles.imgAvatar }
                            source={ require('../../../assets/imgs/avatar1.png') } />
                    </View>

                    <PrimaryInput
                        esDeshabilitado
                        label="Nombres"
                        placeholder="Edwin Gonzalo"
                    />

                    <PrimaryInput
                        esDeshabilitado
                        label="Apellidos"
                        placeholder="Yupangui Chiluisa"
                    />

                    <InputConBotonEditar
                        label="Dirección"
                        data="Av. 12 Calle 45"
                        onPressEditar={ () => {} }
                    />

                    <InputConBotonEditar
                        label="Celular"
                        data="0986666966"
                        mostrarAgregarMas
                        onPressEditar={ () => {} }
                        onPressagregarMas={ () => {} }
                    />

                    <InputConBotonEditar
                        label="Email"
                        data="email@email.com"
                        mostrarAgregarMas
                        onPressEditar={ () => {} }
                        onPressagregarMas={ () => {} }
                    />

                    <PrimaryButton
                        label="Actualizar datos"
                        buttonColor={ globalColors.primary }
                        appearance={ 'filled' }
                        height={ 55 }
                        whithPercentaje={ '100%' }
                        textColor={ 'white' }
                        showIcon={ false }
                        textSize={ 18 }
                        onPress={ () => {} }
                    />

                </View>
            </ScrollView>
        </View>
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