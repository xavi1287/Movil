
export interface RegistroRequest {
    identificacion:      string;
    primerNombre:        string;
    segundoNombre:       string;
    primerApellido:      string;
    segundoApellido:     string;
    fechaNacimiento:     string;
    sexo:                string;
    estadoCivil:         string;
    nacionalidad:        string;
    esVerificado:        boolean;
    celular:             string;
    sesionId:            number;
    correo:              string;
    ciudad:              string;
    sector:              string;
    calle:               string;
    interseccion:        string;
    latitud:             string;
    longitud:            string;
    rolId:               number;
    empresaAplicacionId: number;
    contraseña:          string;
    sistemaOperativo:    string;
    version:             string;
    aceptaCondEnvio:     boolean;
}
