import { Button, Text } from '@ui-kitten/components';
import { DimensionValue } from 'react-native';
import { MyIcon } from './ui/MyIcon';

interface Props {
    label: string;
    appearance: string;
    whithPercentaje?: DimensionValue;
    nameIcon?: string;
    colorIcon?: string;
    widthIcon?: number;
    heightIcon?: number;
    buttonColor: string;
    borderColor?: string;
    textColor: string;
    textSize: number;
    widthTexto?: boolean;
    height?: number;
    marginButton?: number;
    onPress: () => void;
    showIcon?: boolean;
    isDisabled?: boolean;
    iconPosition?: 'left' | 'right';
    applyShadow?: boolean;
}

const PrimaryButton = ({
    label,
    appearance,
    buttonColor,
    whithPercentaje,
    nameIcon = '',
    textColor,
    colorIcon = textColor,
    widthIcon,
    heightIcon,
    borderColor = buttonColor,
    textSize,
    widthTexto = true,
    height = 63,
    marginButton = 15,
    onPress,
    showIcon = true,
    isDisabled = false,
    iconPosition = 'right',
    applyShadow = false
}: Props) => {

    const icon = showIcon ? <MyIcon name={nameIcon} color={colorIcon} width={widthIcon} height={heightIcon} /> : undefined;

    const shadowStyle = applyShadow ? {
        shadowColor: '#265170',
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 4,
    } : {};

    return (
        <Button
            disabled={isDisabled}
            style={[
                { marginBottom: marginButton }, 
                { 
                    backgroundColor: buttonColor, 
                    width: whithPercentaje,
                    height: height,
                    borderColor: borderColor,
                    borderRadius: 15,
                },
                shadowStyle
            ]}
            status='primary'
            appearance={appearance}
            accessoryLeft={iconPosition === 'left' ? icon : undefined}
            accessoryRight={iconPosition === 'right' ? icon : undefined}
            onPress={() => onPress()}
        >
            {props => (
                <Text
                    {...props} style={{ 
                        color: textColor, 
                        fontSize: textSize,
                        paddingRight: showIcon && iconPosition === 'right' ? 10 : 0,
                        paddingLeft: showIcon && iconPosition === 'left' ? 10 : 0,
                        fontWeight: 'bold',
                        maxWidth: widthTexto ? '100%' : '80%',
                        textAlign: 'center'
                    }}>
                    {label}
                </Text>
            )}
        </Button>
    );
}

export default PrimaryButton;
