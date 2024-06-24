import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const citasStyles = StyleSheet.create({
    containerCitas: {
        backgroundColor: globalColors.white,
        marginLeft: 20,
        marginBottom: 30,
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
        width: 360,
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
        color:'#828282'
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
        fontSize: 18,
        fontWeight: '700'
    }
    
});