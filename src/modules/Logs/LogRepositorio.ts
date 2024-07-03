
import { CanalId, UriInsertarLog, UriObtenerSesion, UrlBase, UrlBaseApiLog, UsuarioAppMovil } from "@env";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import type { ILogRespositorio } from "../../core/Aplicacion/Contratos/Logs/ILogRepositorio";
import type { Input, LogRequest } from "../../core/Dominio/Log/Request/LogRequest";
import type { EnumInteraccionEstado } from "../../shared/helpers";
import { UseStorage } from "../../core/Infraestructura/adapters/UseStorage";
import { createLogRequest } from "../../shared/shared";
import type { SesionRequest } from "../../core/Dominio/Auth/Request/SesionRequest";
import type { LogResponse } from "../../core/Dominio/Log/Response/LogResponse";
import type { SesionResponse } from "../../core/Dominio/Auth/Response/SesionResponse";

export default class LogRepositorio implements ILogRespositorio {
    private apiClienteLog: AxiosAdapter;

    constructor() {
        this.apiClienteLog = new AxiosAdapter(UrlBaseApiLog);
    }
    /**
     * *Metodo para insertar un log
     * @param log entidad log
     * @returns promesa de tipo LogResponse
     */
    async insertarLog(log: LogRequest): Promise<LogResponse> {
        //#region Implementation
        try {


            const response = await this.apiClienteLog.post<LogResponse>(UriInsertarLog, log);

            if (!response.isSuccessful) {
                return {
                    sessionId: 0,
                    mensaje: response.message,

                } as LogResponse
            }
            return {

                mensaje: response.message,

            } as LogResponse
        } catch (error: any) {
            return {

                mensaje: error.message,

            } as LogResponse
        }
        //#endregion

    }
    /**
     * *Metodo para obtener la sesión del usuario
     * @param cedula Cedúla del usuario
     * @returns promesa de tipo SesionResponse
     */
    async obtenerSesionIdLog(cedula: string): Promise<SesionResponse> {
        //#region Implementation
        try {
            
            const sesion: SesionRequest = {
                canalId: Number(CanalId),
                cedula: cedula,
            };

            const response = await this.apiClienteLog.post<SesionResponse>(UriObtenerSesion, sesion);

            if (!response.isSuccessful) {
                return {
                    sessionId: 0,
                    usuarioId: 0,
                    codigo: response.code,
                    mensaje: response.message,

                } as SesionResponse
            }
            return {
                sessionId: response.data?.sessionId,
                usuarioId: response.data?.usuarioId,
                codigo: response.code,
                mensaje: response.message,

            } as SesionResponse
        } catch (error: any) {
            return {
                sessionId: 0,
                usuarioId: 0,
                codigo: 500,
                mensaje: error.message,

            } as SesionResponse
        }
        //#endregion
    }
    /**
     * 
     * @param metodo Metodo a registrar
     * @param usuarioId identificador del usuario
     * @param externoId identificador externo
     * @param inputEntity json de entrada
     * @param outputEntity json de salida
     * @param estado estado resultado
     * @returns 
     */
    async manejoLog(metodo: string, inputEntity: Input, outputEntity: any, estado: EnumInteraccionEstado) {
        //#region 
        try {
            const sesionId = await UseStorage.getItem('sesionId') ?? '';
            if (!sesionId) {
                return;
            }
            const log = createLogRequest(parseInt(sesionId),metodo,Number(UsuarioAppMovil),0,inputEntity,outputEntity,estado);
            await this.insertarLog(log);
        } catch (error) {
            
        }
        //#endregion
    }

    
}