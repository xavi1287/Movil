import { MotivosDisponiblesRequest } from "../../../Dominio/Agendamiento/Request/MotivosDisponiblesRequest";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { MotivosDisponiblesDto } from "../../Dto/MotivosDisponiblesDto";


export interface IDisponibilidadMotivosRepositorio {
    disponibilidadMotivos(
        motivosRequest: MotivosDisponiblesRequest    
    ): Promise<ResponseGlobal<MotivosDisponiblesDto>>;
}