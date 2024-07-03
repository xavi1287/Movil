import { Layout, Text } from '@ui-kitten/components'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CanGoBackHeader } from '../../components/shared/CanGoBackHeader'
import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { RootTabParams } from '../../routes/BottomTabsNavigator';
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore';
import { Lstcitavigente } from '../../../core/Aplicacion/Dto/CitasVigentesDto';
import { reagendarStyles } from '../../theme/Agendar/reagendarStyles';
import { Nucleo } from '../../../core/Aplicacion/Dto/NucleosDto';
import TypeInput from '../../components/TypeInput';
import { ScrollView } from 'react-native-gesture-handler';
import { agendarStyles } from '../../theme/Agendar/agendarStyles';
import PrimaryButton from '../../components/PrimaryButton';
import { FlatList, Linking, Pressable, View, useWindowDimensions } from 'react-native';
import DisponibilidadFechasRepositorio from '../../../modules/Citas/DisponibilidadFechasRepositorio';
import { FechasDisponiblesRequest } from '../../../core/Dominio/Agendamiento/Request/FechasDisponiblesRequest';
import moment from 'moment';
import 'moment/locale/es';  // Importa el idioma español
import DisponibilidadHorariosRepositorio from '../../../modules/Citas/DisponibilidadHorariosRepositorio';
import { HorariosDisponiblesRequest } from '../../../core/Dominio/Agendamiento/Request/HorariosDisponiblesRequest';
import GuardarCitaRepositorio from '../../../modules/Citas/GuardarCitaRepositorio';
import { GuardarCitaRequest } from '../../../core/Dominio/Agendamiento/Request/GuardarCitaRequest';
import { HorariosDisponiblesDto } from '../../../core/Aplicacion/Dto/HorariosDisponiblesDto';
import { useUtils } from '../../hooks/useUtils';
import { ModalPopUp } from '../../components/ModalPopUp';
import { LstPersonaDireccion } from '../../../core/Dominio/GestionPersona/Response/PersonaDireccionResponse';
import PersonaRepositorio from '../../../modules/GestionPersona/PersonaRepositorio';
import AnimatedLoading from '../../components/ui/AnimatedLoading';

// Configura moment para usar el idioma español
moment.locale('es');

type ReagendarCitaScreenRouteProp = RouteProp<RootTabParams, 'Reagendar'>;

