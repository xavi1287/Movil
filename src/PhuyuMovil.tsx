import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { Platform, useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { StackNavigator } from './presentation/routes/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificacionProvider } from './presentation/providers/NotificacionProvider';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { OneSignalAppId } from '@env';
import { useEffect } from 'react';
import { Button, Text } from 'react-native-paper';
import PrimaryButton from './presentation/components/PrimaryButton';
import { globalColors } from './presentation/theme/theme';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';


const queryClient = new QueryClient();
type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
type NotificationSettings = {
  // properties only available on iOS
  // unavailable settings will not be included in the response object
  alert?: boolean;
  badge?: boolean;
  sound?: boolean;
  carPlay?: boolean;
  criticalAlert?: boolean;
  provisional?: boolean;
  providesAppSettings?: boolean;
  lockScreen?: boolean;
  notificationCenter?: boolean;
};
// only used on iOS
type NotificationOption =
  | 'alert'
  | 'badge'
  | 'sound'
  | 'criticalAlert'
  | 'carPlay'
  | 'provisional'
  | 'providesAppSettings';
interface PermissionResponse {
  granted: boolean;
  status: string;
}
interface SettingsNotification {
  status: PermissionStatus;
  settings: NotificationSettings;
}
async function checkNotifications(): Promise<SettingsNotification> {
  const status = await check('android.permission.POST_NOTIFICATIONS');
  console.log('status ' + status);
  return { status, settings: {} };
}
async function requestNotifications(): Promise<SettingsNotification> {


  const status = await request('android.permission.POST_NOTIFICATIONS');
  console.log('status ' + status);
  return { status, settings: {} };
}
async function checkAndRequestPermissionsNotification(): Promise<PermissionResponse> {
  //#region PermisoNotificacion
  let permission = false;
  let status = '';
  switch (Platform.OS) {
    case 'android':
      console.log(DeviceInfo.getSystemVersion());
      status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log('PERMISSIONS.ANDROID.POST_NOTIFICATIONS' + status);
      if (status !== RESULTS.GRANTED) {
        status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      }
      permission = status === RESULTS.GRANTED;
      console.log('status ' + status + " permission " + permission);
      break;
    case 'ios':
      // const { status: currentStatus } = await checkNotifications();
      // if (currentStatus !== RESULTS.GRANTED) {
      //   const { status: newStatus } = await requestNotifications(['alert', 'sound', 'badge']);
      //   status = newStatus;
      // } else {
      //   status = currentStatus;
      // }
      // permission = status === RESULTS.GRANTED;
      break;
    default:
      status = RESULTS.UNAVAILABLE;
      permission = false;
      break;
  }
  return { granted: permission, status };
  //#endregion PermisoNotificacion
}

export const PhuyuMovil = () => {
  const colorScheme = useColorScheme();
  // const theme = colorScheme === 'dark' ? eva.light : eva.dark;
  const theme = eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];
  useEffect(() => {
    // Inicializa OneSignal
    console.log(DeviceInfo.getSystemVersion());
    console.log(Platform.Version);
    console.log(OneSignalAppId);
    OneSignal.initialize(OneSignalAppId);
    OneSignal.InAppMessages.addEventListener('willDisplay', (event) => {
      console.log('OneSignal: will display IAM: ', event);
    });
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });

    OneSignal.InAppMessages.addEventListener('click', (event) => {
      console.log('OneSignal IAM clicked:', event);
    });

    OneSignal.InAppMessages.addEventListener('willDisplay', (event) => {
      console.log('OneSignal: will display IAM: ', event);
    });

    OneSignal.InAppMessages.addEventListener('didDisplay', (event) => {
      console.log('OneSignal: did display IAM: ', event);
    });

    OneSignal.InAppMessages.addEventListener('willDismiss', (event) => {
      console.log('OneSignal: will dismiss IAM: ', event);
    });

    OneSignal.InAppMessages.addEventListener('didDismiss', (event) => {
      console.log('OneSignal: did dismiss IAM: ', event);
    });

    OneSignal.User.pushSubscription.addEventListener(
      'change',
      (subscription) => {
        console.log('OneSignal: subscription changed:', subscription);
      },
    );

    OneSignal.Notifications.addEventListener('permissionChange', (granted) => {
      console.log('OneSignal: permission changed:', granted);
    });

    OneSignal.User.addEventListener('change', (event) => {
      console.log('OneSignal: user changed: ', event);
    });
    // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal.LiveActivities.setupDefault();
    checkNotifications();
    requestNotifications();




  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>

        <NotificacionProvider name={'OneSignal'} ></NotificacionProvider>

        {/* <NavigationContainer
        // theme={{
        //   dark: colorScheme === 'dark',
        //   colors: {
        //     primary: theme['color-primary-500'],
        //     background: backgroundColor,
        //     card: theme['color-basic-100'],
        //     text: theme['text-basic-color'],
        //     border: theme['color-basic-800'],
        //     notification: theme['color-primary-500'],
        //   },
        // }}
        >
          
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
          
        </NavigationContainer>  */}
      </ApplicationProvider>
    </QueryClientProvider >

  )
}
