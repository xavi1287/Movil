export interface PersonaDireccionResponse {
    
    lstPersonaDireccion: LstPersonaDireccion[];
    codigo: number;
    mensaje: string;
    mensajeModel: any[];

}

export interface LstPersonaDireccion {
    personadireccionid: number;
    provincia: string;
    ciudad: string;
    calle: string;
    interseccion: string;
    latitud: string;
    longitud: string;
    zona: string;
    distrito: string;
}
