export interface NucleosResponse {
    nucleos:      Nucleo[];
    codigo:       number;
    mensaje:      string;
    mensajeModel: string[];
}

export interface Nucleo {
    personaId:             number;
    identificacion:        string;
    primerNombre:          string;
    primerApellido:        string;
    relacionFamiliar:      string;
    familiarConvive:       string;
    esDireccionRegistrada: boolean;
}
