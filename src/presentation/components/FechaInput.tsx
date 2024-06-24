import { StyleSheet, Text, View } from "react-native"
import { globalColors } from "../theme/theme";

interface Props {
    anio?: string,
    mes?: string,
    dia?: string
}

export const FechaInput = ({
    dia = '01',
    mes = '09',
    anio = '1995'
}: Props ) => {
    return (
        <View style={ styles.contenedorAux } >

            <View style={ styles.box } >
                <View style={ styles.contenedorLabel } >
                    <Text style={ styles.label } >{ dia }</Text>
                </View>

                <Text style={ styles.label } >Día</Text>
            </View>

            <View style={ styles.box } >
                <View style={ styles.contenedorLabel } >
                    <Text style={ styles.label } >{ mes }</Text>
                </View>

                <Text style={ styles.label } >Mes</Text>
            </View>

            <View style={ styles.box } >
                <View style={ styles.contenedorLabel } >
                    <Text style={ styles.label } >{ anio }</Text>
                </View>

                <Text style={ styles.label } >Año</Text>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    contenedorAux: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    contenedorLabel: {
        flex: 1,
        borderRadius: 18,
        justifyContent: 'center',
        backgroundColor: '#E9E9E9'
    },
    label: {
        fontSize: 16,
        marginTop: 2,
        textAlign: 'center',
        color:  globalColors.darkSmoke
    },
    box: {
        width: '25%',
        justifyContent: 'center',
    },
});
