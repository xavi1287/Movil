import { UriDeleteCita, UrlBase } from "@env";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { DeleteCitaDto } from "../../core/Aplicacion/Dto/DeleteCitaDto";
import { DeleteCitaResponse } from "../../core/Dominio/Agendamiento/Response/DeleteCitaResponse";
import { IDeleteCitaRepositorio } from "../../core/Aplicacion/Contratos/Citas/IDeleteCitaRepositorio";


export default class DeleteCitaRepositorio implements IDeleteCitaRepositorio {
    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    deleteCita = async (
        personaCitaId: number, 
        sesionId: number): Promise<ResponseGlobal<DeleteCitaDto>> => 
    {
        try {
            
            const response = await this.apiCliente.delete<DeleteCitaResponse>(`${UriDeleteCita}/${personaCitaId}/${sesionId}`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<DeleteCitaDto>;
            }

            return this.returnDataDeleteCita( response );
            
        } catch (error) {
            throw new Error("Error en método Eliminar Citas");
        }
    }

    private returnDataDeleteCita = (object: ResponseGlobal<DeleteCitaResponse> ) : ResponseGlobal<DeleteCitaDto> => {

        const deleteCita: DeleteCitaDto = {
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<DeleteCitaDto> = {
            code: 200,
            message: '',
            data: deleteCita,
            isSuccessful: true,
        }

        return resp;

    }
}