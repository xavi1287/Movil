import type { Input, LogRequest } from "../core/Dominio/Log/Request/LogRequest";
import { transformaInputJson, transformarOuputJson, type EnumInteraccionEstado } from "./helpers";
/**
 * *Función para crear un log
 * @param sessionId Identificador de la sesión
 * @param metodo Metodo a registrar
 * @param usuarioId Usuario que realiza la acción
 * @param externoId externoId
 * @param inputEntity Input de la acción
 * @param outputEntity output de la acción
 * @param estado Estado de la acción
 * @returns 
 */
export const createLogRequest = (sessionId: number,metodo: string,usuarioId: number,externoId: number,
    inputEntity: Input,outputEntity: any, estado: EnumInteraccionEstado): LogRequest => {
    const log: LogRequest = {
        sessionId,
        metodo,
        usuarioId,
        externoId,
        inputJson: transformaInputJson(inputEntity),
        outputJson: transformarOuputJson(outputEntity),
        interaccionestado: estado
    };
    return log;
};