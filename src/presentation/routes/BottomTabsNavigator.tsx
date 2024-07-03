import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { globalColors } from '../theme/theme';
import { IonIcon } from '../components/shared/IonIcon';
import {
  AgendarCitaScreen,
  ReagendarCitaScreen,
  HomeScreen,
  PerfilScreen,
  PerfilHomeScreen,
  GestionarCitasScreen,
  HistorialCitasScreen,
  NotificacionesScreen,
  ContactanosScreen,
  AboutScreen,
  PoliticasScreen,
} from '../screens';
import { useWindowDimensions } from 'react-native';



export type RootTabParams = {
  Home: undefined,
  Agendar: undefined,
  Reagendar: { personaId: number, citaId: number },
  Perfil: undefined,
  PerfilHome: undefined,
  GestionarCitas: undefined,
  HistorialCitas: undefined,
  Notificaciones: undefined,
  Contactanos: undefined,
  About: undefined,
  Politicas: undefined,
}

const Tab = createBottomTabNavigator<RootTabParams>();

export const BottomTabNavigator = () => {

  const { width, height } = useWindowDimensions();
  const paddingLeftTitle = width / 7;

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: globalColors.background,
      }}
      screenOptions={{
        tabBarActiveTintColor: globalColors.primary,
        tabBarLabelStyle: {
          fontSize: 16,
          marginBottom: 5,
        },
        headerStyle: {
          backgroundColor: globalColors.background,
          elevation: 2,
          borderColor: 'transparent',
          shadowColor: 'transparent',
        },
        tabBarStyle: {
          borderTopWidth: 1,
          height: 74,
          // elevation: 0
        }
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          title: 'Ministerio de Salud Pública',
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (<IonIcon name="home-outline" size={35} color={color} />),
          // headerRight: () => <IonIcon name="notifications-outline" size={24} color="white" paddingRight={10} />, // Add the icon here
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
            textAlign: 'center', // Center the title text
            width: '100%'
            // paddingLeft: paddingLeftTitle
          },
          headerTitleAlign: 'center'
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Agendar"
        options={{
          title: 'Nueva Cita',
          tabBarLabel: 'Nueva Cita',
          tabBarIcon: ({ color }) => (<IonIcon name="calendar-number-outline" size={35} color={color} />),
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center'
        }}
        component={AgendarCitaScreen}
      />
      <Tab.Screen
        name="PerfilHome"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (<IonIcon name="person-circle-outline" size={35} color={color} />),
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center'
        }}
        component={PerfilHomeScreen}
      />
      
      <Tab.Screen
        name="GestionarCitas"
        options={{
          title: 'Gestionar Citas',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={GestionarCitasScreen}
      />
      <Tab.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={PerfilScreen}
      />
      <Tab.Screen
        name="HistorialCitas"
        options={{
          title: 'Historial Citas',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={HistorialCitasScreen}
      />
      <Tab.Screen
        name="Notificaciones"
        options={{
          title: 'Notificaciones',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={NotificacionesScreen}
      />
      <Tab.Screen
        name="Contactanos"
        options={{
          title: 'Contáctanos',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={ContactanosScreen}
      />
      <Tab.Screen
        name="About"
        options={{
          title: 'Sobre la App',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={AboutScreen}
      />
      <Tab.Screen
        name="Politicas"
        options={{
          title: 'Políticas',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={PoliticasScreen}
      />
      <Tab.Screen
        name="Reagendar"
        options={{
          title: 'Reagendar Cita',
          headerTitleStyle: {
            color: 'white', // Set the title text color to white
          },
          headerTitleAlign: 'center',
          tabBarButton: () => null,
        }}
        component={ReagendarCitaScreen}
        initialParams={{ personaId: 0, citaId: 0 }}
      />
    </Tab.Navigator>
  );
}