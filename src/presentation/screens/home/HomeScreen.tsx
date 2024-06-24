import { Button, Icon, Layout } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { useAuthStore } from '../../../core/Infraestructura/adapters/UseAuthStore';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { CanalCradSlider } from '../../components/CanalCradSlider';
import { CitasCardScrollHorizontal } from '../../components/CitasCardScrollHorizontal';
import { ButtonsMenu } from '../../components/ButtonsMenu';
import { UseStorage } from '../../../core/Infraestructura/adapters/UseStorage';
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore';
import CitasVigentesRepositorio from '../../../modules/CitasVigentes/CitasVigentesRepositorio';
import { PersonaCedulaDto } from '../../../core/Aplicacion/Dto/PersonaCedulaDto';
import PersonaRepositorio from '../../../modules/GestionPersona/PersonaRepositorio';
import { HamburgerMenu } from '../../components/shared/HamburgerMenu';
import { globalColors } from '../../theme/theme';

export const HomeScreen = () => {

  const personaRepositorio = new PersonaRepositorio();
  const citasVigentesRepositorio = new CitasVigentesRepositorio();
  const { logout } = useAuthStore();
  const { saveDataPersona, saveDataCitasVigentes, dataCitasvigentes } = useDataStore();

  useEffect(() => {
    obtenerPersona();
  }, []);

  const obtenerPersona = async () => {
    const cedula = await UseStorage.getItem('cedula');
    const esNulaOVacia = cedula === null || cedula.length === 0;
    if(!esNulaOVacia){
      const resp = await personaRepositorio.obtenerPersonaXCedula(cedula);
      if ( !resp.isSuccessful ) {
        return;
      }
      console.log(resp.data!);
      saveDataPersona( resp.data );
      obtenerCitasVigentes(resp.data!);
    }
  }

  const obtenerCitasVigentes = async (persona: PersonaCedulaDto) => {
      const resp = await citasVigentesRepositorio
                  .obtenerCitasVigentes(
                      persona?.personaId,
                      persona?.personaId,
                      0
                  )
      if ( !resp.isSuccessful ) {
      return;
      }
      console.log(resp.data!);
      saveDataCitasVigentes( resp.data );
  }
  
  return (    
    <Layout 
      style={{flex: 1, backgroundColor: globalColors.white}}
    >
      {
        dataCitasvigentes === undefined
        ? (<FullScreenLoader/>)
        : (
            <>
              <HamburgerMenu />                  
              <CanalCradSlider/>                  
              <CitasCardScrollHorizontal/>
              <ButtonsMenu/>
              {/* <Layout>
                <Button
                  accessoryLeft={ <Icon name='log-out-outline'/> }
                  onPress={logout}
                >
                  Cerrar sesión
                </Button>
              </Layout> */}
            </>
          )
      }
    </Layout>
  )
}
