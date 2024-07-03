export interface EstablecimientosDisponiblesDto {
    lstestablecimiento: Establecimiento[];
    codigo:             number;
    mensaje:            string;
    mensajeModel:       string[];
}

export interface Establecimiento {
    establecimientoId:     number;
    nombreEstablecimiento: string;
    esAdscrito:            boolean;
    direccion:             string;
    latitud:               number;
    longitud:              number;
}
