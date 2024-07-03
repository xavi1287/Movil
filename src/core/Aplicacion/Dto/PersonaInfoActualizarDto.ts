import type { PersonaCorreoRequest } from "../../Dominio/GestionPersona/Request/PersonaCorreoRequest";
import type { PersonaDireccionRequest } from "../../Dominio/GestionPersona/Request/PersonaDIreccionRequest";
import type { PersonaTelefonoRequest } from "../../Dominio/GestionPersona/Request/PersonaTelefonoRequest";

export interface PersonaInfoActualizarDto {
    personaId?: number;
    personaDireccion?: PersonaDireccionRequest;    
    personaCorreo?: PersonaCorreoRequest;
    personaTelefono?: PersonaTelefonoRequest;
    esActualizacionDireccion?: boolean;
    esActualizacionCorreo?: boolean;
    esActualizacionTelefono?: boolean;
}