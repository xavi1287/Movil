
import { StyleSheet } from "react-native";

export const globalColors = {
    primary: '#4285F4',
    secondary: '#28516F',
    background: '#28516F',
    dark: 'black',
    darkSmoke: '#828282',
    white: '#fff',
    citas: '#F5F4F4',
}

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 30,
        backgroundColor: globalColors.white,
    },
    containerAzul: {
        flex: 1,
        backgroundColor: globalColors.background,
    },
    titulosText: {
        fontSize: 34,
        fontWeight: 'bold',
        color: globalColors.dark,
    },
    primaryText: {
        color: globalColors.darkSmoke,
        fontSize: 16,
    },
    secondaryText: {
        color: globalColors.darkSmoke,
        fontSize: 14,
    },    
    
});