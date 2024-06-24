import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { Icon, IconElement, Input, Text } from '@ui-kitten/components';

const AlertIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='alert-circle-outline'
  />
);

interface Props {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    mostrarTextoInfo?: boolean;
    textoInfo?: string;
}

export const PasswordInput = (
    {
      label,
      placeholder,
      value, // Now receiving value from parent component
      onChangeText, // Now receiving onChangeText from parent component
      mostrarTextoInfo = false,
      textoInfo = ''
    }: Props
): React.ReactElement => {

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        {...props}
        name={secureTextEntry ? 'eye-off' : 'eye'}
      />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (): React.ReactElement => {
    return (
      mostrarTextoInfo
      ?
        <View style={styles.captionContainer}>
          {AlertIcon(styles.captionIcon)}
          <Text style={styles.captionText}>
              { textoInfo }
          </Text>
        </View>
      :
        <></>
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Input
        value={value || ''}
        placeholder={placeholder}
        style={styles.input}
        textStyle={styles.inputTextStyle}
        caption={renderCaption}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        />
    </View>    
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 130,
        alignSelf: 'center',
        backgroundColor: 'white'
        // marginTop: 50,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginBottom: 10,
        // textAlign: 'center',
        color: '#828282'
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'opensans-regular',
        color: '#828282',
    },
    input: {
        borderRadius: 15,
        backgroundColor: '#E9E9E9'
    },
    inputTextStyle: {
        minHeight: 53,
        color: '#828282'
    },
});