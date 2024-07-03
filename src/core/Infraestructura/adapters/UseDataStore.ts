import { create } from 'zustand';
import { PersonaCedulaDto } from '../../Aplicacion/Dto/PersonaCedulaDto';
import { CitasVigentesDto, Lstcitavigente } from '../../Aplicacion/Dto/CitasVigentesDto';
import { NucleosDto } from '../../Aplicacion/Dto/NucleosDto';
import { ResponseSelect } from '../../Dominio/Auth/Response/ResponseSelect';
import type { PersonaInformacionContactoDto, PersonaInformacionDto } from '../../Aplicacion/Dto/PersonaInformacionDto';
import { FechasDisponiblesDto } from '../../Aplicacion/Dto/FechasDisponiblesDto';
import { HorariosDisponiblesDto } from '../../Aplicacion/Dto/HorariosDisponiblesDto';
import { ServicioSecundario, ServiciosDisponiblesDto } from '../../Aplicacion/Dto/ServiciosDisponiblesDto';
import { EstablecimientosDisponiblesDto } from '../../Aplicacion/Dto/EstablecimientosDisponiblesDto';
import { MotivosDisponiblesDto } from '../../Aplicacion/Dto/MotivosDisponiblesDto';
import { PersonaDireccionResponse } from '../../Dominio/GestionPersona/Response/PersonaDireccionResponse';
import { UseStorage } from './UseStorage';


export interface DataState {
    code: number,
    message: string,
    removeDataCitasVigentes: () => Promise<void>,
    removeDataCitasVigentesNucleos: () => Promise<void>,
    removeDataPersona: () => Promise<void>,
    removeDataNucleos: () => Promise<void>,
    removeDataDireccion: () => Promise<void>,
    removeDataFechas: () => Promise<void>,
    removeDataSelect: () => Promise<void>,
    removeDataServicios: () => Promise<void>,
    removeDataServiciosSecundarios: () => Promise<void>,
    removeDataEstablecimientos: () => Promise<void>,
    removeDataMotivos: () => Promise<void>,
    removeDataHorarios: () => Promise<void>,
    dataPersona?: PersonaInformacionDto,
    saveDataPersona: ( persona?: PersonaInformacionDto ) => void,
    dataCitasvigentes?: CitasVigentesDto,    
    saveDataCitasVigentes: ( citas?: CitasVigentesDto ) => void,
    dataCitasvigentesNucleos?: CitasVigentesDto,
    saveDataCitasVigentesNucleos: ( citas?: CitasVigentesDto ) => void,
    dataCitaVigente?: Lstcitavigente,
    saveDataCitaVigente: ( cita?: Lstcitavigente ) => void,
    dataNucleos?: NucleosDto,
    saveDataNucleos: ( nucleos?: NucleosDto ) => void,
    dataDireccion?: PersonaDireccionResponse,
    saveDataDireccion: ( direccion?: PersonaDireccionResponse ) => void,
    dataServicios?: ServiciosDisponiblesDto,
    saveDataServicios: ( servicios?: ServiciosDisponiblesDto ) => void,
    dataServiciosSecundarios?: ServicioSecundario[],
    saveDataServiciosSecundarios: ( serviciosSecundarios?: ServicioSecundario[] ) => void,
    dataEstablecimientos?: EstablecimientosDisponiblesDto,
    saveDataEstablecimientos: ( establecimientos?: EstablecimientosDisponiblesDto ) => void,
    dataMotivos?: MotivosDisponiblesDto,
    saveDataMotivos: ( motivos?: MotivosDisponiblesDto ) => void,
    responseSelect?: ResponseSelect[],
    saveDataSelect: ( nucleos?: NucleosDto, persona?:  PersonaInformacionDto) => void,
    dataInfoPersona?:PersonaInformacionContactoDto,
    saveDateInfoPersona: (info?:PersonaInformacionContactoDto) => void,
    esDataActualizada: boolean,
    saveDataActualizada: (esDataActualizada: boolean) => void,
    disponibilidadFechas?: FechasDisponiblesDto,
    saveDisponibilidadFechas: ( fechas?: FechasDisponiblesDto ) => void,
    disponibilidadHorarios?: HorariosDisponiblesDto,
    saveDisponibilidadHorarios: ( fechas?: HorariosDisponiblesDto ) => void,
    removeDataStore: () => void,
}

