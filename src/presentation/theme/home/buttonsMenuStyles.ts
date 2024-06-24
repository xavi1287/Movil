import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const buttonsMenuStyles = StyleSheet.create({
    containerAction:{
        // width: '100%',
        flexDirection: 'column',
        backgroundColor: globalColors.white,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    titleButtons: {
        marginBottom: 20,         
        fontSize: 20,
        fontWeight: '400',
        color: '#828282'
    },
    containerSecondRow:{
        backgroundColor: globalColors.white,
        flexDirection:'row',
        alignContent: 'space-around',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    buttonAction: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        shadowColor: '#265170',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    primaryButtonCitas: {
        backgroundColor: globalColors.citas,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    }, 

    buttonTextMenu: {
        color: 'white',
        fontSize: 18,
    },
});