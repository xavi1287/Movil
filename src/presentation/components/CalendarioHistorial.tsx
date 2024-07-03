import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import CitasVigentesRepositorio from "../../modules/Citas/CitasVigentesRepositorio";
import { devuelveFechaEscrita, devuelveSoloFecha } from "../../shared/helpers";
import { globalColors } from "../theme/theme";
import { CitaCardList } from "./CitaCardList";
import { Lstcitavigente } from "../../core/Dominio/Agendamiento/Response/CitasVigentesResponse";

LocaleConfig.locales['es'] = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
    today: "Hoy"
};

LocaleConfig.defaultLocale = 'es';

interface Props {
    personaId: number;
}

declare type DotsCalendario = {
    key?: string;
    color: string;
    selectedDotColor?: string;
};

declare type DataCalendario = {
    [fecha: string]: {
        selected: boolean;
        marked: boolean;
        dots: DotsCalendario[]
    };
}

export const CalendarioHistorial = ({ personaId }:Props) => {

    useEffect(() => {
        obtenerHistorialCitas();
    }, [personaId]);

    const [isLoadingCalendar, setIsLoadingCalendar] = useState(false)
    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    let [citasCalendario, setCitasCalendario] = useState<DataCalendario>({});
    const [citasUsuario, setCitasUsuario] = useState<Lstcitavigente[]>([]);
    const [citasDiaSeleccionado, setCitasDiaSeleccionado] = useState<Lstcitavigente[]>([]);

    const limpiarDatos = () => {
        setDiaSeleccionado('');
        setCitasCalendario({});
        setCitasUsuario([]);
        setCitasDiaSeleccionado([]);
    }

    const obtenerHistorialCitas = async() => {

        limpiarDatos();
        setIsLoadingCalendar(true);
        const repositorio = new CitasVigentesRepositorio();
        const resp = await repositorio.obtenerHistorialCitas( personaId );
        
        if ( !resp.isSuccessful || !resp.data || resp.data.lstcitavigente.length <= 0  ) {
            setIsLoadingCalendar(false);
            return;
        }
        
        setCitasUsuario( resp.data.lstcitavigente );
        const data = formateaDataCitas( resp.data.lstcitavigente );
        setCitasCalendario(data);
        setIsLoadingCalendar(false);

    }

    const formateaDataCitas = ( citas: Lstcitavigente[] ): DataCalendario => {

        const dataCalendario: DataCalendario = {};

        citas.forEach(cita => {

            const fecha = devuelveSoloFecha( new Date(cita.fechahoraprogramada) );
            const citaid = cita.citaid.toString();
        
            if (fecha in dataCalendario) {
                dataCalendario[fecha].dots.push({ key: citaid, color: 'grey', selectedDotColor: 'white' });
            } else {
                dataCalendario[fecha] = {
                    selected: false,
                    marked: false,
                    dots: [{ key: citaid, color: 'grey', selectedDotColor: 'white' }]
                };
            }            
        
        });

        return dataCalendario;

    }

    const cambiaDiaSeleccionado = ( dia: DateData ) => {

        const fecha = dia.dateString;

        setDiaSeleccionado(fecha);

        for (const key in citasCalendario) {
            if (Object.prototype.hasOwnProperty.call(citasCalendario, key)) {
                if (key === fecha) {
                    citasCalendario[key].selected = true;
                } else {
                    citasCalendario[key].selected = false;
                }
            }
        }

        setCitasCalendario(citasCalendario);
        verificaCitasDiasSeleccionado( fecha );
    }

    const verificaCitasDiasSeleccionado = ( fecha: string ) => {

        const citasFiltradas = citasUsuario.filter(cita => devuelveSoloFecha( new Date(cita.fechahoraprogramada)) === fecha);
    
        if ( citasFiltradas.length <= 0 ) {
            setCitasDiaSeleccionado([]);
            return;
        }

        setCitasDiaSeleccionado( citasFiltradas );
    }

    return (
        <View style={{ flex: 1 }}>
            <Calendar
                hideArrows={ true }
                displayLoadingIndicator={ isLoadingCalendar }
                onDayPress={day => {
                    cambiaDiaSeleccionado(day);
                }}
                markingType={ 'multi-dot' }
                markedDates={{
                    [diaSeleccionado]: { selected: true },
                    ...citasCalendario
                }}
                theme={{
                    selectedDayTextColor: 'white',
                    selectedDayBackgroundColor: '#4285F4',
                }}
            />

            <View style={ styles.contenedorCitas }>

                {
                    citasDiaSeleccionado.length > 0 &&
                    (
                        <>
                            <Text style={ styles.textoFecha } >
                                { devuelveFechaEscrita(diaSeleccionado) }
                            </Text>

                            <CitaCardList lstCitas={ citasDiaSeleccionado } />
                        </>
                    )
                }

            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    contenedorCitas: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 30,
    },
    textoFecha: {
        color: globalColors.darkSmoke,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
});