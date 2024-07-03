import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CanGoBackHeader } from '../../components/shared/CanGoBackHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { globalColors, globalStyles } from '../../theme/theme';
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore';
import PersonaRepositorio from '../../../modules/GestionPersona/PersonaRepositorio';
import { useFocusEffect, useNavigation, type NavigationProp } from '@react-navigation/native';
import type { RootTabParams } from '../../routes/BottomTabsNavigator';
import { UseStorage } from '../../../core/Infraestructura/adapters/UseStorage';
import { useUtils } from '../../hooks/useUtils';


export const PerfilHomeScreen = () => {
    let startTime, endTime;
    const personaRepositorio = new PersonaRepositorio();
    const navigation = useNavigation<NavigationProp<RootTabParams>>();
    const { dataPersona, dataNucleos, esDataActualizada, saveDataPersona } = useDataStore();
    const {
        setIsLoadingData,
    } = useUtils();
    const [esCargado, setEsCargado] = useState(false);
    const obtenerPersona = async () => {
        setIsLoadingData(true);
        console.log('dataPersona homecreen:', dataPersona);
        console.log('esDataActualizada homescreen:', esDataActualizada);
        if (!dataPersona || esDataActualizada) {
            const cedula = await UseStorage.getItem('cedula') ?? '';
            startTime = Date.now();
            const resp = await personaRepositorio.obtenerInformacionBascioPersona(cedula);
            endTime = Date.now();
            console.info('obtenerInformacionBascioPersona Perfil home duration:', ((endTime - startTime) / 1000) + 's');
            if (!resp.isSuccessful) {
                return;
            }

            saveDataPersona(resp.data);


        }

        setIsLoadingData(false);
    }
    useFocusEffect(
        useCallback(() => {
            if (!esCargado) {
                obtenerPersona();
                setEsCargado(true);
            }

        }, [esCargado, obtenerPersona])
    );
    useEffect(() => {
        obtenerPersona();


    }, [])

    const getAvatarUri = (relacionFamiliar: string): any => {
        switch (relacionFamiliar) {
            case 'Papá':
            case 'Hijo':
                return require('../../../assets/imgs/avatar1.png');
            case 'Mamá':
            case 'Hija':
                return require('../../../assets/imgs/avatarMujer.png');
            default:
                return require('../../../assets/imgs/avatarHombre.png');
        }
    };
    const SeleccionarNucleo = (personaId: number) => {
        console.log('Persona ID:', personaId);
        // Aquí puedes manejar la acción que deseas realizar al presionar el botón
    };
    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
            <View style={globalStyles.container}>
                <CanGoBackHeader />
                <Text style={styles.sectionTitle}>Mi perfil</Text>
                <View style={styles.profileHeader}>
                    <View style={styles.profileContainer}>


                        <Image
                            style={styles.avatar}
                            source={require('../../../assets/imgs/avatar1.png')} />
                        <View style={styles.profileDetails}>
                            <Text style={styles.name}>{dataPersona?.nombreCompleto}</Text>
                            <Text style={styles.address}>{dataPersona?.direccion}</Text>
                            <Text style={styles.phone}>{dataPersona?.telefono}</Text>
                            <Text style={styles.email}>{dataPersona?.correo}</Text>

                        </View>

                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton label="Actualizar Datos"
                            buttonColor={globalColors.primary}
                            height={55}
                            appearance={'filled'}
                            whithPercentaje={'100%'}
                            nameIcon="book-outline"
                            showIcon={false}
                            textColor={'white'}
                            textSize={20}
                            borderColor={globalColors.primary}
                            onPress={() => navigation.navigate('Perfil')}
                        />
                    </View>
                </View>

                <View style={styles.familyContainer}>
                    <Text style={styles.sectionTitle}>Mi núcleo familiar</Text>
                    {dataNucleos?.nucleos.map((nucleo, index) => (
                        <TouchableOpacity key={index} style={styles.familyMember} onPress={() => SeleccionarNucleo(nucleo.personaId)}>
                            <Image
                                source={getAvatarUri(nucleo.relacionFamiliar)}
                                style={styles.familyAvatar}
                            />
                            <Text style={styles.familyName}>{`${nucleo.primerNombre} ${nucleo.primerApellido}, ${nucleo.relacionFamiliar}`}</Text>
                        </TouchableOpacity >
                    ))}
                </View>
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    profileContainer: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
    profileHeader: {

        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#00000012',
        shadowColor: '#00000012',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        shadowRadius: 2,
        elevation: 1,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 30,
    },
    profileDetails: {
        flex: 1,
        marginLeft: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    address: {
        fontSize: 14,
        color: '#888888',
    },
    phone: {
        fontSize: 12,
        color: '#888888',
    },
    email: {
        fontSize: 11,
        color: '#888888',
    },
    buttonContainer: {
        marginTop: -30,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    familyContainer: {
        margin: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    familyMember: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',

        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#00000012',
        shadowColor: '#00000012',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        shadowRadius: 2,
        elevation: 1,
    },
    familyAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    familyName: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black'
    },
});