import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const agendarStyles = StyleSheet.create({
    containerAgendar: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 20
    },
    titulosAgendar: {
        color: '#828282',
        width: '100%',
        textAlign: 'left',
        fontWeight: '700',
        marginBottom: 20
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
        fontSize: 16,
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