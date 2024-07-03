import { Layout, Text } from '@ui-kitten/components'
import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { CanGoBackHeader } from '../../components/shared/CanGoBackHeader'
import { agendarStyles } from '../../theme/Agendar/agendarStyles'
import { useDataStore } from '../../../core/Infraestructura/adapters/UseDataStore'
import { SelectList } from 'react-native-dropdown-select-list'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import NucleosRepositorio from '../../../modules/GestionPersona/NucleosRepositorio'
import { ResponseSelect } from '../../../core/Dominio/Auth/Response/ResponseSelect'
import TypeInput from '../../components/TypeInput'
import DisponibilidadServiciosRepositorio from '../../../modules/Citas/DisponibilidadServiciosRepositorio'
import DisponibilidadEstablecimientosRepositorio from '../../../modules/Citas/DisponibilidadEstablecimientosRepositorio'
import { EstablecimientosDisponiblesRequest } from '../../../core/Dominio/Agendamiento/Request/EstablecimientosDisponiblesRequest'
import { reagendarStyles } from '../../theme/Agendar/reagendarStyles'
import { Establecimiento } from '../../../core/Aplicacion/Dto/EstablecimientosDisponiblesDto'
import PrimaryButton from '../../components/PrimaryButton'
import { FlatList, Linking, Pressable, View, useWindowDimensions } from 'react-native'
import DisponibilidadMotivosRepositorio from '../../../modules/Citas/DisponibilidadMotivosRepositorio'
import { MotivosDisponiblesRequest } from '../../../core/Dominio/Agendamiento/Request/MotivosDisponiblesRequest'
import DisponibilidadFechasRepositorio from '../../../modules/Citas/DisponibilidadFechasRepositorio'
import { FechasDisponiblesRequest } from '../../../core/Dominio/Agendamiento/Request/FechasDisponiblesRequest'
import moment from 'moment';
import 'moment/locale/es';  // Importa el idioma español
import { HorariosDisponiblesRequest } from '../../../core/Dominio/Agendamiento/Request/HorariosDisponiblesRequest'
import DisponibilidadHorariosRepositorio from '../../../modules/Citas/DisponibilidadHorariosRepositorio'
import { HorariosDisponiblesDto } from '../../../core/Aplicacion/Dto/HorariosDisponiblesDto'
import { ModalPopUp } from '../../components/ModalPopUp'
import { useUtils } from '../../hooks/useUtils'
import { GuardarCitaRequest } from '../../../core/Dominio/Agendamiento/Request/GuardarCitaRequest'
import GuardarCitaRepositorio from '../../../modules/Citas/GuardarCitaRepositorio'
import { RootTabParams } from '../../routes/BottomTabsNavigator'
import PersonaRepositorio from '../../../modules/GestionPersona/PersonaRepositorio'
import { LstPersonaDireccion } from '../../../core/Dominio/GestionPersona/Response/PersonaDireccionResponse'
import AnimatedLoading from '../../components/ui/AnimatedLoading'

// Configura moment para usar el idioma español
moment.locale('es');

