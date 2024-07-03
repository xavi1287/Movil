import { UriDisponibilidadServicios, UrlBase } from "@env";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { Servicio, ServicioSecundario, ServiciosDisponiblesDto } from "../../core/Aplicacion/Dto/ServiciosDisponiblesDto";
import { ServiciosDisponiblesResponse } from "../../core/Dominio/Agendamiento/Response/ServiciosDisponiblesResponse";
import { IDisponibilidadServiciosRepositorio } from "../../core/Aplicacion/Contratos/Citas/IDisponibilidadServiciosRepositorio";


export default class DisponibilidadServiciosRepositorio implements IDisponibilidadServiciosRepositorio {

    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    obtenerServicios = async(
        personaId: number, 
        sesionId: number): Promise<ResponseGlobal<ServiciosDisponiblesDto>> => {
        try {

            const response = await this.apiCliente.get<ServiciosDisponiblesResponse>(`${UriDisponibilidadServicios}/${personaId}/${sesionId}`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<ServiciosDisponiblesDto>;
            }

            return this.returnDataServicios( response );
            
        } catch (error) {
            throw new Error("Error en método obtener Servicios");
        }
    }

    private returnDataServicios = (object: ResponseGlobal<ServiciosDisponiblesResponse> ) : ResponseGlobal<ServiciosDisponiblesDto> => {

        const servicios: ServiciosDisponiblesDto = {
            lstservicio: object.data!.lstservicio.map((servicio: Servicio) => ({
                servicioId: servicio.servicioId,
                nombre: servicio.nombre,
                mensaje: servicio.mensaje,
                lstServicioSecundario: servicio.lstServicioSecundario 
                    ? servicio.lstServicioSecundario.map((servicioSecundario: ServicioSecundario) => ({
                        servicioId: servicioSecundario.servicioId,
                        nombre: servicioSecundario.nombre,
                        mensaje: servicioSecundario.mensaje,
                        mensajeGuardadoCita: servicioSecundario.mensajeGuardadoCita || "",
                    }))
                    : undefined,
                mensajeGuardadoCita: servicio.mensajeGuardadoCita || "",
            })),
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<ServiciosDisponiblesDto> = {
            code: 200,
            message: '',
            data: servicios,
            isSuccessful: true,
        }

        return JSON.parse(JSON.stringify(resp));

    }
}