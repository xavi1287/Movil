import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { IonIcon } from './IonIcon';
import { globalColors } from '../../theme/theme';
import { RootTabParams } from '../../routes/BottomTabsNavigator';


export const BellNotification = () => {

  const navigation = useNavigation<NavigationProp<RootTabParams>>();  

  useEffect( () => {
    navigation.setOptions( {
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('Notificaciones')}
        >
          <IonIcon 
            name="notifications-outline" 
            size={24} 
            color= {globalColors.white} 
            paddingRight={10} 
          />
        </Pressable>
      ),
          
    } );
  }, [] );

  return (<></>);
}