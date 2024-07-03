import { UriCita, UrlBase } from "@env";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { GuardarCitaRequest } from "../../core/Dominio/Agendamiento/Request/GuardarCitaRequest";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { GuardarCitaDto } from "../../core/Aplicacion/Dto/GuardarCitaDto";
import { GuardarCitaResponse } from "../../core/Dominio/Agendamiento/Response/GuardarCitaResponse";
import { IGuardarCitaRepositorio } from "../../core/Aplicacion/Contratos/Citas/IGuardarCitaRepositorio";

export default class GuardarCitaRepositorio implements IGuardarCitaRepositorio {
    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    guardarCita = async (
        guardarCitaRequest: GuardarCitaRequest
    ): Promise<ResponseGlobal<GuardarCitaDto>> => 
    {
        try {
            
            const response = await this.apiCliente.post<GuardarCitaResponse>(UriCita, guardarCitaRequest);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<GuardarCitaDto>;
            }

            return this.returnGuardarCita( response );
            
        } catch (error) {
            throw new Error("Error en método Guardar Cita");
        }
    }

    private returnGuardarCita = (object: ResponseGlobal<GuardarCitaResponse> ) : ResponseGlobal<GuardarCitaDto> => {

        const guardarCita: GuardarCitaResponse = {
            citaId: object.data!.citaId,
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<GuardarCitaDto> = {
            code: 200,
            message: '',
            data: guardarCita,
            isSuccessful: true,
        }

        return resp;

    }
}