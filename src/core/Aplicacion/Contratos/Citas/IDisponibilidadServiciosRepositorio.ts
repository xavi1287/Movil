import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { ServiciosDisponiblesDto } from "../../Dto/ServiciosDisponiblesDto";


export interface IDisponibilidadServiciosRepositorio {
    obtenerServicios(
        personaId: number,
        sesionId: number): Promise<ResponseGlobal<ServiciosDisponiblesDto>>;
}