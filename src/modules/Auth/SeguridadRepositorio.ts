
import { ISeguridadRepositorio } from "../../core/Aplicacion/Contratos/Auth/ISeguridadRepositorio";
import { LoginRequest } from "../../core/Dominio/Auth/Request/LoginRequest";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { Platform } from "react-native";
import { AplicacionId, CanalId, EmpresaAplicacionId, Password, RolId, UriInsertarLog, UriLogin, UriObtenerSesion, UriRecuperaClave, UrlBase, UrlBaseApiLog, UrlBaseSeguridad, UserName, VersionApp } from "@env";
import DeviceInfo from 'react-native-device-info';
import { LoginResponse } from '../../core/Dominio/Auth/Response/LoginResponse';
import { Permisos } from "../../shared/deviceInfo/Permisos";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { LoginDto } from '../../core/Aplicacion/Dto/LoginDto';
import { RecuperaClaveResponse } from "../../core/Dominio/Auth/Response/RecuperaClaveResponse";
import { RecuperaClaveRequest } from "../../core/Dominio/Auth/Request/RecuperaClaveRequest";
import { EnvioNotificacionResponse } from "../../core/Dominio/Auth/Response/EnvioNotificacionResponse";
import { EnvioNotificacionRequest } from '../../core/Dominio/Auth/Request/EnvioNotificacionRequest';
import type { SesionResponse } from "../../core/Dominio/Auth/Response/SesionResponse";
import type { SesionRequest } from "../../core/Dominio/Auth/Request/SesionRequest";
import type { Input, LogRequest } from "../../core/Dominio/Log/Request/LogRequest";
import type { LogResponse } from "../../core/Dominio/Log/Response/LogResponse";
import { EnumInteraccionEstado, EnumPasosFlujo } from "../../shared/helpers";
import { UseLogStore } from "../../core/Infraestructura/adapters/UseLogStore";
import LogRepositorio from "../Logs/LogRepositorio";

/**
 * @summary Clase SeguridadRepositorio
 */
export default class SeguridadRepositorio implements ISeguridadRepositorio {

    private apiCliente: AxiosAdapter;
    private validarPermisos: Permisos;
    private apiClienteSeguridad: AxiosAdapter;
    private log:LogRepositorio;
    
    constructor() {
        this.validarPermisos = new Permisos();
        this.apiCliente = new AxiosAdapter(UrlBase);
        this.apiClienteSeguridad = new AxiosAdapter(UrlBaseSeguridad);
        this.log= new LogRepositorio();
    }
    

    /**
     * *Metodo para autenticar un usuario
     * @returns Promesa de tipo LoginDto
     */
    async loginRegistro(): Promise<LoginDto> {
        //#region Implemntacion
        try {
            const permissionGranted = await this.validarPermisos.checkAndRequestPermissions();
            const dataLogin: LoginRequest = {
                userName: UserName,
                password: Password,
                aplicacionId: AplicacionId,
                rolid: RolId,
                ipAddr: permissionGranted ? await DeviceInfo.getIpAddress() : '127.0.0.1',
                macAddr: permissionGranted ? await DeviceInfo.getMacAddress() : "",
                sistemaOperativo: Platform.OS,
                version: VersionApp,
                playerId: ""
            };
            const response = await this.apiCliente.post<LoginResponse>(UriLogin, dataLogin);
            if (!response.isSuccessful) {
                return {
                    token: '',
                    lstModuloRol: [],
                    mensajeerror: response.message
                } as LoginDto;
            }
            return this.returnDataLogin(response);
        } catch (error: any) {
            return {
                token: '',
                lstModuloRol: [],
                mensajeerror: error.message
            } as LoginDto;
        }
        //#endregion Implemntacion
    }
    /**
     * *Metodo para retornar los datos de login
     * @param object de tipo ResponseGlobal<LoginResponse>
     * @returns objeto de tipo LoginDto
     */
    private returnDataLogin = (object: ResponseGlobal<LoginResponse>): LoginDto => {
        //#region Implemntacion
        const login: LoginDto = {
            token: object.data?.token,
            lstModuloRol: object.data?.lstModuloRol,
        }

        return login;
        //#endregion Implemntacion
    }
    /**
     * *Metodo para autenticar un usuario
     * @param usuario Nombre de usuario para autenticar
     * @param password contraseña del usuario
     * @returns Promesa de tipo LoginDto
     */
    async login(usuario: string, password: string): Promise<LoginDto> {
        //#region Implemntacion
        try {
            const permissionGranted = await this.validarPermisos.checkAndRequestPermissions();
            const dataLogin: LoginRequest = {
                userName: usuario,
                password: password,
                aplicacionId: AplicacionId,
                rolid: RolId,
                ipAddr: permissionGranted ? await DeviceInfo.getIpAddress() : '127.0.0.1',
                macAddr: permissionGranted ? await DeviceInfo.getMacAddress() : "",
                sistemaOperativo: Platform.OS,
                version: VersionApp,
                playerId: ""
            };
            const response = await this.apiCliente.post<LoginResponse>(UriLogin, dataLogin);
            
            if (!response.isSuccessful) {
                return {
                    token: '',
                    lstModuloRol: [],
                    mensajeerror: response.message
                } as LoginDto;
            }
            const input:Input={
                entrada: dataLogin,                
                accion: 'Login',
                paso: EnumPasosFlujo[EnumPasosFlujo.Login],
            }
            
            this.log.manejoLog('login',input,response,response?.isSuccessful ? EnumInteraccionEstado.Ok : EnumInteraccionEstado.Error);
            return this.returnDataLogin(response);
        } catch (error: any) {
            return {
                token: '',
                lstModuloRol: [],
                mensajeerror: error.message
            } as LoginDto;
        }
        //#endregion Implemntacion
    }

    /**
     * *Metodo para recuperar clave del usuario
     * @returns Promesa de tipo RecuperaClaveResponse
     */
    async recuperaClaveUsuarioXCedula(cedula: string): Promise<ResponseGlobal<RecuperaClaveResponse>> {

        try {

            const request: RecuperaClaveRequest = {
                documento: cedula,
                empresaAplicacionId: EmpresaAplicacionId
            }

            const response = await this.apiClienteSeguridad.post<RecuperaClaveResponse>(UriRecuperaClave, request);

            return response;

        } catch (error) {
            throw new Error("Error en método recuperaClaveUsuarioXCedula");
        }

    }
    /**
     * * Metodo para enviar notificación al usuario
     * @param cedula Cedúla del usuario
     * @returns promesa de tipo ResponseGlobal<EnvioNotificacionResponse>
     */
    async enviaNotificacionUsuarioXCedula(cedula: string): Promise<ResponseGlobal<EnvioNotificacionResponse>> {

        try {

            const request: EnvioNotificacionRequest = {
                documento: cedula,
                tipoNotificacion: 'bienvenida',
                empresaAplicacionId: EmpresaAplicacionId
            }

            const response = await this.apiClienteSeguridad.post<EnvioNotificacionResponse>(UriRecuperaClave, request);

            return response;

        } catch (error) {
            throw new Error("Error en método enviaNotificacionUsuarioXCedula");
        }

    }

}