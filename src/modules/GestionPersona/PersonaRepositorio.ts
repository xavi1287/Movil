
import { PersonaCedulaDto } from '../../core/Aplicacion/Dto/PersonaCedulaDto';
import { IPersonaRepositorio } from '../../core/Aplicacion/Contratos/GestionPersona/IPersonaRepositorio';
import { AxiosAdapter } from '../../shared/http/AxiosAdapter';
import { PersonaCedulaResponse } from '../../core/Dominio/GestionPersona/Response/PersonaCedulaResponse';

import { AplicacionId, RolId, UriPersonCedula, UriRegistroPersona, VersionApp, UrlBase, UriObtenerDireccion, UriObtenerTelefono, UriObtenerCorreo, UriActualizarCorreo, UriActualizarDireccion, UriActualizarTelefono, UriInfoPersona } from '@env';
import ResponseGlobal from '../../core/Dominio/Auth/Response/ResponseGlobal';
import { RegistroRequest } from '../../core/Dominio/GestionPersona/Request/RegistroRequest';
import { RegistroResponse } from '../../core/Dominio/GestionPersona/Response/RegistroResponse';
import { Platform } from 'react-native';

import { replaceUri } from '../../shared/helpers';
import type { PersonaDireccionResponse } from '../../core/Dominio/GestionPersona/Response/PersonaDireccionResponse';
import type { PersonaTelefonoResponse } from '../../core/Dominio/GestionPersona/Response/PersonaTelefonoResponse';
import type { PersonaCorreoResponse } from '../../core/Dominio/GestionPersona/Response/PersonaCorreoResponse';
import type { PersonaInformacionContactoDto, PersonaInformacionDto } from '../../core/Aplicacion/Dto/PersonaInformacionDto';
import type { PersonaInfoActualizarDto } from '../../core/Aplicacion/Dto/PersonaInfoActualizarDto';
import type { ReponseGlobalActualizacion } from '../../core/Dominio/GestionPersona/Response/ReponseGlobalActualizacion';

import { UseStorage } from '../../core/Infraestructura/adapters/UseStorage';

export default class PersonaRepositorio implements IPersonaRepositorio {

