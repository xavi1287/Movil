import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const citasStyles = StyleSheet.create({
    containerCitas: {
        backgroundColor: globalColors.white,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    titleCitas: {
        // marginTop: -10,
        marginBottom: 20,         
        fontSize: 20,
        fontWeight: '400',
        color: '#828282'
    },
    containerCardCitas: {
        backgroundColor: '#F5F4F4',
        borderRadius: 15,
        height: 170,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginRight: 10
    },
    containerCitasLeft:{
        backgroundColor: '#F5F4F4',
        width: '70%',
        // height: '100%',
        paddingLeft: 15,
        paddingRight: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    textDetalleCita: {
        color:'#828282',
        fontSize: 13
    },
    shapeSpot:{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2C338B'
    },
    citasEstatus:{
        backgroundColor: '#F5F4F4',
        flexDirection: 'row', 
        alignItems: 'center',
        paddingTop: 5
    },
    containerCitasRight:{
        backgroundColor: '#F5F4F4',
        width: '30%',
        // height: '100%',
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHora: {
        backgroundColor: '#F5F4F4',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHoraLabel: {
        color:'#265170',        
        fontSize: 14,
        fontWeight: '700'
    },
    textHora: {
        color:'#265170',        
        fontSize: 16,
        fontWeight: '700'
    },

    // Styles CitasCardScrollVertical
    containerCitasVertical: {
        backgroundColor: globalColors.white,
        marginTop: 20
    },
    titleCitasVertical: {
        color: globalColors.darkSmoke,
        fontSize: 18,
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20
    },
    containerCardCitasVertical: {
        backgroundColor: '#F5F4F4',
        borderRadius: 15,
        width: '100%',
        height: 170,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginBottom: 20
    },
    containerCardCitasDefault: {
        backgroundColor: '#F5F4F4',
        borderRadius: 15,
        width: '100%',
        height: 170,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    containerInformacion:{
        borderRadius: 15,
        backgroundColor: '#F5F4F4',
        width: '100%',
        height: '60%',
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    informacionLeft:{
        backgroundColor: '#F5F4F4',
        width: '60%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    informacionRight:{
        backgroundColor: '#F5F4F4',
        width: '40%',
        height: '100%',
        // paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHoraVertical: {
        backgroundColor: '#F5F4F4',
        // marginBottom: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    containerButtons:{
        borderRadius: 15,
        backgroundColor: '#F5F4F4',
        width: '100%',
        height: '40%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});