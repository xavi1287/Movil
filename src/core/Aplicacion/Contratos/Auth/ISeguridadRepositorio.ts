
import { LoginDto } from "../../Dto/LoginDto";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { RecuperaClaveResponse } from "../../../Dominio/Auth/Response/RecuperaClaveResponse";
import { EnvioNotificacionResponse } from '../../../Dominio/Auth/Response/EnvioNotificacionResponse';
import type { SesionResponse } from "../../../Dominio/Auth/Response/SesionResponse";
import { LogRequest } from '../../../Dominio/Log/Request/LogRequest';
import type { LogResponse } from "../../../Dominio/Log/Response/LogResponse";

/**
 * @summary Interface ISeguridadRepositorio
 */
export interface ISeguridadRepositorio {
    /**
     * *Metodo para autenticar un usuario
     * @param usuario Nombre de usuario para autenticar
     * @param password contraseña del usuario
     */
    login(usuario:string, password:string): Promise<LoginDto>;
    /**
     * *Metodo para registrar un usuario
     */
    loginRegistro(): Promise<LoginDto>;
    /**
     * *Metodo para recuperar clave del usuario
     */
    recuperaClaveUsuarioXCedula( cedula: string ): Promise<ResponseGlobal<RecuperaClaveResponse>>; 
    /**
     * *Metodo para enviar notificación al usuario
     */
    enviaNotificacionUsuarioXCedula( cedula: string ): Promise<ResponseGlobal<EnvioNotificacionResponse>>; 
    

}