import { UriGetNucleos, UrlBase } from "@env";
import { INucleosRepositorio } from "../../core/Aplicacion/Contratos/GestionPersona/INucleosRepositorio";
import { Nucleo, NucleosDto } from "../../core/Aplicacion/Dto/NucleosDto";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { NucleosResponse } from "../../core/Dominio/GestionPersona/Response/NucleosResponse";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";

export default class NucleosRepositorio implements INucleosRepositorio {

    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    obtenerNucleos = async(
        personaId: number, 
        sesionId: number): Promise<ResponseGlobal<NucleosDto>> => {
        try {

            const response = await this.apiCliente.get<NucleosResponse>(`${UriGetNucleos}/${personaId}/${sesionId}`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<NucleosDto>;
            }

            return this.returnDataNucleos( response );
            
        } catch (error) {
            throw new Error("Error en método obtener Núcleos");
        }
    }

    private returnDataNucleos = (object: ResponseGlobal<NucleosResponse> ) : ResponseGlobal<NucleosDto> => {

        const nucleos: NucleosDto = {
            nucleos: object.data!.nucleos.map((nucleo: Nucleo) => ({
                personaId: nucleo.personaId,
                identificacion: nucleo.identificacion,
                primerNombre: nucleo.primerNombre,
                primerApellido: nucleo.primerApellido,
                relacionFamiliar: nucleo.relacionFamiliar,
                familiarConvive: nucleo.familiarConvive,
                esDireccionRegistrada: nucleo.esDireccionRegistrada,
            })),
            codigo: object.data!.codigo,
            mensaje: object.data!.mensaje,
            mensajeModel: object.data!.mensajeModel,
        };

        const resp : ResponseGlobal<NucleosDto> = {
            code: 200,
            message: '',
            data: nucleos,
            isSuccessful: true,
        }

        return resp;

    }
}