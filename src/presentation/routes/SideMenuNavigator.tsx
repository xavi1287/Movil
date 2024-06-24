import { DrawerContentComponentProps, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { globalColors } from '../theme/theme';
import { BottomTabNavigator } from './BottomTabsNavigator';
import { IonIcon } from '../components/shared/IonIcon';
import { ContactanosScreen } from '../screens/Contactanos/ContactanosScreen';
import { AboutScreen } from '../screens/About/AboutScreen';
import { PoliticasScreen } from '../screens/Politicas/PoliticasScreen';
import { useAuthStore } from '../../core/Infraestructura/adapters/UseAuthStore';
import { VersionApp } from '@env';


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
      drawerContent={ (props) => <CustomDrawerContent {...props} /> }
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
      <Drawer.Screen 
        options={{ drawerIcon: ({ color }) => ( <IonIcon name="call-outline" color={ color } /> ) }} 
        name="Contactanos" component={ ContactanosScreen } 
      />
      <Drawer.Screen 
        options={{ drawerIcon: ({ color }) => ( <IonIcon name="information-circle-outline" color={ color } /> ) }} 
        name="SobreLaApp" component={ AboutScreen } 
      />
      <Drawer.Screen 
        options={{ drawerIcon: ({ color }) => ( <IonIcon name="document-attach-outline" color={ color } /> ) }} 
        name="Politicas" component={ PoliticasScreen } 
      />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { logout } = useAuthStore();
  return (
    <ScrollView style={{flex: 1, marginTop: 30}}>
      <DrawerItemList {...props} />
      <View style={{ justifyContent: 'flex-end', flex: 1, paddingBottom: 20 }}>
        <Text style={{ 
          fontSize: 16, 
          color: globalColors.darkSmoke,
          marginLeft: 60,
          marginVertical: 20 }}
        >{VersionApp}</Text>
        <TouchableOpacity
          style={{
            flex: 1, 
            flexDirection: 'row',
            marginLeft: 40
          }}
          onPress={logout}
        >
          <IonIcon name='exit-outline' color= {globalColors.darkSmoke}/>
          <Text style={{ fontSize: 18, color: globalColors.darkSmoke }}> Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};