export const useDataStore = create<DataState>((set, get) => ({
    code: 0,
    message: '',
    dataCitasvigentes: undefined,
    esDataActualizada: false,
    removeDataCitasVigentes: async () => {
        set({ dataCitasvigentes: undefined });
    },
    removeDataCitasVigentesNucleos: async () => {
        set({ dataCitasvigentesNucleos: undefined });
    },
    removeDataPersona: async () => {
        set({ dataPersona: undefined });
    },
    removeDataDireccion: async () => {
        set({ dataDireccion: undefined });
    },
    removeDataNucleos: async () => {
        set({ dataNucleos: undefined });
    },
    removeDataFechas: async () => {
        set({ disponibilidadFechas: undefined });
    },
    removeDataSelect: async () => {
        set({ responseSelect: undefined });
    },
    removeDataServicios: async () => {
        set({ dataServicios: undefined });
    },
    removeDataServiciosSecundarios: async () => {
        set({ dataServiciosSecundarios: undefined });
    },
    removeDataEstablecimientos: async () => {
        set({ dataEstablecimientos: undefined });
    },
    removeDataMotivos: async () => {
        set({ dataMotivos: undefined });
    },
    removeDataHorarios: async () => {
        set({ disponibilidadHorarios: undefined });
    },
    saveDataPersona( persona?: PersonaInformacionDto ) {
        set({ dataPersona: persona });
    },
    saveDataCitasVigentes( citas?: CitasVigentesDto ) {
        set({ dataCitasvigentes: citas });
    },
    saveDataCitasVigentesNucleos( citas?: CitasVigentesDto ) {
        set({ dataCitasvigentesNucleos: citas });
    },
    saveDataCitaVigente( cita?: Lstcitavigente ) {
        set({ dataCitaVigente: cita });
    },
    saveDataNucleos( nucleos?: NucleosDto ) {
        set({ dataNucleos: nucleos });
    },
    saveDataDireccion( direccion?: PersonaDireccionResponse ) {
        set({ dataDireccion: direccion });
    },
    saveDataServicios( servicios?: ServiciosDisponiblesDto ) {
        set({ dataServicios: servicios });
    },
    saveDataServiciosSecundarios( serviciosSecundarios?: ServicioSecundario[] ) {
        set({ dataServiciosSecundarios: serviciosSecundarios });
    },
    saveDataEstablecimientos( establecimientos?: EstablecimientosDisponiblesDto ) {
        set({ dataEstablecimientos: establecimientos });
    },
    saveDataMotivos( motivos?: MotivosDisponiblesDto ) {
        set({ dataMotivos: motivos });
    },
    saveDataSelect(data?: NucleosDto, persona?: PersonaCedulaDto) {
        if (!data) return;

        const transformedData: ResponseSelect[] = []; // Inicializa transformedData como un array vacío

        if (!persona) return;
        // Agrega el nuevo elemento al principio del array
        transformedData.unshift({ id: persona?.personaId, value: 'Para mí' }); // Reemplaza 'nuevoId' y 'Nuevo Valor' con tus valores deseados

        // Mapea el array data.nucleos para agregar los elementos restantes
        data?.nucleos.map((item: any) => {
            transformedData.push({
                id: item.personaId,
                value: `${item.primerNombre} ${item.primerApellido}, ${item.relacionFamiliar}`
            });
        });

        set({ responseSelect: transformedData });
    },
    saveDateInfoPersona(info?:PersonaInformacionContactoDto){
        set({dataInfoPersona:info})
    },
    saveDataActualizada(esDataActualizada: boolean) {
        set({ esDataActualizada });
    },
    saveDisponibilidadFechas( fechasDisponibles?: FechasDisponiblesDto ) {
        set({ disponibilidadFechas: fechasDisponibles });
    },
    saveDisponibilidadHorarios( horariosDisponibles?: HorariosDisponiblesDto ) {
        set({ disponibilidadHorarios: horariosDisponibles });
    },
    removeDataStore: () => {    
        UseStorage.removeAll();
    }
}));
