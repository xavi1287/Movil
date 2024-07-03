import { GuardarCitaRequest } from "../../../Dominio/Agendamiento/Request/GuardarCitaRequest";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { GuardarCitaDto } from "../../Dto/GuardarCitaDto";


export interface IGuardarCitaRepositorio {
    guardarCita(
        guardarCitaRequest: GuardarCitaRequest    
    ): Promise<ResponseGlobal<GuardarCitaDto>>;
}