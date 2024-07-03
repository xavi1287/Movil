import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { StackNavigator } from './presentation/routes/StackNavigator';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { OneSignalAppId } from '@env';


const queryClient = new QueryClient();

export const PhuyuMovil = () => {
  const colorScheme = useColorScheme();
  // const theme = colorScheme === 'dark' ? eva.light : eva.dark;
  const theme = eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];
      
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
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
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>

  )
}
