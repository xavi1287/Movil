import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { useFocusEffect } from '@react-navigation/native'
import { CanGoBackHeader } from '../../components/shared/CanGoBackHeader'
import { CitasCardScrollVertical } from '../../components/CitasCardScrollVertical'
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore'
import NucleosRepositorio from '../../../modules/GestionPersona/NucleosRepositorio'
import { gestionarCitasStyles } from '../../theme/Agendar/gestionarCitasStyles'
import { globalStyles } from '../../theme/theme'
import AnimatedLoading from '../../components/ui/AnimatedLoading'  // Asegúrate de que la ruta sea correcta

export const GestionarCitasScreen = () => {
  const nucleosRepositorio = new NucleosRepositorio()
  const [nucleoSelected, setNucleoSelected] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    dataPersona,
    responseSelect,
    saveDataSelect,
    removeDataNucleos,
    saveDataNucleos,
    removeDataSelect,
    removeDataCitasVigentesNucleos
  } = useDataStore()

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      setNucleoSelected(null)
      obtenerNucleos()
      removeDataCitasVigentesNucleos()
    }, [])
  )

  const obtenerNucleos = async () => {
    if (!dataPersona) {
      setIsLoading(false)
      return
    }
    removeDataSelect()
    removeDataNucleos()
    const resp = await nucleosRepositorio.obtenerNucleos(dataPersona?.personaId, 0)
    if (!resp.isSuccessful) {
      setIsLoading(false)
      return
    }

    saveDataNucleos(resp.data)
    saveDataSelect(resp.data, dataPersona)
    setIsLoading(false)
  }

  const nucleos = responseSelect?.map(item => ({
    key: item.id.toString(),
    value: item.value
  }))

  if (isLoading) {
    return <AnimatedLoading />
  }

  return (
    <View style={gestionarCitasStyles.container}>
      <CanGoBackHeader />
      <ScrollView style={globalStyles.containerScrollView}>
        {nucleos && (
          <>
            <Text style={gestionarCitasStyles.title}>Paciente</Text>
            <SelectList
              setSelected={setNucleoSelected}
              data={nucleos}
              save="key"
              inputStyles={{ color: '#828282' }}
              boxStyles={{ backgroundColor: '#F5F4F4' }}
              dropdownTextStyles={{ color: '#828282' }}
              placeholder='Seleccione a una persona'
              searchPlaceholder='Buscar'
            />
          </>
        )}
        {nucleoSelected && (
          <CitasCardScrollVertical personaId={Number(nucleoSelected)} />
        )}
      </ScrollView>
    </View>
  )
}
