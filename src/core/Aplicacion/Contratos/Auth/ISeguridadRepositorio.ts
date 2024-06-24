

import { LoginDto } from "../../Dto/LoginDto";
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
     * *Metodo para cerrar sesion
     */
    logout(): Promise<any>;
    
}