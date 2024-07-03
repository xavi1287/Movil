export interface GuardarCitaRequest {
    pacienteId:        number;
    hora:              string;
    consultorioId:     number;
    duracion:          number;
    esReagenda:        boolean;
    citaId:            number;
    fecha:             string;
    establecimientoId: number;
    citaMotivoId:      number;
    personaId:         number;
    servicioId:        number;
    sesionId:          number;
}