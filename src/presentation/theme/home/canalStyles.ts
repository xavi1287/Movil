import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const canalStyles = StyleSheet.create({
    titleMenuFirst: {
        marginBottom: 20,
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2A3481'
    },
    containerCanales: {
        // marginTop: 10,
        backgroundColor: globalColors.white,
        height: 255,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10     
    },
    cardCanales: {
        // backgroundColor: globalColors.primary,
        borderRadius: 15,
        padding: 10,
        // marginBottom: 10,
        width: '100%',
        height: 130,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});