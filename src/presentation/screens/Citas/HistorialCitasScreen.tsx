import { Layout } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { CanGoBackHeader } from '../../components/shared/CanGoBackHeader'
import { globalColors } from '../../theme/theme';
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore';
import NucleosRepositorio from '../../../modules/GestionPersona/NucleosRepositorio';
import { ResponseSelect } from '../../../core/Dominio/Auth/Response/ResponseSelect';
import { SelectList } from 'react-native-dropdown-select-list';
import { CalendarioHistorial } from '../../components/CalendarioHistorial';
import { StyleSheet, Text, View } from 'react-native';

export const HistorialCitasScreen = () => {

    const [selected, setSelected] = React.useState<ResponseSelect | null>(null);

    const {
        dataPersona,
        dataNucleos,
        saveDataNucleos,
        saveDataSelect,
        responseSelect,
        removeDataSelect,
        removeDataNucleos
    } = useDataStore();

    useEffect(() => {
        if (!dataNucleos) {
            obtenerNucleos();
        }
    }, []);

    const obtenerNucleos = async () => {

        if (!dataPersona) return;

        removeDataSelect()
        removeDataNucleos()

        const nucleosRepositorio = new NucleosRepositorio();

        const resp = await nucleosRepositorio.obtenerNucleos(dataPersona.personaId, 0);

        if (!resp.isSuccessful) return;

        saveDataNucleos(resp.data);
        saveDataSelect(resp.data, dataPersona);
    }

    const handleSelect = (value: string) => {

        if (!responseSelect) return;
        const selectedItem = responseSelect.find((item: ResponseSelect) => item.value === value);
        if (selectedItem) {
            setSelected(selectedItem);
        } else {
            setSelected(null);
        }

    }

    return (
        <Layout style={{ flex: 1, backgroundColor: globalColors.white }}>

            <CanGoBackHeader />

            <View style={{ flex: 1 }}>

                {
                    responseSelect && (
                        <View style={styles.contenedorNucleo}>
                            <Text style={styles.title}>Paciente</Text>
                            <SelectList
                                setSelected={handleSelect}
                                data={responseSelect}
                                save="value"
                                inputStyles={{ color: '#828282' }}
                                boxStyles={{ backgroundColor: '#F5F4F4' }}
                                dropdownTextStyles={{ color: '#828282' }}
                                placeholder='Seleccione a una persona'
                                searchPlaceholder='Buscar'

                            />
                        </View>
                    )
                }
                {
                    selected && (
                        <CalendarioHistorial personaId={selected.id} />
                    )
                }

            </View>

        </Layout>
    )

}

const styles = StyleSheet.create({
    contenedorNucleo: {
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 10
    },
    title: {
        color: globalColors.darkSmoke,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
});