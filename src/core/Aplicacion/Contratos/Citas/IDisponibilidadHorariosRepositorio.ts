import { HorariosDisponiblesRequest } from "../../../Dominio/Agendamiento/Request/HorariosDisponiblesRequest";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { HorariosDisponiblesDto } from "../../Dto/HorariosDisponiblesDto";


export interface IDisponibilidadHorariosRepositorio {
    disponibilidadHorarios(
        horariosRequest: HorariosDisponiblesRequest    
    ): Promise<ResponseGlobal<HorariosDisponiblesDto>>;
}