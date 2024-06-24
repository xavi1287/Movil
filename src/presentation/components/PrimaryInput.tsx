
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper"
import { globalColors, globalStyles } from "../theme/theme";

interface Props {
    label: string;
    placeholder: string;
    passwordText?: boolean;
    esDeshabilitado?: boolean;
    value?: string;
    keyboardType?: KeyboardTypeOptions
    onChangeText?: (text: string) => void;
}

export const PrimaryInput = ({
    label,
    placeholder,
    passwordText = false,
    esDeshabilitado = false,
    value,
    keyboardType = 'default',
    onChangeText
}: Props) => {

    return (
        
        <>
            <TextInput
                mode="flat"
                keyboardType={ keyboardType }
                disabled={ esDeshabilitado }
                secureTextEntry={ passwordText }
                textColor={ globalColors.darkSmoke }
                placeholderTextColor={ globalColors.darkSmoke }
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={ style.input }
                theme={{ roundness: 18 }}
                placeholder={ placeholder }
                underlineStyle={{ height: 0 }}
                value={value}
                onChangeText={onChangeText}
            />
            <Text style={
                    [
                        style.tituloInput,
                        globalStyles.primaryText
                    ]
                }
            >
                { label }
            </Text>
        </>
        
    )

}

const style = StyleSheet.create({
    input: {
        borderRadius: 18,
        width: 'auto',
        backgroundColor: '#E9E9E9',
    },
    tituloInput: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 15,
    }
});