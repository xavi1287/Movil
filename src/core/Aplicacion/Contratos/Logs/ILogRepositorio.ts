import type { EnumInteraccionEstado } from "../../../../shared/helpers";
import type { SesionResponse } from "../../../Dominio/Auth/Response/SesionResponse";
import type { Input, LogRequest } from "../../../Dominio/Log/Request/LogRequest";
import type { LogResponse } from "../../../Dominio/Log/Response/LogResponse";

export interface ILogRespositorio {
    /**
     * *Función para insertar un log
     * @param metodo Nombre del método
     * @param usuarioId Identificador del usuario
     * @param externoId Identificador externo
     * @param inputEntity Json de entrada
     * @param outputEntity Json de salida
     * @param estado Estado de la interacción
     */
    manejoLog(metodo: string,inputEntity: Input,outputEntity: any,
    estado: EnumInteraccionEstado):void;
    /**
     * *Metodo para obtener la sesión del usuario
     * @param cedula Cedúla del usuario
     */
    obtenerSesionIdLog(cedula:string):Promise<SesionResponse>;
    /**
     * *Metodo para insertar un log
     * @param log entidad log
     * @returns promesa de tipo LogResponse
     */
    insertarLog(log:LogRequest):Promise<LogResponse>;
    
}