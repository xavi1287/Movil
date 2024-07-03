import type { PersonaCorreoResponse } from "../../Dominio/GestionPersona/Response/PersonaCorreoResponse";
import type { PersonaDireccionResponse } from "../../Dominio/GestionPersona/Response/PersonaDireccionResponse";
import type { PersonaTelefonoResponse } from "../../Dominio/GestionPersona/Response/PersonaTelefonoResponse";

export interface PersonaInformacionDto {
    personaId: number;
    lstPersonaDireccion?: PersonaDireccionResponse;    
    lstPersonaTelefono?: PersonaTelefonoResponse;
    lstPersonaCorreo?: PersonaCorreoResponse;
    direccion?: string;
    telefono?: string;
    correo?: string;
    mensaje: string;
    nombreCompleto?:string
    primerNombre?:string
    segundoNombre?:string
    primerApellido?:string
    segundoApellido?:string
    sexoId?:string
}

export interface PersonaInformacionContactoDto {
    personaId: number;
    lstPersonaDireccion?: PersonaDireccionResponse;    
    lstPersonaTelefono?: PersonaTelefonoResponse;
    lstPersonaCorreo?: PersonaCorreoResponse;   
}