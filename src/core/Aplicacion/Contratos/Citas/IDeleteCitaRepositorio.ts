import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { DeleteCitaDto } from "../../Dto/DeleteCitaDto";

export interface IDeleteCitaRepositorio {
    deleteCita(
        personaCitaId: number,
        sesionId: number): Promise<ResponseGlobal<DeleteCitaDto>>;
}