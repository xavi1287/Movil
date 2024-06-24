export interface LoginResponse {
    token:                string;
    fechaExpiracionToken: Date;
    lstModuloRol:         LstModuloRol[];
    codigo:               number;
    mensaje:              string;
    mensajeModel:         string[];
}

export interface LstModuloRol {
    rolId:        number;
    rolNombre:    string;
    moduloId:     number;
    moduloNombre: string;
}
