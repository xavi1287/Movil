
import { StyleSheet, Text, View } from 'react-native'
import { globalColors, globalStyles } from '../theme/theme'
import PrimaryButton from './PrimaryButton';

interface Props {
    label: string;
    data: string;
    onPressEditar: () => void;
    mostrarAgregarMas?: boolean;
    onPressagregarMas?: () => void;
}

export const InputConBotonEditar = ({
    label,
    data,
    onPressEditar,
    mostrarAgregarMas = false,
    onPressagregarMas = () => {}
}: Props) => {
    return (
        <>
            <View style={ styles.contenedorDatos } >

                <Text style={ globalStyles.primaryText }>
                    { data }
                </Text>

                <View style={{ width: '26%', marginRight: 15 }}>

                    <PrimaryButton
                        label="Editar"
                        height={ 45 }
                        textSize={ 16 }
                        appearance={'outline'}
                        whithPercentaje={'100%'}
                        showIcon={false}
                        marginButton={ 0 }
                        textColor={ globalColors.white }
                        buttonColor={ globalColors.secondary }
                        onPress={ onPressEditar }
                    />

                </View>

            </View>
            <View style={ styles.contendorLabel } >
                <Text style={
                        [
                            styles.tituloInput,
                            globalStyles.primaryText
                        ]
                    }
                >
                    { label }
                </Text>

                {
                    ( mostrarAgregarMas )
                    ?
                        <Text
                            onPress={ onPressagregarMas }
                            style={ styles.lableLink } 
                        >
                            Agregar más
                        </Text>
                    :
                        <></>
                }
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    contenedorDatos: {
        flex: 0.1,
        flexDirection: 'row',
        borderRadius: 30,
        paddingLeft: 20,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF4FF',
    },
    tituloInput: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    contendorLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lableLink: {
        marginTop: 5,
        marginBottom: 15,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: globalColors.primary,
    }
});