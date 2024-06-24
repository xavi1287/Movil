import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PerfilScreen } from '../screens/Perfil/PerfilScreen';
import { globalColors } from '../theme/theme';
import { IonIcon } from '../components/shared/IonIcon';
import { AgendarCitaScreen, HomeScreen } from '../screens';

type RootTabParams = {
  Home: undefined,
  Agendar: undefined,
  Perfil: undefined
}

const Tab = createBottomTabNavigator<RootTabParams>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: globalColors.background,
      }}
      screenOptions={{
        tabBarActiveTintColor: globalColors.primary,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
        headerStyle: {
          elevation: 2,
          borderColor: 'transparent',
          shadowColor: 'transparent'
        },
        tabBarStyle: {
          borderTopWidth: 1,
          // elevation: 0
        }
      }}
    >
      <Tab.Screen 
        name="Home"
        options={{ title:'Inicio', tabBarIcon: ({ color }) => ( <IonIcon name="home-outline" color={ color } /> ) }}
        component={ HomeScreen } 
      />
      <Tab.Screen 
        name="Agendar"
        options={{ title:'Nueva Cita', tabBarIcon: ({ color }) => ( <IonIcon name="calendar-number-outline" color={ color } /> ) }}
        component={ AgendarCitaScreen }
      />
      <Tab.Screen 
        name="Perfil"
        options={{ title:'Perfil', tabBarIcon: ({ color }) => ( <IonIcon name="person-circle-outline" color={ color } /> ) }}
        component={ PerfilScreen } 
      />
    </Tab.Navigator>
  );
}