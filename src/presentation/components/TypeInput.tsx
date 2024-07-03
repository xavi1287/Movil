import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import { MyIcon } from './ui/MyIcon';
import { color } from 'react-native-elements/dist/helpers';

interface Props {
    heightContariner?: number,
    label: string;
    placeholder: string;
    passwordText?: boolean;
    nameIcon?: string;
    colorIcon?: string;
    colorInput?: string;
    esDeshabilitado?: boolean;
    tipo: 'default'| 'email-address'| 'numeric'| 'phone-pad'| 'decimal-pad'| 'url';
    value?: string;
    onChangeText?: (text: string) => void;
    showIcon?: boolean;
}

const TypeInput = (
    {
      heightContariner=125,
      label,
      placeholder,
      passwordText = false,
      nameIcon='',
      colorIcon,
      colorInput='#E9E9E9',
      esDeshabilitado = false,
      tipo,
      value, // Now accepting value prop
      onChangeText, // Now accepting onChangeText prop
      showIcon = true,
    }: Props
) => {
  const [localValue, setLocalValue] = useState(value);
  const [error, setError] = useState('');
  let message: string = "";

  const handleChange = (text: string) => {
    let regex;
    let errorMessage = '';

    switch (tipo) {
        case 'email-address':
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errorMessage = 'Correo electrónico inválido.';
            break;
        case 'numeric':
            regex = /^\d+$/;
            errorMessage = 'Solo se permiten números.';
            break;
        case 'phone-pad':
            regex = /^\+?\d{1,4}?[\d\s.-]{3,}$/;
            errorMessage = 'Número de teléfono inválido.';
            break;
        case 'decimal-pad':
            regex = /^\d+(\.\d{1,2})?$/;
            errorMessage = 'Solo se permiten números decimales.';
            break;
        case 'url':
            regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            errorMessage = 'URL inválida.';
            break;
        default:
            regex = /.*/;
            errorMessage = '';
            break;
    }

    if (!regex.test(text)) {
      setError(errorMessage);
    } else {
      setError('');
      onChangeText?.(text);
    }
    setLocalValue(text);
    
  };

  return (
    <View style={{...styles.container, height: heightContariner}}>
      <Text style={styles.label}>{label}</Text>
      <Input
        disabled={ esDeshabilitado }
        value={localValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        textStyle={styles.inputTextStyle}
        style={[styles.input, error ? styles.inputError : null, {backgroundColor: colorInput}]}
        accessoryRight={showIcon ? <MyIcon name={nameIcon} color={colorIcon} /> : undefined}
        keyboardType = {tipo}
        secureTextEntry={passwordText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 125,
    alignSelf: 'center',
    backgroundColor: 'white'
    // marginTop: 50,
  },
  input: {
    borderRadius: 15,
    // backgroundColor: '#E9E9E9'
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
      color: 'red',
      marginTop: 5,
  },
  label: {
    marginBottom: 10,
    // textAlign: 'center',
    color: '#828282',
    fontWeight: 'bold'
  },
  inputTextStyle: {
    minHeight: 53,
    color: '#828282'    
  },
});

export default TypeInput;