    private apiCliente: AxiosAdapter;

    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);

    }
    /**
     * * Método para obtener la información básica de una persona
     * @param cedula Cedula de la persona
     * @returns promise<ResponseGlobal<PersonaInformacionDto>>
     */
    obtenerInformacionBascioPersona = async (cedula: string): Promise<ResponseGlobal<PersonaInformacionDto>> => {
        //#region Implementation
        try {
            
            const sesionId = await UseStorage.getItem('sesionId') ?? '';
            let uriFormateada = replaceUri(UriInfoPersona, "@cedula", cedula);
            uriFormateada = replaceUri(uriFormateada, "@sesionId", sesionId.toString());
            const response = await this.apiCliente.get<PersonaInformacionDto>(`${uriFormateada}`);
            
            return this.returnInfoPersona(response);
        } catch (error) {
            throw new Error("Error en método ObtenerInformacionBascioPersona");
        }
        //#endregion Implementation
    }
    /**
     * * Método para actualizar la información de una persona
     * @param persona Datos de la persona a actualizar
     * @returns Promise<ResponseGlobal<RegistroResponse>>
     */
    async actualizarInforamcionPersona(persona: PersonaInfoActualizarDto, sesionId: number): Promise<boolean> {
        //#region Implementation
        try {
            
            let response = false;

            const promises: Promise<boolean>[] = [];

            if (persona.esActualizacionCorreo && persona.personaCorreo) {
                persona.personaCorreo.sesionId = sesionId;
                ;
                const promiseCorreo = this.apiCliente.put<ReponseGlobalActualizacion>(UriActualizarCorreo, persona.personaCorreo)
                    .then(responseCorreo => {
            
                        if (responseCorreo.isSuccessful) {
                            return true;
                        }
                        return false;
                    });
                promises.push(promiseCorreo);
            }

            if (persona.esActualizacionDireccion && persona.personaDireccion) {
                persona.personaDireccion.sesionId = sesionId;
                const promiseDireccion = this.apiCliente.put<ReponseGlobalActualizacion>(UriActualizarDireccion, persona.personaDireccion)
                    .then(responseDireccion => {

                        if (responseDireccion.isSuccessful) {
                            return true;
                        }
                        return false;
                    });
                promises.push(promiseDireccion);
            }

            if (persona.esActualizacionTelefono && persona.personaTelefono) {
                persona.personaTelefono.sesionId = sesionId;                
                const promiseTelefono = this.apiCliente.put<ReponseGlobalActualizacion>(UriActualizarTelefono, persona.personaTelefono)
                    .then(responseTelefono => {

                        if (responseTelefono.isSuccessful) {
                            return true;
                        }
                        return false;
                    });
                promises.push(promiseTelefono);
            }

            const results = await Promise.all(promises);
            response = results.some(res => res === true);

            return response;
        } catch (error) {
            throw new Error("Error en método actualizarInforamcionPersona");
        }
        //#endregion Implementation
    }
    /**
     * *Método para obtener la información de una persona
     * @param personaId 
     * @param sesionId 
     */
    obtenerInformacionPersona(personaId: number, sesionId: number): Promise<PersonaInformacionContactoDto> {
        //#region Implementation
        try {
            let startTime, endTime;
            const personaDireccion = this.obtenerPersonaDireccion(personaId, sesionId).then(data => { return data.data; });

            const personaTelefono = this.obtenerPersonaTelefono(personaId, sesionId);

            const personaCorreo = this.obtenerPersonaCorreo(personaId, sesionId);

            startTime = Date.now();
            const personaInformacion = Promise.all([personaDireccion, personaTelefono, personaCorreo])
                .then(([direccionResponse, telefonoResponse, correoResponse]) => {
                    const personaDireccion = direccionResponse;
                    const personaTelefono = telefonoResponse.data;
                    const personaCorreo = correoResponse.data;

                    // Crear el objeto PersonaInformacionDto

                    const personaInformacion: PersonaInformacionContactoDto = {
                        personaId,
                        lstPersonaDireccion: personaDireccion,
                        lstPersonaTelefono: personaTelefono,
                        lstPersonaCorreo: personaCorreo,

                    };

                    
                    endTime = Date.now();
                    
                    return personaInformacion;
                });

            return personaInformacion;

        }
        catch (error) {
            throw new Error("Error en método obtenerPersonaXCedula");
        }
        //#endregion Implementation
    }
    /**
     * *    Método para obtener la dirección de una persona
     * @param personaId Identificador de la persona
     * @param sesionId Sesión de la persona
     * @returns Promise<ResponseGlobal<PersonaDireccionDto>>
     */
    async obtenerPersonaDireccion(personaId: number, sesionId: number): Promise<ResponseGlobal<PersonaDireccionResponse>> {
        //#region Implementation
        try {
            /// Se formatea la uri con los valores de personaId y sesionId
            let uriFormateada = replaceUri(UriObtenerDireccion, "@personaId", personaId.toString());
            uriFormateada = replaceUri(uriFormateada, "@sesionId", sesionId.toString());
            const response = await this.apiCliente.get<PersonaDireccionResponse>(`${uriFormateada}`);
            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<PersonaDireccionResponse>;
            }

            return {
                message: response.message,
                data: response.data,
                isSuccessful: true
            } as ResponseGlobal<PersonaDireccionResponse>;
        }
        catch (error) {
            throw new Error("Error en método obtenerPersonaXCedula");
        }
        //#endregion Implementation
    }
    /**
     * * Método para obtener el teléfono de una persona
     * @param personaId Identificador de la persona
     * @param sesionId Sesión de la persona
     * @returns promise<ResponseGlobal<PersonaTelefonoResponse>>
     */
    async obtenerPersonaTelefono(personaId: number, sesionId: number): Promise<ResponseGlobal<PersonaTelefonoResponse>> {
        //#region Implementation
        try {
            /// Se formatea la uri con los valores de personaId y sesionId
            let uriFormateada = replaceUri(UriObtenerTelefono, "@personaId", personaId.toString());
            uriFormateada = replaceUri(uriFormateada, "@sesionId", sesionId.toString());
            const response = await this.apiCliente.get<PersonaDireccionResponse>(`${uriFormateada}`);
            
            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<PersonaTelefonoResponse>;
            }

            return {
                message: response.message,
                data: response.data,
                isSuccessful: true
            } as ResponseGlobal<PersonaTelefonoResponse>;
        }
        catch (error) {
            throw new Error("Error en método obtenerPersonaXCedula");
        }
        //#endregion Implementation
    }
    /**
     * * Método para obtener el correo de una persona
     * @param personaId Identificador de la persona
     * @param sesionId sesion de la persona
     * @returns promise<ResponseGlobal<PersonaCorreoResponse>>
     */
    async obtenerPersonaCorreo(personaId: number, sesionId: number): Promise<ResponseGlobal<PersonaCorreoResponse>> {
        //#region Implementation
        try {
            /// Se formatea la uri con los valores de personaId y sesionId
            let uriFormateada = replaceUri(UriObtenerCorreo, "@personaId", personaId.toString());
            uriFormateada = replaceUri(uriFormateada, "@sesionId", sesionId.toString());
            const response = await this.apiCliente.get<PersonaDireccionResponse>(`${uriFormateada}`);
            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<PersonaCorreoResponse>;
            }

            return {
                message: response.message,
                data: response.data,
                isSuccessful: true
            } as ResponseGlobal<PersonaCorreoResponse>;
        }
        catch (error) {
            throw new Error("Error en método obtenerPersonaXCedula");
        }
        //#endregion Implementation
    }
    /**
     * * Método para registrar una persona
     * @param persona Request para registrar una persona
     * @returns Promise<ResponseGlobal<RegistroResponse>>
     */
    registroPersona = async (persona: RegistroRequest): Promise<ResponseGlobal<RegistroResponse>> => {

        try {

            persona.rolId = RolId;
            persona.empresaAplicacionId = AplicacionId;
            persona.sistemaOperativo = Platform.OS;
            persona.version = VersionApp;

            const response = await this.apiCliente.post<RegistroResponse>(UriRegistroPersona, persona);

            return response;

        } catch (error) {
            throw new Error("Error en método registroPersona");
        }

    }
    /**
     * * Método para obtener la información de una persona por cedula
     * @param cedula Cedula de la persona
     * @returns Promise<ResponseGlobal<PersonaCedulaDto>>
     */
    obtenerPersonaXCedula = async (cedula: string): Promise<ResponseGlobal<PersonaCedulaDto>> => {

        try {

            const response = await this.apiCliente.get<PersonaCedulaResponse>(`${UriPersonCedula}/${cedula}/0`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<PersonaCedulaDto>;
            }

            return this.returnDataPersonaCedula(response);

        } catch (error) {
            throw new Error("Error en método obtenerPersonaXCedula");
        }

    }
    /**
     * * Método para obtener la información de una persona formateada
     * @param object Entidad de tipo ResponseGlobal<PersonaCedulaResponse>
     * @returns ResponseGlobal<PersonaCedulaDto>
     */
    private returnDataPersonaCedula = (object: ResponseGlobal<PersonaCedulaResponse>): ResponseGlobal<PersonaCedulaDto> => {

        const persona: PersonaCedulaDto = {
            esRegistrado: object.data!.esRegistrado,
            esFallecido: object.data!.esFallecido,
            personaId: object.data!.personaId,
            identificacion: object.data!.identificacion,
            fechaNacimiento: object.data!.fechaNacimiento,
            fechaExpedicion: object.data!.fechaExpedicion,
            esVerificado: object.data!.esVerificado,
            esDireccionRegistrada: object.data!.esDireccionRegistrada,
            primerNombre: object.data!.primerNombre,
            segundoNombre: object.data!.segundoNombre,
            primerApellido: object.data!.primerApellido,
            segundoApellido: object.data!.segundoApellido,
            sexo: object.data!.sexo,
            nacionalidad: object.data!.nacionalidad,
            estadoCivil: object.data!.estadoCivil,
            puedeRegistrarse: object.data!.usuarioId <= 0,
            nombreCompleto: `${object.data!.primerNombre} ${object.data!.segundoNombre} ${object.data!.primerApellido} ${object.data!.segundoApellido}`
        }

        const resp: ResponseGlobal<PersonaCedulaDto> = {
            code: 200,
            message: '',
            data: persona,
            isSuccessful: true,
        }

        return resp;

    }
    /**
     * * Método para obtener la información de una persona formateada
     * @param object PersonaInformacionDto
     * @returns responseGlobal<PersonaInformacionDto>
     */
    private returnInfoPersona = (object: ResponseGlobal<PersonaInformacionDto>): ResponseGlobal<PersonaInformacionDto> => {
        //#region Implementation 
        const persona: PersonaInformacionDto = {
            personaId: object.data!.personaId,
            direccion: object.data!.direccion,
            telefono: object.data!.telefono,
            correo: object.data!.correo,
            mensaje: object.data!.mensaje,
            nombreCompleto: object.data!.nombreCompleto,
            primerNombre: object.data!.primerNombre,
            segundoNombre: object.data!.segundoNombre,
            primerApellido: object.data!.primerApellido,
            segundoApellido: object.data!.segundoApellido,
            sexoId: object.data!.sexoId,
        }
        
        const resp: ResponseGlobal<PersonaInformacionDto> = {
            code: 200,
            message: '',
            data: persona,
            isSuccessful: true,
        }

        return resp;
        //#endregion Implementation
    }
}