
import { PersonaCedulaDto } from "../../Dto/PersonaCedulaDto";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { RegistroRequest } from "../../../Dominio/GestionPersona/Request/RegistroRequest";
import { RegistroResponse } from "../../../Dominio/GestionPersona/Response/RegistroResponse";

export interface IPersonaRepositorio {
    obtenerPersonaXCedula( cedula: string ): Promise<ResponseGlobal<PersonaCedulaDto>>;
    registroPersona( persona: RegistroRequest ): Promise<ResponseGlobal<RegistroResponse>>;
}