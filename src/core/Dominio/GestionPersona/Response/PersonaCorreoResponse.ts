export interface PersonaCorreoResponse {
    lstPersonaCorreo: LstPersonaCorreo[];
    codigo:           number;
    mensaje:          string;
    mensajeModel:     string[];
}

export interface LstPersonaCorreo {
    personaCorreoId: number;
    usuarioCorreoId: number;
    correo:          string;
}
