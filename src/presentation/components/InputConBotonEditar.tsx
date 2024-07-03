
import { StyleSheet, Text, View } from 'react-native'
import { globalColors, globalStyles } from '../theme/theme'
import PrimaryButton from './PrimaryButton';
import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    label: string;
    labelButton?: string;
    data: string;
    onPressEditar: (nuevoValor: string) => void;
    mostrarAgregarMas?: boolean;
    onPressagregarMas?: () => void;
    esEdicionDIreccion?: boolean;
    tipo: 'default'| 'email-address'| 'numeric'| 'phone-pad'| 'decimal-pad'| 'url';
}

export const InputConBotonEditar = ({
    label,
    labelButton = 'Editar',
    data,
    onPressEditar,
    esEdicionDIreccion=false,
    tipo,
    mostrarAgregarMas,
    onPressagregarMas = () => { }
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(data);
    const inputRef = useRef<any>(null);
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    const  hanlderPress  = () => {
        
        if (isEditing) {
            onPressEditar(inputValue);
        } 
        setIsEditing(!isEditing);
    };
    return (
        <>
            <View style={styles.contenedorDatos} >

                {isEditing ? (
                    <TextInput
                        ref={inputRef}
                        style={globalStyles.primaryText}
                        value={inputValue}
                        keyboardType = {tipo}
                        onChangeText={setInputValue}
                        autoCapitalize="none"
                        
                    />
                ) : (
                    <Text
                        numberOfLines={1}
                        style={{...globalStyles.primaryText, flex: 1, paddingRight: 10}}
                    >
                        {inputValue}
                    </Text>
                )}

                <View style={{ width: '26%', marginRight: 15 }}>

                    <PrimaryButton
                        label={isEditing ? 'Guardar' : labelButton}
                        height={45}
                        textSize={12}
                        appearance={'outline'}
                        whithPercentaje={'100%'}
                        showIcon={false}
                        marginButton={0}
                        textColor={globalColors.white}
                        buttonColor={globalColors.secondary}
                        onPress={esEdicionDIreccion ? () => onPressEditar(inputValue) : hanlderPress}
                    />

                </View>

            </View>
            <View style={styles.contendorLabel} >
                <Text style={
                    [
                        styles.tituloInput,
                        globalStyles.primaryText
                    ]
                }
                >
                    {label}
                </Text>

                {
                    (mostrarAgregarMas)
                        ?
                        <Text
                            onPress={onPressagregarMas}
                            style={styles.lableLink}
                        >
                            Agregar más
                        </Text>
                        :
                        <></>
                }
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    contenedorDatos: {
        flex: 0.1,
        flexDirection: 'row',
        borderRadius: 30,
        paddingLeft: 20,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EDF4FF',
    },
    tituloInput: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 15,
    },
    contendorLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    lableLink: {
        marginTop: 5,
        marginBottom: 15,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: globalColors.primary,
    }
});