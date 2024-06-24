import { OneSignalAppId } from '@env';
import React, { useState } from 'react'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import OSConsole from './OSConsole';
import OSButtons from './OSButtons';
import { renderButtonView } from '../components/ui/Helper';
export interface Props {
    name: string;
}

export interface State {
    name: string;
    consoleValue: string;
    inputValue: string;
}


export const NotificacionProvider = (prop: Props) => {
    const [state, setState] = useState<State>({
        name: prop.name,
        consoleValue: '',
        inputValue: '',
    });
    
    async function componentDidMount() {
        const app = OneSignal.initialize(OneSignalAppId);
        console.log(app);
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);

        OneSignal.LiveActivities.setupDefault();
        OneSignal.Notifications.addEventListener(
            'foregroundWillDisplay',
            (event) => {
                OSLog('OneSignal: notification will show in foreground:', event);
                let notif = event.getNotification();

                const cancelButton = {
                    text: 'Cancel',
                    onPress: () => {
                        event.preventDefault();
                    },
                    style: 'cancel',
                };

                const completeButton = {
                    text: 'Display',
                    onPress: () => {
                        event.getNotification().display();
                    },
                };

                Alert.alert(
                    'Display notification?',
                    notif.title,
                    [cancelButton, completeButton],
                    {
                        cancelable: true,
                    },
                );
            },
        );
        OneSignal.Notifications.addEventListener('click', (event) => {
            OSLog('OneSignal: notification clicked:', event);
        });

        OneSignal.InAppMessages.addEventListener('click', (event) => {
            OSLog('OneSignal IAM clicked:', event);
        });

        OneSignal.InAppMessages.addEventListener('willDisplay', (event) => {
            OSLog('OneSignal: will display IAM: ', event);
        });

        OneSignal.InAppMessages.addEventListener('didDisplay', (event) => {
            OSLog('OneSignal: did display IAM: ', event);
        });

        OneSignal.InAppMessages.addEventListener('willDismiss', (event) => {
            OSLog('OneSignal: will dismiss IAM: ', event);
        });

        OneSignal.InAppMessages.addEventListener('didDismiss', (event) => {
            OSLog('OneSignal: did dismiss IAM: ', event);
        });

        OneSignal.User.pushSubscription.addEventListener(
            'change',
            (subscription) => {
                OSLog('OneSignal: subscription changed:', subscription);
            },
        );

        OneSignal.Notifications.addEventListener('permissionChange', (granted) => {
            OSLog('OneSignal: permission changed:', granted);
        });

        OneSignal.User.addEventListener('change', (event) => {
            OSLog('OneSignal: user changed: ', event);
        });
    }
    const OSLog = (message: string, optionalArg: any = null) => {
        if (optionalArg !== null) {
            message = message + JSON.stringify(optionalArg);
        }

        console.log(message);

        let consoleValue;

        if (state.consoleValue) {
            consoleValue = `${state.consoleValue}\n${message}`;
        } else {
            consoleValue = message;
        }
        setState(prevState => ({
            ...prevState,
            consoleValue,
            inputValue: ''
        }));
    };

    function inputChange(text: string): void {
        setState({
            inputValue: text,
            name: '',
            consoleValue: state.consoleValue,
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>OneSignal</Text>
                <OSConsole value={state.consoleValue} />
                <View style={styles.clearButton}>
                    {renderButtonView('X', () => {
                        return setState({
                            consoleValue: '',
                            name: '',
                            inputValue: '',
                        });
                    })}
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Input"
                    onChangeText={inputChange}
                />
            </View>
            <ScrollView style={styles.scrollView}>
                <OSButtons
                    loggingFunction={OSLog}
                    inputFieldValue={state.inputValue}
                />
            </ScrollView>
        </SafeAreaView>
    );

}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff',
    },
    header: {
        flex: 0.5,
    },
    scrollView: {
        flex: 0.5,
    },
    title: {
        fontSize: 40,
        alignSelf: 'center',
        paddingVertical: 10,
    },
    clearButton: {
        position: 'absolute',
        right: 0,
        top: 70,
    },
    input: {
        marginTop: 10,
    },
});
