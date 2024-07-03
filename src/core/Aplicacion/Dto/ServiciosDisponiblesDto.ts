export interface ServiciosDisponiblesDto {
    lstservicio:  Servicio[];
    codigo:       number;
    mensaje:      string;
    mensajeModel: string[];
}

export interface Servicio {
    servicioId:             number;
    nombre:                 string;
    mensaje:                string;
    lstServicioSecundario?: ServicioSecundario[];
    mensajeGuardadoCita?:   string;
}

export interface ServicioSecundario {
    servicioId:             number;
    nombre:                 string;
    mensaje:                string;
    mensajeGuardadoCita?:   string;
}