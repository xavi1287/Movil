
import { PersonaCedulaDto } from "../../Dto/PersonaCedulaDto";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { RegistroRequest } from "../../../Dominio/GestionPersona/Request/RegistroRequest";
import { RegistroResponse } from "../../../Dominio/GestionPersona/Response/RegistroResponse";
import type { PersonaDireccionResponse } from "../../../Dominio/GestionPersona/Response/PersonaDireccionResponse";
import type { PersonaTelefonoResponse } from "../../../Dominio/GestionPersona/Response/PersonaTelefonoResponse";
import type { PersonaCorreoResponse } from "../../../Dominio/GestionPersona/Response/PersonaCorreoResponse";
import type { PersonaInformacionContactoDto, PersonaInformacionDto } from "../../Dto/PersonaInformacionDto";
import type { PersonaInfoActualizarDto } from "../../Dto/PersonaInfoActualizarDto";


export interface IPersonaRepositorio {
    obtenerPersonaXCedula( cedula: string ): Promise<ResponseGlobal<PersonaCedulaDto>>;
    registroPersona( persona: RegistroRequest ): Promise<ResponseGlobal<RegistroResponse>>;
    obtenerPersonaDireccion( personaId: number,sesionId:number ): Promise<ResponseGlobal<PersonaDireccionResponse>>;
    obtenerPersonaTelefono( personaId: number ,sesionId:number): Promise<ResponseGlobal<PersonaTelefonoResponse>>;
    obtenerPersonaCorreo( personaId: number ,sesionId:number): Promise<ResponseGlobal<PersonaCorreoResponse>>;
    obtenerInformacionPersona( personaId: number ,sesionId:number):Promise<PersonaInformacionContactoDto>   ;
    actualizarInforamcionPersona( persona: PersonaInfoActualizarDto,sesionId: number ): Promise<boolean>;
    obtenerInformacionBascioPersona( cedula:string): Promise<ResponseGlobal<PersonaInformacionDto>>;
}