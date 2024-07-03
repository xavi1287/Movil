import { EstablecimientosDisponiblesRequest } from "../../../Dominio/Agendamiento/Request/EstablecimientosDisponiblesRequest";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { EstablecimientosDisponiblesDto } from "../../Dto/EstablecimientosDisponiblesDto";


export interface IDisponibilidadEstablecimientosRepositorio {
    disponibilidadEstablecimientos(
        fechasRequest: EstablecimientosDisponiblesRequest    
    ): Promise<ResponseGlobal<EstablecimientosDisponiblesDto>>;
}