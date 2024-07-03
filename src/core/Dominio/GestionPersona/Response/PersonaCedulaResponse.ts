
export interface PersonaCedulaResponse {
    esRegistrado:          boolean;
    esFallecido:           boolean;
    personaId:             number;
    usuarioId:             number;
    identificacion:        string;
    fechaNacimiento:       Date;
    fechaExpedicion:       Date;
    fechaValida:           Date;
    tipoValidaFecha:       number;
    sexo:                  string;
    estadoCivil:           string;
    nacionalidad:          string;
    esVerificado:          boolean;
    esDireccionRegistrada: boolean;
    primerNombre:          string;
    segundoNombre:         string;
    primerApellido:        string;
    segundoApellido:       string;
    codigo:                number;
    mensaje:               string;
    mensajeModel:          string[];
}
