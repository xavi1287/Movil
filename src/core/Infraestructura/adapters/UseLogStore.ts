
import { create } from "zustand"

import { UseStorage } from "./UseStorage";
import type { Input } from "../../Dominio/Log/Request/LogRequest";
import type { EnumInteraccionEstado } from "../../../shared/helpers";
import { createLogRequest } from "../../../shared/shared";
import LogRepositorio from "../../../modules/Logs/LogRepositorio";

export interface LogState {
    SesionState: (cedula: string) => Promise<void>,
    getSesionState: () => Promise<number>,
    LogInsertState:(metodo: string,usuarioId: number,externoId: number,
        inputEntity: Input,outputEntity: any, estado: EnumInteraccionEstado)=>Promise<void>
}


const logRepositorio = new LogRepositorio();
export const UseLogStore = create<LogState>((set, get) => ({
    SesionState: async (cedula: string) => {

        if (!cedula) {
            return;
        }
        const respuesta = await logRepositorio.obtenerSesionIdLog(cedula);
        if (!respuesta) {
            return;
        }
        await UseStorage.setItem('sesionId', respuesta.sessionId.toString());
    },
    getSesionState: async () => {
        const sesionId = await UseStorage.getItem('sesionId') ?? 0;
        if (!sesionId) {
            return 0;
        }
        return parseInt(sesionId);
    },
    LogInsertState: async (metodo: string,usuarioId: number,externoId: number,
        inputEntity: Input,outputEntity: any, estado: EnumInteraccionEstado) => {
        const sesionId = await UseStorage.getItem('sesionId') ?? '';
        if (!sesionId) {
            return;
        }
        const log = createLogRequest(parseInt(sesionId),metodo,usuarioId,externoId,inputEntity,outputEntity,estado);
        await logRepositorio.insertarLog(log);
    }
}))
