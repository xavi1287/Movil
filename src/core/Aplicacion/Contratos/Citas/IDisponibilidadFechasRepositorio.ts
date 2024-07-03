import { FechasDisponiblesRequest } from "../../../Dominio/Agendamiento/Request/FechasDisponiblesRequest";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { FechasDisponiblesDto } from "../../Dto/FechasDisponiblesDto";


export interface IDisponibilidadFechasRepositorio {
    disponibilidadFechas(
        fechasRequest: FechasDisponiblesRequest    
    ): Promise<ResponseGlobal<FechasDisponiblesDto>>;
}