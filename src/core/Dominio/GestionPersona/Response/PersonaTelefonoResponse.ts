export interface PersonaTelefonoResponse {
    lstPersonaTelefono: LstPersonaTelefono[];
    codigo:             number;
    mensaje:            string;
    mensajeModel:       any[];
}

export interface LstPersonaTelefono {
    personaTelefonoId: number;
    usuarioTelefonoId: number;
    numero:            string;
    tipoTelefono:      string;
}
