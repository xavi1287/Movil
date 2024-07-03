import { CitasVigentesResponse } from "../../../Dominio/Auth/Response/CitasVigentesResponse";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { CitasVigentesDto } from "../../Dto/CitasVigentesDto";


export interface ICitasVigentesRepositorio {
    obtenerCitasVigentes(
        personaId: number, 
        personaPacienteId: number, 
        sesionId: number): Promise<ResponseGlobal<CitasVigentesDto>>;
    obtenerHistorialCitas( usuarioId: number ): Promise<ResponseGlobal<CitasVigentesResponse>>;
}