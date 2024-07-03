import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { IonIcon } from './IonIcon';
import { globalColors } from '../../theme/theme';
import { RootTabParams } from '../../routes/BottomTabsNavigator';
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore';

export const CanGoBackHeader = ({ parm = false }) => {

  const navigation = useNavigation<NavigationProp<RootTabParams>>();
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(parm); // State for navigation control
  const {
    removeDataCitasVigentesNucleos
  } = useDataStore()

  useEffect( () => {
    navigation.setOptions( {
      headerLeft: () => (
        <Pressable 
          style={{ marginLeft: 5 }}
          onPress={() => {
            if (!parm) {
              navigation.goBack();
            } else {
              navigation.navigate('Home');
            }
            removeDataCitasVigentesNucleos()
          }
        }>
          <IonIcon 
            name="arrow-back-outline" 
            size={30} 
            color={ globalColors.white } 
            paddingLeft={10}
          />
        </Pressable>
      )
    } );
  }, [] );

  return (<></>);
}