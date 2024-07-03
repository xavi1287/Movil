import { UriDisponibilidadFechas, UrlBase } from "@env";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { FechasDisponiblesRequest } from "../../core/Dominio/Agendamiento/Request/FechasDisponiblesRequest";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { FechasDisponiblesDto } from "../../core/Aplicacion/Dto/FechasDisponiblesDto";
import { FechasDisponiblesResponse } from "../../core/Dominio/Agendamiento/Response/FechasDisponiblesResponse";
import { IDisponibilidadFechasRepositorio } from "../../core/Aplicacion/Contratos/Citas/IDisponibilidadFechasRepositorio";

export default class DisponibilidadFechasRepositorio implements IDisponibilidadFechasRepositorio {
    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    disponibilidadFechas = async (
            fechasRequest: FechasDisponiblesRequest
        ): Promise<ResponseGlobal<FechasDisponiblesDto>> => 
    {
        try {
            
            const response = await this.apiCliente.post<FechasDisponiblesResponse>(UriDisponibilidadFechas, fechasRequest);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<FechasDisponiblesDto>;
            }

            return this.returnDisponibilidadFechas( response );
            
        } catch (error) {
            throw new Error("Error en método Disponibilidad de Fechas");
        }
    }
    private returnDisponibilidadFechas = (object: ResponseGlobal<FechasDisponiblesResponse> ) : ResponseGlobal<FechasDisponiblesDto> => {

        const disponibilidadFechas: FechasDisponiblesResponse = {
            fechas: object.data!.fechas,
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<FechasDisponiblesDto> = {
            code: 200,
            message: '',
            data: disponibilidadFechas,
            isSuccessful: true,
        }

        return resp;

    }
}