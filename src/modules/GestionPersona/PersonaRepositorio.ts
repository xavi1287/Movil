
import { PersonaCedulaDto } from '../../core/Aplicacion/Dto/PersonaCedulaDto';
import { IPersonaRepositorio } from '../../core/Aplicacion/Contratos/GestionPesona/IPersonaRepositorio';
import { AxiosAdapter } from '../../shared/http/AxiosAdapter';
import { PersonaCedulaResponse } from '../../core/Dominio/Auth/Response/PersonaCedulaResponse';

import { AplicacionId, RolId, UriPersonCedula, UriRegistroPersona, VersionApp ,UrlBase} from '@env';
import ResponseGlobal from '../../core/Dominio/Auth/Response/ResponseGlobal';
import { RegistroRequest } from '../../core/Dominio/GestionPersona/Request/RegistroRequest';
import { RegistroResponse } from '../../core/Dominio/GestionPersona/Response/RegistroResponse';
import { Platform } from 'react-native';

export default class PersonaRepositorio implements IPersonaRepositorio {

    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    registroPersona = async( persona: RegistroRequest ): Promise<ResponseGlobal<RegistroResponse>> => {
        
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

    obtenerPersonaXCedula = async( cedula: string ) : Promise<ResponseGlobal<PersonaCedulaDto>> => {
        
        try {

            const response = await this.apiCliente.get<PersonaCedulaResponse>(`${UriPersonCedula}/${cedula}/0`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<PersonaCedulaDto>;
            }

            return this.returnDataPersonaCedula( response );
            
        } catch (error) {
            throw new Error("Error en método obtenerPersonaXCedula");
        }

    }

    private returnDataPersonaCedula = (object: ResponseGlobal<PersonaCedulaResponse> ) : ResponseGlobal<PersonaCedulaDto> => {

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
            nombreCompleto: `${object.data!.primerNombre} ${object.data!.segundoNombre} ${object.data!.primerApellido} ${object.data!.segundoApellido}`
        }

        const resp : ResponseGlobal<PersonaCedulaDto> = {
            code: 200,
            message: '',
            data: persona,
            isSuccessful: true,
        }

        return resp;

    }
    
}