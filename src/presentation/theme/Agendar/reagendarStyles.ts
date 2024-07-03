import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const reagendarStyles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20
    },
    camposDataCompuesto:{
        backgroundColor: '#EDF4FF',
        height: 90,
        width: '100%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        flexDirection: 'row'
    },
    camposDataLeft:{
        width: '60%', 
        backgroundColor: '#EDF4FF', 
        borderRadius: 15, 
        // paddingTop: 15
    },
    camposDataRight:{
        width: '40%', 
        backgroundColor: '#EDF4FF', 
        borderRadius: 15, 
        paddingTop: 15, 
        paddingRight: 20, 
        alignItems:'flex-end',
        justifyContent: 'center'
    },
    label: {
        marginBottom: 10,
        // textAlign: 'center',
        color: '#828282',
        fontWeight: 'bold',
    },
    fechaContainer: {
        width: 89,
        height: 105,
        padding: 10,
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: '#F5F4F4',
        borderRadius: 15,
    },
    selected: {
        backgroundColor: '#0a558e', // Color de fondo para la opción seleccionada
        color: '#fff', // Color de texto para la opción seleccionada
    },
    unselected: {
        backgroundColor: '#f1f1f1', // Color de fondo para las opciones no seleccionadas
        color: '#000', // Color de texto para las opciones no seleccionadas
    },
    horaContainer: {
        width: 68,
        height: 35,
        // padding: 10,
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: '#F5F4F4',
        borderRadius: 10,
    }
})