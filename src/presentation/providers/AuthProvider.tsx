import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from "../../core/Infraestructura/adapters/UseAuthStore";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from '../routes/StackNavigator';
import { UseStorage } from "../../core/Infraestructura/adapters/UseStorage";

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const { checkStatus, status } = useAuthStore();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    
    useEffect(() => {
        checkStatus();
    }, [])
    useEffect(() => {
        if (status !== 'checking') {
            if (status === 'autenticado') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerNavigator' }],
                })
            } else {
                UseStorage.removeAll();
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                })
            }
        }
    }, [status])

    return (
        <>
            { children }
        </>
    )
    
}