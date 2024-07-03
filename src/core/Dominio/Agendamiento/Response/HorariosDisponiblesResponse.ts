export interface HorariosDisponiblesResponse {
    horarios:     Horario[];
    codigo:       number;
    mensaje:      string;
    mensajeModel: string[];
}

export interface Horario {
    consultorioId:     number;
    consultorioNombre: string;
    tipoHorario:       string;
    fecha:             string;
    hora:              string;
    duracion:          number;
}