export const AgendarCitaScreen = () => {

    const { width, height } = useWindowDimensions();

    const navigation = useNavigation<NavigationProp<RootTabParams>>();

    const [componente, setComponente] = useState<JSX.Element | null>(null);

    const nucleosRepositorio = new NucleosRepositorio();
    const serviciosRepositorio = new DisponibilidadServiciosRepositorio();
    const establecimientosRepositorio = new DisponibilidadEstablecimientosRepositorio();
    const motivosRepositorio = new DisponibilidadMotivosRepositorio();
    const disponibilidadFechasReagendar = new DisponibilidadFechasRepositorio();
    const disponibilidadHorariosReagendar = new DisponibilidadHorariosRepositorio();
    const guardarCita = new GuardarCitaRepositorio();
    const direccionRepositorio = new PersonaRepositorio();

    const [isLoading, setIsLoading] = useState(true)
    const [direccionSelected, setDireccionSelected] = useState<LstPersonaDireccion | null>(null);
    const [nucleoSelected, setNucleoSelected] = useState(null);
    const [servicioSelected, setServicioSelected] = useState(null);
    const [servicioMainSelected, setServicioMainSelected] = useState(null);
    const [servicioSecundarioSelected, setServicioSecundarioSelected] = useState(null);
    const [establecimientoSelected, setEstablecimientoSelected] = useState(null);
    const [estSelected, setEstSelected] = useState<Establecimiento | null>(null);
    const [motivoSelected, setMotivoSelected] = useState(null);
    const [selectedFecha, setSelectedFecha] = useState<string | null>(null);
    const [horariosManana, setHorariosManana] = useState<string[] | undefined>([]);
    const [horariosTarde, setHorariosTarde] = useState<string[] | undefined>([]);
    const [selectedHora, setSelectedHora] = useState<string | null>(null);
    const [tipoTitle, setTipoTitle] = useState('');
    const [isDisable, setSelectedIsDisable] = useState(false);
    const [isChangeServicio, setChangeServicio] = useState(true);
    const [tipoModal, setTipoModal] = useState('');

    const {
        dataPersona,
        saveDataSelect,
        responseSelect,
        removeDataSelect,
        removeDataDireccion,
        removeDataNucleos,
        removeDataServicios,
        removeDataEstablecimientos,
        removeDataMotivos,
        removeDataFechas,
        removeDataHorarios,
        removeDataServiciosSecundarios,
        saveDataNucleos,
        saveDataDireccion,
        dataServicios,
        saveDataServicios,
        dataServiciosSecundarios,
        saveDataServiciosSecundarios,
        dataEstablecimientos,
        saveDataEstablecimientos,
        dataMotivos,
        saveDataMotivos,
        disponibilidadFechas,
        saveDisponibilidadFechas,
        disponibilidadHorarios,
        saveDisponibilidadHorarios,
    } = useDataStore();

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true)
            obtenerNucleos();
        }, [])
    );

    const {
        abrirModal,
        cerrarModal,
        isModalVisible,
        mensajePopUp,
        setMensajePopUp
    } = useUtils();

    const obtenerNucleos = async () => {
        if (!dataPersona) {
            setIsLoading(false)
            return;
        }
        removeDataNucleos();
        removeDataSelect();
        removeDataServicios();
        removeDataEstablecimientos();
        removeDataServiciosSecundarios();
        removeDataFechas();
        removeDataHorarios();
        setEstablecimientoSelected(null);
        setServicioSecundarioSelected(null);
        setServicioSelected(null);
        setServicioMainSelected(null)
        setDireccionSelected(null);
        setMotivoSelected(null);
        setSelectedFecha(null);
        setHorariosManana([]);
        setHorariosTarde([]);
        setSelectedHora(null);
        setSelectedIsDisable(false);
        const resp = await nucleosRepositorio.obtenerNucleos(dataPersona?.personaId, 0);
        if (!resp.isSuccessful) {
            setIsLoading(false)
            return;
        }

        saveDataNucleos(resp.data);
        saveDataSelect(resp.data, dataPersona);
        setIsLoading(false)
    }

    const nucleos = responseSelect?.map(item => ({
        key: item.id.toString(), // Key debe ser un string
        value: item.value
    }));

    const obtenerDireccion = async () => {
        if (!nucleoSelected) { return; }
        removeDataDireccion();
        removeDataServicios();
        removeDataEstablecimientos();
        removeDataServiciosSecundarios();
        removeDataFechas();
        removeDataHorarios();
        setEstablecimientoSelected(null);
        setServicioSecundarioSelected(null);
        setServicioSelected(null);
        setServicioMainSelected(null);
        setDireccionSelected(null);
        setMotivoSelected(null);
        setSelectedFecha(null);
        setHorariosManana([]);
        setHorariosTarde([]);
        setSelectedHora(null);
        setSelectedIsDisable(false);


        const resp = await direccionRepositorio.obtenerPersonaDireccion(Number(nucleoSelected), 0);
        if (!resp.isSuccessful) {
            return;
        }

        setDireccionSelected(resp.data?.lstPersonaDireccion[0]!)
        saveDataDireccion(resp.data)
        obtenerServicios();
    }

    const obtenerServicios = async () => {
        if (!nucleoSelected) { return; }
        const resp = await serviciosRepositorio.obtenerServicios(Number(nucleoSelected), 0);
        if (!resp.isSuccessful) {
            return;
        }

        saveDataServicios(resp.data)
    }

    const servicios = dataServicios?.lstservicio.map(servicio => ({
        key: servicio.servicioId.toString(), // Key debe ser un string
        value: servicio.nombre
    }));

    const serviciosSecundarios = dataServiciosSecundarios?.map(servicioSecundario => ({
        key: servicioSecundario.servicioId.toString(), // Key debe ser un string
        value: servicioSecundario.nombre
    })) || [];

    const obtenerEstablecimientos = async () => {
        if (!servicioSelected) { return; }
        console.log(servicioSelected);
        removeDataEstablecimientos();
        setEstablecimientoSelected(null);
        setEstSelected(null);
        removeDataMotivos();
        removeDataFechas();
        removeDataHorarios();
        setMotivoSelected(null);
        setSelectedFecha(null);
        setHorariosManana([]);
        setHorariosTarde([]);
        setSelectedHora(null);
        setSelectedIsDisable(false);
        setEstSelected(null);

        if (Number(servicioSelected) === 0 && servicioSecundarioSelected === null) {
            setServicioMainSelected(servicioSelected);
            removeDataServiciosSecundarios();
            setServicioSecundarioSelected(null);
            removeDataEstablecimientos();
            setEstablecimientoSelected(null);
            if (!dataServicios) { return; }
            const servicioDiscapacidad = dataServicios.lstservicio.find(
                servicio => servicio.servicioId === 0
            );

            saveDataServiciosSecundarios(servicioDiscapacidad?.lstServicioSecundario);
        }
        else {
            console.log('Servicio Principal: ', servicioSelected);
            console.log('Servicio Secundario: ', servicioSecundarioSelected);
            console.log('Cambio Servicio: ', isChangeServicio);
            const servicioSecundarioExists = dataServiciosSecundarios?.some(item => item.servicioId === Number(servicioSelected));
            console.log(servicioSecundarioExists);
            let establecimientosRequest: EstablecimientosDisponiblesRequest;
            if (!servicioSecundarioExists) {
                if (servicioSecundarioSelected !== null && Number(servicioMainSelected) === 0 && isChangeServicio) {
                    console.log('L-243');
                    setServicioSelected(servicioSecundarioSelected);
                    establecimientosRequest = {
                        personaId: Number(nucleoSelected),
                        servicioId: servicioSecundarioSelected,
                        sesionId: 0
                    }
                } else {
                    removeDataServiciosSecundarios();
                    setServicioSecundarioSelected(null);
                    setChangeServicio(true);
                    establecimientosRequest = {
                        personaId: Number(nucleoSelected),
                        servicioId: servicioSelected,
                        sesionId: 0
                    }
                }
            } else {
                setServicioSelected(servicioSecundarioSelected);
                setChangeServicio(false);
                establecimientosRequest = {
                    personaId: Number(nucleoSelected),
                    servicioId: Number(servicioSecundarioSelected),
                    sesionId: 0
                }
            }


            const resp = await establecimientosRepositorio.disponibilidadEstablecimientos(establecimientosRequest);
            if (!resp.isSuccessful) {
                return;
            }

            saveDataEstablecimientos(resp.data)
        }
    }

    const establecimientos = dataEstablecimientos?.lstestablecimiento.map(establecimiento => ({
        key: establecimiento.establecimientoId.toString(), // Key debe ser un string
        value: establecimiento.nombreEstablecimiento
    })).slice(0, 5) || [];

    const obtenerEstablecimiento = async () => {
        console.log('Establecimiento: ', establecimientoSelected);
        removeDataMotivos();
        removeDataFechas();
        removeDataHorarios();
        setMotivoSelected(null);
        setSelectedFecha(null);
        setHorariosManana([]);
        setHorariosTarde([]);
        setSelectedHora(null);
        setSelectedIsDisable(false);
        setEstSelected(null);
        if (!establecimientoSelected) { return; }
        const establecimientoSeleccionado = dataEstablecimientos?.lstestablecimiento.find(x => x.establecimientoId === Number(establecimientoSelected));

        setEstSelected(establecimientoSeleccionado!);
        obtenerMotivos();
    }

    const obtenerMotivos = async () => {
        if (!servicioSelected || !establecimientoSelected) { return; }
        removeDataMotivos();
        setMotivoSelected(null);
        setSelectedFecha(null);
        const motivoRequest: MotivosDisponiblesRequest = {
            personaId: Number(nucleoSelected),
            servicioId: Number(servicioSelected),
            establecimientoId: Number(establecimientoSelected),
            sesionId: 0
        }

        const resp = await motivosRepositorio.disponibilidadMotivos(motivoRequest);
        if (!resp.isSuccessful) {
            return;
        }

        saveDataMotivos(resp.data)
    }

    const motivos = dataMotivos?.lstMotivos.map(motivo => ({
        key: motivo.citaMotivoId.toString(), // Key debe ser un string
        value: motivo.nombre
    })).slice(0, 5);

    const obtenerFechas = async () => {
        if (!servicioSelected || !establecimientoSelected || !motivoSelected) { return; }
        removeDataFechas();
        setSelectedFecha(null)
        removeDataHorarios();
        setHorariosManana([]);
        setHorariosTarde([]);
        setSelectedHora(null);
        setSelectedIsDisable(false);
        const fechasDisponiblesRequest: FechasDisponiblesRequest = {
            establecimientoId: Number(establecimientoSelected),
            citaMotivoId: Number(motivoSelected),
            personaId: Number(nucleoSelected),
            servicioId: Number(servicioSelected),
            sesionId: 0
        }

        const resp = await disponibilidadFechasReagendar.disponibilidadFechas(fechasDisponiblesRequest);
        if (!resp.isSuccessful) {
            return;
        }

        saveDisponibilidadFechas(resp.data)
    }

    const capitalizeFirstLetter = (diaNombre: string) => {
        return diaNombre.charAt(0).toUpperCase() + diaNombre.slice(1);
    };

    const obtenerHorarios = async (fechaSeleccionada: string) => {

        removeDataHorarios();
        setHorariosManana([]);
        setHorariosTarde([]);
        setSelectedHora(null);
        setSelectedIsDisable(false);
        if (!nucleoSelected || !servicioSelected || !establecimientoSelected || !motivoSelected || !fechaSeleccionada) { return; }
        const horariosDisponiblesRequest: HorariosDisponiblesRequest = {
            fecha: fechaSeleccionada,
            establecimientoId: Number(establecimientoSelected),
            citaMotivoId: Number(motivoSelected),
            personaId: Number(nucleoSelected),
            servicioId: Number(servicioSelected),
            sesionId: 0
        };

        const resp = await disponibilidadHorariosReagendar.disponibilidadHorarios(horariosDisponiblesRequest);
        if (!resp.isSuccessful) {
            return;
        };
        setSelectedFecha(fechaSeleccionada);

        if (resp.data) {
            saveDisponibilidadHorarios(resp.data)
            const { manana, tarde } = await separarPorHorario(resp.data);
            setHorariosManana(manana);
            setHorariosTarde(tarde);
        }
    };

    const separarPorHorario = async (horarios: HorariosDisponiblesDto) => {
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

    const newHora = (hora: string) => {
        const regex = /:00$/;
        return hora.replace(regex, "");
    };

    const saveHora = async (horaSeleccionada: string) => {
        setSelectedHora(horaSeleccionada);
        setSelectedIsDisable(true);
    };

    const handleAgendar = async () => {
        setTipoModal('confirmarAgendamiento');
        setTipoTitle('Agendar Cita');
        setMensajePopUp('¿Deseas agendar tu cita con los datos seleccionados?');
        abrirModal();
    }

    const agendarCita = async () => {
        setTipoModal('citaAgendada');
        const horario = disponibilidadHorarios?.horarios.find(x => x.hora === selectedHora);
        const guardarCitaRequest: GuardarCitaRequest = {
            pacienteId: Number(nucleoSelected),
            hora: selectedHora!,
            consultorioId: horario?.consultorioId!,
            duracion: horario?.duracion!,
            esReagenda: false,
            citaId: 0,
            fecha: selectedFecha!,
            establecimientoId: Number(establecimientoSelected),
            citaMotivoId: Number(motivoSelected),
            personaId: Number(nucleoSelected),
            servicioId: Number(servicioSelected),
            sesionId: 0
        }
        console.log(guardarCitaRequest);
        const resp = await guardarCita.guardarCita(guardarCitaRequest);
        if (!resp.isSuccessful) {
            setTipoTitle('Error al reagendar la Cita');
            setMensajePopUp(resp.message);
            abrirModal();
            return;
        } else {
            if (resp.data?.codigo === 11) {
                const consultorio = disponibilidadHorarios?.horarios.find(x => x.hora === selectedHora);
                const direccionUrl = `https://www.google.com/maps/dir/?api=1&query=${estSelected?.latitud},${estSelected?.longitud}`;

                setTipoTitle('Agendamiento Confirmado');
                let mensajeAgendar = `Se ha registrado la cita correctamente.` +
                    `Con el número de cita ${resp.data.citaId} para el ${selectedFecha} a las ${newHora(selectedHora!)} en el ` +
                    `Consultorio ${consultorio?.consultorioNombre}. Por favor, recuerde que debe asistir 30 minutos antes.`;
                if (servicioSecundarioSelected) {
                    mensajeAgendar += '\n\nRecuerde: Todo proceso de Calificación o Re-Calificación se lo realizara en el mismo Establecimientos de Salud.'
                }
                setMensajePopUp(mensajeAgendar);
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
        console.log(resp.data);
    };

    const clearParms = () => {
        removeDataNucleos();
        removeDataSelect();
        removeDataServicios();
        removeDataDireccion();
        removeDataEstablecimientos();
        removeDataMotivos();
        removeDataFechas();
        removeDataHorarios();
        setNucleoSelected(null);
        setDireccionSelected(null);
        setServicioSelected(null);
        setServicioMainSelected(null);
        setEstablecimientoSelected(null);
        setMotivoSelected(null);
        setHorariosManana(undefined);
        setHorariosTarde(undefined);
        setSelectedFecha(null);
        setSelectedHora(null);
        setSelectedIsDisable(false);
    }

    if (isLoading) {
        return <AnimatedLoading />
    }

    return (
        <Layout style={agendarStyles.containerAgendar}>
            <ScrollView style={agendarStyles.containerScrollView}>
                <CanGoBackHeader />
                <Text style={agendarStyles.titulosAgendar}>¿Para quién es esta cita?</Text>
                {
                    nucleos && (
                        <Layout style={{ marginBottom: 20 }}>
                            <SelectList
                                setSelected={setNucleoSelected}
                                data={nucleos}
                                save="key"
                                inputStyles={{ color: '#828282' }}
                                boxStyles={{ backgroundColor: '#F5F4F4' }}
                                dropdownTextStyles={{ color: '#828282' }}
                                placeholder='Seleccione a una persona'
                                searchPlaceholder='Buscar'
                                onSelect={obtenerDireccion}
                            />
                        </Layout>
                    )
                }
                {
                    direccionSelected && servicios && (
                        <>
                            <TypeInput
                                heightContariner={110}
                                label="Ciudad"
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
                                label="Zona"
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
                            <Text style={[agendarStyles.titulosAgendar, { marginBottom: 10 }]}>Selecciona un servicio</Text>
                            <Layout style={{ marginBottom: 20 }}>
                                <SelectList
                                    setSelected={setServicioSelected}
                                    data={servicios}
                                    save="key"
                                    inputStyles={{ color: '#828282' }}
                                    boxStyles={{ backgroundColor: '#F5F4F4' }}
                                    dropdownTextStyles={{ color: '#828282' }}
                                    placeholder='Seleccione un servicio'
                                    searchPlaceholder='Buscar'
                                    onSelect={obtenerEstablecimientos}
                                />
                            </Layout>
                        </>
                    )
                }
                {
                    serviciosSecundarios.length > 0 && (
                        <>
                            <Text style={agendarStyles.mensajeDiscapacidad}>
                                <Text style={agendarStyles.negrita}>Recuerde: </Text>
                                para avanzar con el proceso de Calificación o Re-Calificación, no olvide que debe tomar un turno para Valoración Médica. Para Ayudas Técnicas usted debe estar acreditado como persona con discapacidad, no olvide llevar su documento de identidad. Por favor selecciona una opción:
                            </Text>
                            <Text style={[agendarStyles.titulosAgendar, { marginBottom: 10 }]}>Selecciona un servicio de discapacidad</Text>
                            <Layout style={{ marginBottom: 20 }}>
                                <SelectList
                                    setSelected={setServicioSecundarioSelected}
                                    data={serviciosSecundarios || []}
                                    save="key"
                                    inputStyles={{ color: '#828282' }}
                                    boxStyles={{ backgroundColor: '#F5F4F4' }}
                                    dropdownTextStyles={{ color: '#828282' }}
                                    placeholder='Seleccione un servicio de discapacidad'
                                    searchPlaceholder='Buscar'
                                    onSelect={obtenerEstablecimientos}
                                />
                            </Layout>
                        </>
                    )
                }
                {
                    establecimientos.length > 0 && (
                        <>
                            <Text style={[agendarStyles.titulosAgendar, { marginBottom: 10 }]}>Selecciona un establecimiento de salud</Text>
                            <Layout style={{ marginBottom: 20 }}>
                                <SelectList
                                    setSelected={setEstablecimientoSelected}
                                    data={establecimientos || []}
                                    save="key"
                                    inputStyles={{ color: '#828282' }}
                                    boxStyles={{ backgroundColor: '#F5F4F4' }}
                                    dropdownTextStyles={{ color: '#828282' }}
                                    placeholder='Seleccione un Establecimiento de Salud'
                                    searchPlaceholder='Buscar'
                                    onSelect={obtenerEstablecimiento}
                                />
                            </Layout>
                        </>
                    )
                }
                {
                    establecimientoSelected && (
                        <>
                            <Layout style={reagendarStyles.camposDataCompuesto}>
                                <Layout style={reagendarStyles.camposDataLeft}>
                                    <Text style={[agendarStyles.dataTexto, { fontSize: (8 + (width * 0.01)) }]}>
                                        <Text style={{ fontWeight: 'bold', color: '#828282', fontSize: (8 + (width * 0.01)) }}>Nombre: </Text>
                                        {estSelected?.nombreEstablecimiento!}
                                    </Text>
                                    <Text style={[agendarStyles.dataTexto, { fontSize: (8 + (width * 0.01)) }]}>
                                        <Text style={{ fontWeight: 'bold', color: '#828282', fontSize: (8 + (width * 0.01)) }}>Dirección: </Text>
                                        {estSelected?.direccion!}
                                    </Text>
                                </Layout>
                                <Layout style={reagendarStyles.camposDataRight}>
                                    <PrimaryButton
                                        label="Cómo llegar"
                                        buttonColor="#265170"
                                        appearance="filled"
                                        whithPercentaje="90%"
                                        height={42}
                                        nameIcon="arrow-forward-outline"
                                        colorIcon="color-primary-100"
                                        showIcon={false}
                                        textColor={'white'}
                                        textSize={12}
                                        onPress={() => {
                                            const latitude = estSelected?.latitud; // Assuming 'latitud' is your latitude property
                                            const longitude = estSelected?.longitud; // Assuming 'longitud' is your longitude property
                                            const url = `https://www.google.com/maps/dir/?api=1&query=${latitude},${longitude}`; // Construct the Google Maps URL
                                            Linking.openURL(url); // Open the URL using Linking
                                        }}
                                    />
                                </Layout>
                            </Layout>
                            <Text style={[agendarStyles.titulosAgendar, { marginBottom: 10 }]}>Selecciona un motivo</Text>
                            <Layout style={{ marginBottom: 20 }}>
                                <SelectList
                                    setSelected={setMotivoSelected}
                                    data={motivos!}
                                    save="key"
                                    inputStyles={{ color: '#828282' }}
                                    boxStyles={{ backgroundColor: '#F5F4F4' }}
                                    dropdownTextStyles={{ color: '#828282' }}
                                    placeholder='Seleccione un motivo'
                                    searchPlaceholder='Buscar'
                                    onSelect={obtenerFechas}
                                />
                            </Layout>
                        </>
                    )
                }
                {
                    motivoSelected && (
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
                                                onPress={() => obtenerHorarios(item)}
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
                                keyExtractor={(item) => item}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={
                                    ({ item }) => {
                                        const isSelected = item === selectedHora;
                                        return (
                                            <Layout
                                                style={[
                                                    reagendarStyles.horaContainer,
                                                    isSelected ? reagendarStyles.selected : reagendarStyles.unselected,
                                                ]}
                                            >
                                                <Pressable onPress={() => saveHora(item)}>
                                                    <Text style={[
                                                        reagendarStyles.label,
                                                        isSelected ? { color: '#fff' } : { color: '#000' },
                                                        {
                                                            textAlign: 'center',
                                                            margin: 0,
                                                            paddingTop: 8,
                                                            fontSize: 12
                                                        }
                                                    ]}
                                                    >{newHora(item)}
                                                    </Text>
                                                </Pressable>
                                            </Layout>
                                        )
                                    }
                                }
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
                                        <View style={[
                                            reagendarStyles.horaContainer,
                                            isSelected ? reagendarStyles.selected : reagendarStyles.unselected,
                                        ]}>
                                            <Pressable onPress={() => saveHora(item)}>
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
                                        </View>
                                    )
                                }}
                            />
                        </>
                    )
                }
                {
                    isDisable && (
                        <PrimaryButton
                            label="Agendar"
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
                <Layout style={{ height: 100 }}></Layout>

                {
                    tipoModal === 'confirmarAgendamiento' && (
                        <ModalPopUp
                            titulo={tipoTitle}
                            isModalVisible={isModalVisible}
                            descripcion={mensajePopUp}
                            esModalConfirmacion={true}
                            onCancel={() => { cerrarModal(); }}
                            onConfirm={agendarCita}
                        />
                    )}
                {tipoModal === 'citaAgendada' && (
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
