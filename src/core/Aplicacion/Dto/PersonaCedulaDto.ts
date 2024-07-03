
export interface PersonaCedulaDto {
    esRegistrado:          boolean;
    puedeRegistrarse:      boolean;
    esFallecido:           boolean;
    personaId:             number;
    identificacion:        string;
    fechaNacimiento:       Date;
    fechaExpedicion:       Date;
    esVerificado:          boolean;
    esDireccionRegistrada: boolean;
    primerNombre:          string;
    segundoNombre:         string;
    primerApellido:        string;
    segundoApellido:       string;
    nombreCompleto:        string;
    sexo:                  string;
    estadoCivil:           string;
    nacionalidad:          string;
}