import { Button, Icon, Layout } from '@ui-kitten/components'
import React, { useCallback, useEffect } from 'react'
import { useAuthStore } from '../../../core/Infraestructura/adapters/UseAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { CanalCradSlider } from '../../components/CanalCradSlider';
import { CitasCardScrollHorizontal } from '../../components/CitasCardScrollHorizontal';
import { ButtonsMenu } from '../../components/ButtonsMenu';
import { UseStorage } from '../../../core/Infraestructura/adapters/UseStorage';
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore';
import CitasVigentesRepositorio from '../../../modules/Citas/CitasVigentesRepositorio';
import { PersonaCedulaDto } from '../../../core/Aplicacion/Dto/PersonaCedulaDto';
import PersonaRepositorio from '../../../modules/GestionPersona/PersonaRepositorio';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { globalColors, globalStyles } from '../../theme/theme';
import { BellNotification } from '../../components/shared/BellNotification';
import { useFocusEffect } from '@react-navigation/native';
import NucleosRepositorio from '../../../modules/GestionPersona/NucleosRepositorio';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { useUtils } from '../../hooks/useUtils';
import { ScrollView } from 'react-native';

export const HomeScreen = () => {

  let startTime, endTime;
  const citasVigentesRepositorio = new CitasVigentesRepositorio();
  const personaRepositorio = new PersonaRepositorio();
  const nucleosRepositorio = new NucleosRepositorio();
  const {
    isLoadingData,
    setIsLoadingData,
  } = useUtils();
  const { logout } = useAuthStore();
  const {
    dataPersona,
    dataCitasvigentes,
    saveDataCitasVigentes,
    dataNucleos,
    dataInfoPersona,
    saveDataPersona,
    saveDateInfoPersona,
    saveDataNucleos,
    esDataActualizada
  } = useDataStore();

  useFocusEffect(
    useCallback(() => {
      obtenerPersona();

    }, [])
  );

  const obtenerPersona = async () => {
    setIsLoadingData(true);
    if (!dataPersona || esDataActualizada) {
      const cedula = await UseStorage.getItem('cedula') ?? '';
      startTime = Date.now();
      const resp = await personaRepositorio.obtenerInformacionBascioPersona(cedula);
      endTime = Date.now();
      console.log('obtenerInformacionBascioPersona duration:', ((endTime - startTime) / 1000) + 's');
      if (!resp.isSuccessful) {
        return;
      }
      //console.info('InfoPersona|datapersona==undefined', resp.data);
      saveDataPersona(resp.data);
      ObtenerNucleos(resp.data?.personaId);
      ObtenerInfoPersona(resp.data?.personaId);
      await obtenerCitasVigentes(resp.data?.personaId);
    }
    else {
      //console.info('InfoPersona==false|datapersona!=undefined', dataPersona);
      ObtenerNucleos(dataPersona.personaId);
      ObtenerInfoPersona(dataPersona.personaId);
      await obtenerCitasVigentes(dataPersona.personaId);
    }
    setIsLoadingData(false);
  }

  const ObtenerInfoPersona = async (personaId?: number | undefined) => {

    if (personaId !== undefined) {
      
      if (dataInfoPersona === undefined && personaId !== undefined) {
        startTime = Date.now();
        const response = await personaRepositorio.obtenerInformacionPersona(personaId, 0);
        endTime = Date.now();
        console.log('obtenerInformacionPersona home duration:', ((endTime - startTime) / 1000) + 's');
        if (response !== undefined) {
          saveDateInfoPersona(response);
        }
      }
    }


  };

  const ObtenerNucleos = async (personaId?: number | undefined) => {
    
    if (personaId !== undefined && dataNucleos === undefined) {
      //const _personaId = personaId ?? 0;
      // Provide a default value of 0 if personaId is undefined
      if (dataNucleos === undefined) {
        if (personaId !== undefined) {
          startTime = Date.now();
          const response = await nucleosRepositorio.obtenerNucleos(personaId, 0);
          endTime = Date.now();
          console.log('obtenerNucleos home duration:', ((endTime - startTime) / 1000) + 's');
          saveDataNucleos(response.data);
        }
      }
    }
  }
  const obtenerCitasVigentes = async (personaId?: number | undefined) => {
    
    if (personaId !== undefined && personaId > 0 && dataCitasvigentes === undefined) {
      startTime = Date.now();
      const resp = await citasVigentesRepositorio
        .obtenerCitasVigentes(
          personaId,
          personaId,
          0
        )
        endTime = Date.now();
        console.log('obtenerNucleos home duration:', ((endTime - startTime) / 1000) + 's');
      if (!resp.isSuccessful) {
        return;
      }
      saveDataCitasVigentes(resp.data);
    }
  }

  return (
    <Layout
      style={{ flex: 1, backgroundColor: globalColors.white }}
    >
      {
        (
          <ScrollView style={globalStyles.containerScrollView}>
            <LoadingOverlay isLoading={isLoadingData} >
              <HamburgerMenu />
              <BellNotification />
              <CanalCradSlider />
              <CitasCardScrollHorizontal />
              <ButtonsMenu />
              {/* <Layout>
                  <Button
                    accessoryLeft={ <Icon name='log-out-outline'/> }
                    onPress={logout}
                  >
                    Cerrar sesión
                  </Button>
                </Layout> */}
            </LoadingOverlay>
          </ScrollView>
        )
      }
    </Layout>
  )
}