export const ReagendarCitaScreen = () => {

  const { width, height } = useWindowDimensions();

  const navigation = useNavigation<NavigationProp<RootTabParams>>();
  const [componente, setComponente] = useState<JSX.Element | null>(null);
  const route = useRoute<ReagendarCitaScreenRouteProp>();
  const disponibilidadFechasReagendar = new DisponibilidadFechasRepositorio();
  const disponibilidadHorariosReagendar = new DisponibilidadHorariosRepositorio();
  const guardarCita = new GuardarCitaRepositorio();
  const direccionRepositorio = new PersonaRepositorio();

  const { personaId, citaId } = route.params;
  const {
    dataCitasvigentes,
    dataCitaVigente,
    removeDataCitasVigentes,
    removeDataFechas,
    dataNucleos,
    dataPersona,
    saveDisponibilidadFechas,
    disponibilidadFechas,
    saveDisponibilidadHorarios,
    disponibilidadHorarios,
    dataDireccion,
    saveDataDireccion,
  } = useDataStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isDisable, setSelectedIsDisable] = useState(false);
  const [direccionSelected, setDireccionSelected] = useState<LstPersonaDireccion | null>(null);
  const [horariosManana, setHorariosManana] = useState<string[] | undefined>([]);
  const [horariosTarde, setHorariosTarde] = useState<string[] | undefined>([]);
  const [selectedCita, setSelectedCita] = useState<Lstcitavigente | undefined>(undefined);
  const [selectedNucleo, setSelectedNucleo] = useState<Nucleo | null>(null);
  const selectedNucleoRef = useRef<Nucleo | null>(null);
  const [selectedFecha, setSelectedFecha] = useState('');
  const [selectedHora, setSelectedHora] = useState('');
  const [tipoTitle, setTipoTitle] = useState('');
  const [tipoModal, setTipoModal] = useState('');

  const {
    abrirModal,
    cerrarModal,
    isModalVisible,
    mensajePopUp,
    setMensajePopUp
  } = useUtils();

  const initializeData = useCallback(async () => {
    setIsLoading(true);
    if (dataNucleos?.nucleos) {
      const nucleo = dataNucleos.nucleos.find(y => y.personaId === personaId);

      if (nucleo) {
        setSelectedNucleo(nucleo);
        // Esperar a que el estado se actualice
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    await obtenerData();
    setIsLoading(false);
  }, [dataNucleos, personaId]);

  const obtenerData = useCallback(async () => {

    const cita = dataCitasvigentes?.lstcitavigente.find(x => x.citaid === citaId);

    if (cita) {
      let fechasDisponiblesRequest: FechasDisponiblesRequest;

      setSelectedCita(cita);

      if (selectedNucleo) {
        fechasDisponiblesRequest = {
          establecimientoId: cita?.establecimientoSaludid,
          citaMotivoId: cita?.citaMotivoId,
          personaId: selectedNucleo.personaId,
          servicioId: cita?.servicioid,
          sesionId: 0
        }
      } else {
        fechasDisponiblesRequest = {
          establecimientoId: cita?.establecimientoSaludid,
          citaMotivoId: cita?.citaMotivoId,
          personaId: personaId,
          servicioId: cita?.servicioid,
          sesionId: 0
        }
      }
      await obtenerDireccion();

      const resp = await disponibilidadFechasReagendar.disponibilidadFechas(fechasDisponiblesRequest);
      if (!resp.isSuccessful) {
        return;
      }

      saveDisponibilidadFechas(resp.data);
    }
  }, [selectedNucleo, dataCitasvigentes, citaId, personaId]);

  useFocusEffect(
    useCallback(() => {
      if (personaId && citaId) {
        initializeData();
      }
    }, [personaId, citaId, initializeData])
  );

  const obtenerDireccion = async () => {

    const resp = await direccionRepositorio.obtenerPersonaDireccion(personaId, 0);
    if (!resp.isSuccessful) {
      return;
    }

    setDireccionSelected(resp.data?.lstPersonaDireccion[0]!)
    saveDataDireccion(resp.data)
  }

  const capitalizeFirstLetter = (diaNombre: string) => {
    return diaNombre.charAt(0).toUpperCase() + diaNombre.slice(1);
  };


  const obtenerHorarios = async (fechaSeleccionada: string) => {
    setSelectedFecha(fechaSeleccionada);
    const horariosDisponiblesRequest: HorariosDisponiblesRequest = {
      fecha: fechaSeleccionada,
      establecimientoId: selectedCita?.establecimientoSaludid!,
      citaMotivoId: selectedCita?.citaMotivoId!,
      personaId: personaId,
      servicioId: selectedCita?.servicioid!,
      sesionId: 0
    };
    const resp = await disponibilidadHorariosReagendar.disponibilidadHorarios(horariosDisponiblesRequest);
    if (!resp.isSuccessful) {
      return;
    };

    saveDisponibilidadHorarios(resp.data)
    const { manana, tarde } = separarPorHorario(resp.data!);

    setHorariosManana(manana);
    setHorariosTarde(tarde);
  };

  const separarPorHorario = (horarios: HorariosDisponiblesDto) => {
    const manana: string[] = [];
    const tarde: string[] = [];

    horarios.horarios.forEach((horario) => {
      const [horas, minutos, segundos] = horario.hora.split(':').map(Number);
      if (horas < 13) {
        manana.push(horario.hora);
      } else {
        tarde.push(horario.hora);
      }
    });

    return {
      manana,
      tarde,
    };
  };

  const saveHora = async (horaSeleccionada: string) => {
    setSelectedHora(horaSeleccionada);
    setSelectedIsDisable(true);
  };

  const handleAgendar = async () => {
    setTipoModal('confirmarReagendamiento');
    setTipoTitle('Reagendar Cita');
    setMensajePopUp('¿Deseas reagendar tu cita con los datos seleccionados?');
    abrirModal();
  }

  const newHora = (hora: string) => {
    const regex = /:00$/;
    return hora.replace(regex, "");
  };

  const clearParms = async () => {
    setSelectedNucleo(null);
    setDireccionSelected(null);
    removeDataCitasVigentes();
    removeDataFechas();
    setHorariosManana(undefined);
    setHorariosTarde(undefined);
    setSelectedFecha('');
    setSelectedHora('');
    setSelectedIsDisable(false);
  }

  const reagendarCita = async () => {
    setTipoModal('citaReagendada');
    const horario = disponibilidadHorarios?.horarios.find(x => x.hora === selectedHora);
    const guardarCitaRequest: GuardarCitaRequest = {
      pacienteId: personaId,
      hora: selectedHora,
      consultorioId: horario?.consultorioId!,
      duracion: horario?.duracion!,
      esReagenda: true,
      citaId: selectedCita?.citaid!,
      fecha: selectedFecha,
      establecimientoId: selectedCita?.establecimientoSaludid!,
      citaMotivoId: selectedCita?.citaMotivoId!,
      personaId: personaId,
      servicioId: selectedCita?.servicioid!,
      sesionId: 0
    }

    const resp = await guardarCita.guardarCita(guardarCitaRequest);
    if (!resp.isSuccessful) {
      setTipoTitle('Error al reagendar la Cita');
      setMensajePopUp(resp.message);
      abrirModal();
      return;
    } else {

      if (resp.data?.codigo === 11) {
        const consultorio = disponibilidadHorarios?.horarios.find(x => x.hora === selectedHora);
        const direccionUrl = `https://www.google.com/maps/dir/?api=1&query=${selectedCita?.latitud},${selectedCita?.longitud}`;

        setTipoTitle('Reagendamiento Confirmado');
        setMensajePopUp(`Se ha registrado la cita correctamente.` +
          `Con el número de cita ${resp.data.citaId} para el ${selectedFecha} a las ${newHora(selectedHora)} en el ` +
          `Consultorio ${consultorio?.consultorioNombre}. Por favor, recuerde que debe asistir 30 minutos antes.`);
        const nuevoComponente = (
          <View>
            <Text style={{
              color: 'blue',
              width: '100%',
              textAlign: 'center',
              textDecorationLine: 'underline',
              marginTop: -10,
              marginBottom: 20,
            }} onPress={() => Linking.openURL(direccionUrl)}>Ver dirección.</Text>
          </View>
        );
        setComponente(nuevoComponente);
        abrirModal();
      } else {
        setTipoTitle('Alerta');
        setMensajePopUp(resp.data?.mensaje!);
        abrirModal();
      }
    };
  };

  if (isLoading) {
    return <AnimatedLoading />
  }

  return (
    <Layout style={reagendarStyles.container}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <CanGoBackHeader />
        {selectedNucleo ? (
          <TypeInput
            heightContariner={110}
            label="Nombres:"
            placeholder="1234567890"
            passwordText={false}
            nameIcon="person-outline"
            colorIcon="#828282"
            colorInput='#EDF4FF'
            showIcon={false}
            esDeshabilitado={true}
            tipo='default'
            value={`${selectedNucleo.primerNombre} ${selectedNucleo.primerApellido}`}
            onChangeText={() => console.log('Nombres')}
          />
        ) : (
          <TypeInput
            heightContariner={110}
            label="Nombres:"
            placeholder="1234567890"
            passwordText={false}
            nameIcon="person-outline"
            colorIcon="#828282"
            colorInput='#EDF4FF'
            showIcon={false}
            esDeshabilitado={true}
            tipo='default'
            value={dataPersona?.nombreCompleto}
            onChangeText={() => console.log('Nombres')}
          />
        )}
        {
          direccionSelected && (
            <>
              <TypeInput
                heightContariner={110}
                label="Ciudad:"
                placeholder="1234567890"
                passwordText={false}
                nameIcon="person-outline"
                colorIcon="#828282"
                colorInput='#EDF4FF'
                showIcon={false}
                esDeshabilitado={true}
                tipo='default'
                value={`${direccionSelected?.ciudad || ''}, ${direccionSelected?.provincia || ''}`}
                onChangeText={() => console.log('Ciudad')}
              />
              <TypeInput
                heightContariner={110}
                label="Zona:"
                placeholder="Zona"
                passwordText={false}
                nameIcon="person-outline"
                colorIcon="#828282"
                colorInput='#EDF4FF'
                showIcon={false}
                esDeshabilitado={true}
                tipo='default'
                value={`${direccionSelected?.zona || ''} - ${direccionSelected?.distrito || ''}`}
                onChangeText={() => console.log('Zona')}
              />
            </>

          )
        }
        {
          dataCitaVigente && (
            <>
              <TypeInput
                heightContariner={110}
                label="Servicio:"
                placeholder="1234567890"
                passwordText={false}
                nameIcon="person-outline"
                colorIcon="#828282"
                colorInput='#EDF4FF'
                showIcon={false}
                esDeshabilitado={true}
                tipo='default'
                value={dataCitaVigente?.nombreservicio}
                onChangeText={() => console.log('Ciudad')}
              />
              <Text style={reagendarStyles.label}>Establecimiento:</Text>
              <Layout style={reagendarStyles.camposDataCompuesto}>
                <Layout style={reagendarStyles.camposDataLeft}>
                  <Text style={[agendarStyles.dataTexto, { fontSize: (8 + (width * 0.01)) }]}>
                    <Text style={{ fontWeight: 'bold', color: '#828282', fontSize: (8 + (width * 0.01)) }}>Nombre: </Text>
                    {selectedCita?.nombreestablecimiento!}
                  </Text>
                  <Text style={[agendarStyles.dataTexto, { fontSize: (8 + (width * 0.01)) }]}>
                    <Text style={{ fontWeight: 'bold', color: '#828282', fontSize: (8 + (width * 0.01)) }}>Dirección: </Text>
                    {selectedCita?.direccion!}
                  </Text>
                </Layout>
                <Layout style={reagendarStyles.camposDataRight}>
                  <PrimaryButton
                    label="Cómo llegar"
                    buttonColor="#265170"
                    appearance="filled"
                    whithPercentaje="90%"
                    height={40}
                    nameIcon="arrow-forward-outline"
                    colorIcon="color-primary-100"
                    showIcon={false}
                    textColor={'white'}
                    textSize={12}
                    onPress={() => {
                      const latitude = selectedCita?.latitud; // Assuming 'latitud' is your latitude property
                      const longitude = selectedCita?.longitud; // Assuming 'longitud' is your longitude property
                      const url = `https://www.google.com/maps/dir/?api=1&query=${latitude},${longitude}`; // Construct the Google Maps URL
                      Linking.openURL(url); // Open the URL using Linking
                    }}
                  />
                </Layout>
              </Layout>
            </>

          )
        }
        {
          disponibilidadFechas && (
            <>
              <Text style={reagendarStyles.label}>Disponibilidad:</Text>
              <FlatList
                data={disponibilidadFechas?.fechas}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isSelected = item === selectedFecha;
                  return (
                    <Layout style={[reagendarStyles.fechaContainer,
                    isSelected ? reagendarStyles.selected : reagendarStyles.unselected,
                    ]}>
                      <Pressable
                        onPress={() => { obtenerHorarios(item) }}
                      >
                        <Text style={[
                          reagendarStyles.label,
                          isSelected ? { color: '#fff' } : { color: '#000' },
                          {
                            textAlign: 'center',
                            fontWeight: '400',
                            fontSize: 10,
                            marginTop: 8,
                            marginBottom: 0,
                          }
                        ]}>{capitalizeFirstLetter(moment(item).format('dddd'))}</Text>
                        <Text style={[
                          reagendarStyles.label,
                          isSelected ? { color: '#fff' } : { color: '#000' },
                          {
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 30,
                            marginBottom: 0,
                          }
                        ]}>{moment(item).format('D')}</Text>
                        <Text style={[
                          reagendarStyles.label,
                          isSelected ? { color: '#fff' } : { color: '#000' },
                          {
                            textAlign: 'center',
                            fontWeight: '400',
                            fontSize: 10,
                            marginBottom: 0,
                          }
                        ]}>{moment(item).format('MMM')}</Text>
                      </Pressable>
                    </Layout>
                  )
                }}
              />
            </>
          )
        }
        {
          horariosManana && horariosManana.length > 0 && (
            <>
              <Text style={reagendarStyles.label}>Horarios:</Text>
              <Text style={reagendarStyles.label}>Mañana:</Text>
              <FlatList
                data={horariosManana}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isSelected = item === selectedHora;
                  return (
                    <Layout style={[
                      reagendarStyles.horaContainer,
                      isSelected ? reagendarStyles.selected : reagendarStyles.unselected,
                    ]}>
                      <Pressable onPress={() => { saveHora(item) }}>
                        <Text style={[
                          reagendarStyles.label,
                          isSelected ? { color: '#fff' } : { color: '#000' },
                          {
                            textAlign: 'center',
                            margin: 0,
                            paddingTop: 8,
                            // color: '#828282',
                            fontSize: 12
                          }
                        ]}>{newHora(item)}</Text>
                      </Pressable>
                    </Layout>
                  )
                }}
              />
            </>

          )
        }
        {
          horariosTarde && horariosTarde.length > 0 && (
            <>
              <Text style={reagendarStyles.label}>Tarde:</Text>
              <FlatList
                data={horariosTarde}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isSelected = item === selectedHora;
                  return (
                    <Layout style={[
                      reagendarStyles.horaContainer,
                      isSelected ? reagendarStyles.selected : reagendarStyles.unselected,
                    ]}>
                      <Pressable onPress={() => { saveHora(item) }}>
                        <Text style={[
                          reagendarStyles.label,
                          isSelected ? { color: '#fff' } : { color: '#000' },
                          {
                            textAlign: 'center',
                            margin: 0,
                            paddingTop: 8,
                            // color: '#828282',
                            fontSize: 12
                          }
                        ]}>{newHora(item)}</Text>
                      </Pressable>
                    </Layout>
                  )
                }}
              />
            </>

          )
        }
        {
          isDisable && (
            <PrimaryButton
              label="Reagendar"
              buttonColor="#4285F4"
              appearance="filled"
              whithPercentaje="100%"
              height={60}
              nameIcon="arrow-forward-outline"
              colorIcon="color-primary-100"
              showIcon={false}
              textColor={'white'}
              textSize={18}
              onPress={handleAgendar}
            />
          )
        }

        {
          tipoModal === 'confirmarReagendamiento' && (
            <ModalPopUp
              titulo={tipoTitle}
              isModalVisible={isModalVisible}
              descripcion={mensajePopUp}
              esModalConfirmacion={true}
              onCancel={() => { cerrarModal(); }}
              onConfirm={reagendarCita}
            />
          )}
        {tipoModal === 'citaReagendada' && (
          <ModalPopUp
            titulo={tipoTitle}
            isModalVisible={isModalVisible}
            descripcion={mensajePopUp}
            componente={componente}
            onAcept={(() => {
              cerrarModal();
              clearParms();
              navigation.navigate('Home');
            })}
          />
        )
        }
      </ScrollView>
    </Layout>
  )
}
