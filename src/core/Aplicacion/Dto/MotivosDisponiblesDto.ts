export interface MotivosDisponiblesDto {
    lstMotivos:   Motivo[];
    codigo:       number;
    mensaje:      string;
    mensajeModel: string[];
}

export interface Motivo {
    citaMotivoId: number;
    nombre:       string;
    descripcion:  string;
    lstOpciones:  Opcion[];
}

export interface Opcion {
    opcion:       string;
    citaMotivoId: number;
    nombre:       string;
}
