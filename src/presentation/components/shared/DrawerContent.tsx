import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { VersionApp } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../core/Infraestructura/adapters/UseAuthStore';
import { IonIcon } from './IonIcon';
import { globalColors } from '../../theme/theme';
import { RootTabParams } from '../../routes/BottomTabsNavigator';
import { drawerStyles } from '../../theme/home/drawerStyles';
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore';

interface drawerItemParm {
    icon: string;
    label: string;
    navigateTo: 'Contactanos' | 'About' | 'Politicas';
}

const DrawerList: drawerItemParm[] = [
    { icon: 'call-outline', label: 'Contáctanos', navigateTo: 'Contactanos' },
    { icon: 'information-circle-outline', label: 'Sobre la App', navigateTo: 'About' },
    { icon: 'document-attach-outline', label: 'Políticas', navigateTo: 'Politicas' },
];

const DrawerLayout = ({ item }: { item: drawerItemParm }) => {
    const navigation = useNavigation<NavigationProp<RootTabParams>>();
    const { icon, label, navigateTo } = item;
    
    return (
        <DrawerItem
            icon={({ color }) => (<IonIcon name={icon} color={color} />)}
            label={label}
            onPress={() => navigation.navigate(navigateTo)}
        />
    );
};

const DrawerItems = () => {
    return DrawerList.map((item, i) => {
        return (
            <DrawerLayout key={i} item={item} />
        );
    });
};

export const DrawerContent = (props: DrawerContentComponentProps) => {

    const { logout } = useAuthStore();
    const {
        removeDataPersona,
        removeDataCitasVigentes,
        removeDataNucleos,
        removeDataStore
    } = useDataStore();

    const removeData = async () => {
        logout();
        removeDataStore();
        removeDataPersona();
        removeDataCitasVigentes();
        removeDataNucleos();
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={drawerStyles.drawerContent}>
                    <View style={drawerStyles.drawerSection}>
                        <DrawerItems />
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={drawerStyles.bottomDrawerSection}>
                <Text style={{
                    fontSize: 16,
                    color: globalColors.darkSmoke,
                    marginLeft: 60,
                    marginVertical: 20
                }}
                >V {VersionApp}</Text>
                <DrawerItem
                    icon={({ color }) => (<IonIcon name='exit-outline' color={globalColors.darkSmoke} />)}
                    label='Cerrar Sesión'
                    onPress={removeData}
                />
            </View>
        </View>
    );
}
