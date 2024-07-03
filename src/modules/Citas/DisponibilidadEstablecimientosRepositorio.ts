import { UriDisponibilidadEstablecimientos, UrlBase } from "@env";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { EstablecimientosDisponiblesRequest } from "../../core/Dominio/Agendamiento/Request/EstablecimientosDisponiblesRequest";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { Establecimiento, EstablecimientosDisponiblesDto } from "../../core/Aplicacion/Dto/EstablecimientosDisponiblesDto";
import { EstablecimientosDisponiblesResponse } from "../../core/Dominio/Agendamiento/Response/EstablecimientosDisponiblesResponse";
import { IDisponibilidadEstablecimientosRepositorio } from "../../core/Aplicacion/Contratos/Citas/IDisponibilidadEstablecimientosRepositorio";


export default class DisponibilidadEstablecimientosRepositorio implements IDisponibilidadEstablecimientosRepositorio {
    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }
    disponibilidadEstablecimientos = async (
        establecimientosRequest: EstablecimientosDisponiblesRequest
    ): Promise<ResponseGlobal<EstablecimientosDisponiblesDto>> => 
    {
        try {
            
            const response = await this.apiCliente.post<EstablecimientosDisponiblesResponse>(UriDisponibilidadEstablecimientos, establecimientosRequest);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<EstablecimientosDisponiblesDto>;
            }

            return this.returnDisponibilidadEstablecimientos( response );
            
        } catch (error) {
            throw new Error("Error en método Disponibilidad de Establecimientos");
        }
    }

    private returnDisponibilidadEstablecimientos = (object: ResponseGlobal<EstablecimientosDisponiblesResponse> ) : ResponseGlobal<EstablecimientosDisponiblesDto> => {

        const establecimientos: EstablecimientosDisponiblesDto = {
            lstestablecimiento: object.data!.lstestablecimiento.map((establecimiento: Establecimiento) => ({
                establecimientoId: establecimiento.establecimientoId,
                nombreEstablecimiento: establecimiento.nombreEstablecimiento,
                esAdscrito: establecimiento.esAdscrito,
                direccion: establecimiento.direccion,
                latitud: establecimiento.latitud,
                longitud: establecimiento.longitud
            })),
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<EstablecimientosDisponiblesDto> = {
            code: 200,
            message: '',
            data: establecimientos,
            isSuccessful: true,
        }

        return resp;

    }
}