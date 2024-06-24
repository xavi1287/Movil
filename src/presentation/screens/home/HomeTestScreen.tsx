import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { RootStackParams } from '../../routes/StackNavigator';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';

export const HomeTestScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <View style={{flex: 1, padding: 20, backgroundColor:'white'}}>
            <HamburgerMenu />
            <Pressable 
                style={{
                    backgroundColor: 'blue',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                    width: '100%',
                    alignItems: 'center',
                }}
                onPress={() => navigation.navigate('ProductsScreen')}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 18,
                }}
                >Productos</Text>
            </Pressable>
        </View>
    )
}
