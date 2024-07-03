import { createStackNavigator } from '@react-navigation/stack';
import { SideMenuNavigator } from './SideMenuNavigator';
import { 
  LoadingScreen,
  LoginScreen,
  RegistroScreen,
  RegistroDatosScreen,
  RecuperarContrasenaScreen,
  
  PerfilHomeScreen,
  PerfilScreen
} from '../screens';

export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    RegistroScreen: undefined;
    RegistroDatosScreen: undefined;
    RecuperarContrasenaScreen: undefined;
    DrawerNavigator: undefined;
    PerfilHomeScreen: undefined;
    PerfilScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#28516F', // Azul
          elevation: 0,
          shadowColor: 'transparent'
        },
        headerTintColor: '#FFFFFF', // Blanco
      }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="RegistroScreen" component={ RegistroScreen } />
      <Stack.Screen name="RegistroDatosScreen" component={ RegistroDatosScreen } />
      <Stack.Screen name="RecuperarContrasenaScreen" component={ RecuperarContrasenaScreen } />
      <Stack.Screen name="PerfilHomeScreen" component={ PerfilHomeScreen } />
      <Stack.Screen name="DrawerNavigator" component={ SideMenuNavigator } />
      <Stack.Screen name="PerfilScreen" component={ PerfilScreen } />
    </Stack.Navigator>
  );
};