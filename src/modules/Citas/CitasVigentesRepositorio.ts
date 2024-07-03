import { UriCitasVigentes, UriHistorialCitas, UrlBase } from "@env";
import { CitasVigentesDto, Lstcitavigente } from "../../core/Aplicacion/Dto/CitasVigentesDto";
import { CitasVigentesResponse } from "../../core/Dominio/Agendamiento/Response/CitasVigentesResponse";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { ICitasVigentesRepositorio } from "../../core/Aplicacion/Contratos/Citas/ICitasVigentesRepositorio";

export default class CitasVigentesRepositorio implements ICitasVigentesRepositorio {

    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    obtenerCitasVigentes = async( 
        personaId: number, 
        personaPacienteId: number, 
        sesionId: number ) : Promise<ResponseGlobal<CitasVigentesDto>> => {
        
        try {

            const response = await this.apiCliente.get<CitasVigentesResponse>(`${UriCitasVigentes}/${personaId}/${personaPacienteId}/${sesionId}`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<CitasVigentesDto>;
            }

            return this.returnDataCitasVigentes( response );
            
        } catch (error) {
            throw new Error("Error en método obtener Citas Vigentes");
        }

    }

    private returnDataCitasVigentes = (object: ResponseGlobal<CitasVigentesResponse> ) : ResponseGlobal<CitasVigentesDto> => {

        const citasVigentes: CitasVigentesDto = {
            lstcitavigente: object.data!.lstcitavigente.map((cita: Lstcitavigente) => ({
                fechahoraprogramada: cita.fechahoraprogramada,
                nombreestablecimiento: cita.nombreestablecimiento,
                nombreservicio: cita.nombreservicio,
                citaid: cita.citaid,
                servicioid: cita.servicioid,
                citaMotivoId: cita.citaMotivoId,
                citaMotivo: cita.citaMotivo,
                establecimientoSaludid: cita.establecimientoSaludid,
                direccion: cita.direccion,
                latitud: cita.latitud,
                longitud: cita.longitud,
            })),
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<CitasVigentesDto> = {
            code: 200,
            message: '',
            data: citasVigentes,
            isSuccessful: true,
        }

        return resp;

    }

    obtenerHistorialCitas = async( usuarioId: number ): Promise<ResponseGlobal<CitasVigentesResponse>> => {

        try {

            const response = await this.apiCliente.get<CitasVigentesResponse>(`${UriHistorialCitas}/${usuarioId}/${usuarioId}/0`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<CitasVigentesResponse>;
            }

            return response;
            
        } catch (error) {
            throw new Error("Error en método obtenerHistorialCitas");
        }
        
    }
    
}