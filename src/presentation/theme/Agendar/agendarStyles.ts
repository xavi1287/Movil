import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const agendarStyles = StyleSheet.create({
    containerAgendar: {
        flex: 1,
        backgroundColor: globalColors.white,
    },
    containerScrollView: {
        flex: 1, 
        width: '100%',
        padding: 20
    },
    titulosAgendar: {
        color: '#828282',
        width: '100%',
        textAlign: 'left',
        fontWeight: '700',
        marginBottom: 20
    },
    mensajeDiscapacidad: {
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 15,
        padding: 15,
        backgroundColor: '#EDF4FF',
        color: '#828282',
        textAlign: 'justify',
    },
    negrita: {
        fontWeight: 'bold',
        color: '#828282',
    },
    containerButtonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 20
    },
    spaceScrollView: {
        height: 200, 
        backgroundColor: 'white'
    },
    containerSelect: {
        backgroundColor: globalColors.white,
        // minHeight: 128,
        width: '100%',
        marginBottom: 20 
    },
    select: {
        backgroundColor: globalColors.white
    },
    camposData:{
        backgroundColor: '#EDF4FF',
        height: 53,
        width: '100%',
        borderRadius: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 15
    },
    dataTexto:{
        fontSize: 13,
        color: globalColors.darkSmoke,
        paddingLeft: 20
    },
    camposDataCompuesto:{
        backgroundColor: '#EDF4FF',
        height: 70,
        width: '100%',
        borderRadius: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 15,
        flexDirection: 'row'
    },

})