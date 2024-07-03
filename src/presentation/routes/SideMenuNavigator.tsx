import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { globalColors } from '../theme/theme';
import { BottomTabNavigator } from './BottomTabsNavigator';
import { IonIcon } from '../components/shared/IonIcon';
import { DrawerContent } from '../components/shared/DrawerContent'

export type RootDrawerParams = {
  TabNavigator: undefined;
  Contactanos: undefined;
  SobreLaApp: undefined;
  Politicas: undefined;
}

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const SideMenuNavigator = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={ (props) => <DrawerContent {...props} /> }
      screenOptions={{
        drawerType: (dimensions.width >= 758) ? 'permanent' : 'front',
        headerShown: false,
        drawerActiveBackgroundColor: globalColors.darkSmoke,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: globalColors.darkSmoke,
        drawerItemStyle: {
          borderRadius: 100,
          paddingHorizontal: 20
        }
      }}
    >
      <Drawer.Screen 
        options={{ 
          drawerIcon: ({ color }) => ( <IonIcon name="bonfire-outline" color={ color } /> ),
          drawerItemStyle: { display: 'none' }  // Oculta la opción "Tabs"
        }}
        name="TabNavigator" component={ BottomTabNavigator }  />
    </Drawer.Navigator>
  );
}

