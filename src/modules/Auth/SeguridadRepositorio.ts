
import { ISeguridadRepositorio } from "../../core/Aplicacion/Contratos/Auth/ISeguridadRepositorio";
import { LoginRequest } from "../../core/Dominio/Auth/Request/LoginRequest";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { Platform } from "react-native";
import { AplicacionId, Password, RolId, UriLogin, UrlBase, UserName, VersionApp } from "@env";
import DeviceInfo from 'react-native-device-info';
import { LoginResponse } from '../../core/Dominio/Auth/Response/LoginResponse';
import { Permisos } from "../../shared/deviceInfo/Permisos";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { LoginDto } from '../../core/Aplicacion/Dto/LoginDto';
/**
 * @summary Clase SeguridadRepositorio
 */
export default class SeguridadRepositorio implements ISeguridadRepositorio {
    private apiCliente: AxiosAdapter;
    private validarPermisos: Permisos;
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
        this.validarPermisos = new Permisos();
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
            // console.log(UriLogin);
            console.log(dataLogin);
            const response = await this.apiCliente.post<LoginResponse>(UriLogin, dataLogin);
            console.log(response);
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
     * *Metodo para cerrar sesion
     */
    async logout(): Promise<any> {
        throw new Error("Method not implemented.");
    }




}