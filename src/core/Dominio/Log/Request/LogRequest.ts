import type { EnumInteraccionEstado } from "../../../../shared/helpers";

export interface LogRequest {
    sessionId: number;
    metodo?: string;
    usuarioId: number;
    externoId: number;
    inputJson: any;
    outputJson: any;
    interaccionestado: EnumInteraccionEstado
}

export interface Output {
    Respuesta: any;
}

export interface Input {
    entrada?: any;
    documento?: string;
    direccion?: string;
    citaId?: string;
    accion?: string;
    paso?: string;
}
