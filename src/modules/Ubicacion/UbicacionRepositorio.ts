
import { GoogleApiKey, UriGoogleGeocode, UrlBaseGoogle } from "@env";
import { IUbicacionRepositorio } from "../../core/Aplicacion/Contratos/Ubicacion/IUbicacionRepositorio";
import { UbicacionDto } from "../../core/Aplicacion/Dto/UbicacionDto";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { Location } from "../../presentation/components/Mapa";
import { AxiosAdapter } from "../../shared/http/AxiosAdapter";
import { AddressComponent, UbicacionResponse } from "../../core/Dominio/Ubicacion/Response/UbicacionResponse";
import { obtenerCalleGoogle, obtenerDataGoogle } from "../../shared/helpers";

export default class UbicacionRepositorio implements IUbicacionRepositorio {

    private apiCliente: AxiosAdapter;

    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBaseGoogle);
    }

    obtenerGeolocalizacionInversa = async( userLocation: Location ): Promise<ResponseGlobal<UbicacionDto>> => {

        try {

            const lat = userLocation.latitude;
            const lng = userLocation.longitude;
            
            const response = await this.apiCliente.get<UbicacionResponse>(`${UriGoogleGeocode}${lat},${lng}&key=${GoogleApiKey}`);

            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<UbicacionDto>;
            }

            return this.returnDataUbicacion(response);

        } catch (error) {
            throw new Error("Error en método obtenerGeolocalizacionInversa");
        }

    }

    private returnDataUbicacion = (object: ResponseGlobal<UbicacionResponse>): ResponseGlobal<UbicacionDto> => {

        const resultado = object.data!.results[0];

        const ubicacion : UbicacionDto = {
            ciudad:       obtenerDataGoogle( resultado, 'locality' ),
            sector:       obtenerDataGoogle( resultado, 'administrative_area_level_3' ),
            calle:        obtenerCalleGoogle( resultado ),
            interseccion: obtenerDataGoogle( resultado, 'street_number' ),
            provincia:    obtenerDataGoogle( resultado, 'administrative_area_level_1' ),
        };

        const resp: ResponseGlobal<UbicacionDto> = {
            code: 200,
            message: '',
            data: ubicacion,
            isSuccessful: true,
        }

        return resp;

    }

}