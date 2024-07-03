import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { NucleosDto } from "../../Dto/NucleosDto";


export interface INucleosRepositorio {
    obtenerNucleos(
        personaId: number,
        sesionId: number): Promise<ResponseGlobal<NucleosDto>>;
}