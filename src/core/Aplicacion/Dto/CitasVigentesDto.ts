export interface CitasVigentesDto {
    lstcitavigente: Lstcitavigente[];
    codigo:         number;
    mensaje:        string;
    mensajeModel:   string[];
}

export interface Lstcitavigente {
    fechahoraprogramada:    Date;
    nombreestablecimiento:  string;
    nombreservicio:         string;
    citaid:                 number;
    servicioid:             number;
    citaMotivoId:           number;
    citaMotivo:             string;
    establecimientoSaludid: number;
    direccion:              string;
    latitud:                number;
    longitud:               number;
}