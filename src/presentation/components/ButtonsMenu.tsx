import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { buttonsMenuStyles } from '../theme/home/buttonsMenuStyles'
import PrimaryButton from './PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootTabParams } from '../../presentation/routes/BottomTabsNavigator';
import { PixelRatio, useWindowDimensions } from 'react-native';

export const ButtonsMenu = () => {

    const { width, height } = useWindowDimensions();
    
    const navigation = useNavigation<NavigationProp<RootTabParams>>();    

    return (
        <Layout style={ buttonsMenuStyles.containerAction }>
            <Text style={ buttonsMenuStyles.titleButtons }>¿Qué deseas hacer hoy?</Text>
            <PrimaryButton
                label="Agenda tu cita"
                buttonColor= "white"
                appearance="outline"
                whithPercentaje="100%"
                height={94}
                borderColor='#ececec'
                applyShadow={true}
                nameIcon="calendar-outline"
                widthIcon={50}
                heightIcon={50}
                iconPosition={'left'}
                textColor={'#265170'}
                textSize={22  + (width * 0.015)}
                onPress={() => navigation.navigate('Agendar')}
            />
            <Layout style={ buttonsMenuStyles.containerSecondRow }>            
                <PrimaryButton
                    label="Reagendar / Cancelar"
                    buttonColor= "white"
                    appearance="outline"
                    whithPercentaje="49%"
                    height={94}
                    borderColor='#ececec'
                    applyShadow={true}
                    nameIcon="shopping-bag-outline"
                    widthIcon={40}
                    heightIcon={40}
                    iconPosition={'left'}
                    textColor={'#265170'}
                    textSize={12  + (width * 0.015)}
                    widthTexto={false}
                    onPress={() => navigation.navigate('GestionarCitas')}
                />
                <PrimaryButton
                    label="Historial citas"
                    buttonColor= "white"
                    appearance="outline"
                    whithPercentaje="49%"
                    height={94}
                    borderColor='#ececec'
                    applyShadow={true}
                    nameIcon="clock-outline"
                    widthIcon={40}
                    heightIcon={40}
                    iconPosition={'left'}
                    textColor={'#265170'}
                    textSize={12  + (width * 0.015)}
                    widthTexto={false}
                    onPress={() => navigation.navigate('HistorialCitas')}
                />
            </Layout>
        </Layout>
    )
}
