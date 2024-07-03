import { UriDisponibilidadMotivos, UrlBase } from "@env";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { MotivosDisponiblesRequest } from "../../core/Dominio/Agendamiento/Request/MotivosDisponiblesRequest";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { Motivo, MotivosDisponiblesDto, Opcion } from "../../core/Aplicacion/Dto/MotivosDisponiblesDto";
import { MotivosDisponiblesResponse } from "../../core/Dominio/Agendamiento/Response/MotivosDisponiblesResponse";
import { IDisponibilidadMotivosRepositorio } from "../../core/Aplicacion/Contratos/Citas/IDisponibilidadMotivosRepositorio";


export default class DisponibilidadMotivosRepositorio implements IDisponibilidadMotivosRepositorio {
    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    disponibilidadMotivos = async (
        motivosRequest: MotivosDisponiblesRequest
    ): Promise<ResponseGlobal<MotivosDisponiblesDto>> => 
    {
        try {
            
            const response = await this.apiCliente.post<MotivosDisponiblesResponse>(UriDisponibilidadMotivos, motivosRequest);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<MotivosDisponiblesDto>;
            }

            return this.returnDisponibilidadMotivos( response );
            
        } catch (error) {
            throw new Error("Error en método Disponibilidad de Establecimientos");
        }
    }

    private returnDisponibilidadMotivos = (object: ResponseGlobal<MotivosDisponiblesResponse> ) : ResponseGlobal<MotivosDisponiblesDto> => {

        const motivos: MotivosDisponiblesDto = {
            lstMotivos: object.data!.lstMotivos.map((motivo: Motivo) => ({
                citaMotivoId: motivo.citaMotivoId,
                nombre: motivo.nombre,
                descripcion: motivo.descripcion,
                lstOpciones:  motivo.lstOpciones.map((opcion: Opcion) => ({
                    opcion: opcion.opcion,
                    citaMotivoId: opcion.citaMotivoId,
                    nombre: opcion.nombre,
                }))
            })),
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<MotivosDisponiblesDto> = {
            code: 200,
            message: '',
            data: motivos,
            isSuccessful: true,
        }

        return resp;

    }
}