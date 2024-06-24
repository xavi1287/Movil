import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { buttonsMenuStyles } from '../theme/home/buttonsMenuStyles'
import PrimaryButton from './PrimaryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../presentation/routes/StackNavigator';

export const ButtonsMenu = () => {
    
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
                textSize={26}
                onPress={() => navigation.navigate('AgendarCitaScreen')}
            />
            <Layout style={ buttonsMenuStyles.containerSecondRow }>            
                <PrimaryButton
                    label="Gestionar citas"
                    buttonColor= "white"
                    appearance="outline"
                    whithPercentaje="49%"
                    height={94}
                    borderColor='#ececec'
                    applyShadow={true}
                    nameIcon="shopping-bag-outline"
                    widthIcon={50}
                    heightIcon={50}
                    iconPosition={'left'}
                    textColor={'#265170'}
                    textSize={26}
                    widthTexto={false}
                    onPress={() => console.log()}
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
                    widthIcon={50}
                    heightIcon={50}
                    iconPosition={'left'}
                    textColor={'#265170'}
                    textSize={26}
                    widthTexto={false}
                    onPress={() => console.log()}
                />
            </Layout>
        </Layout>
    )
}
