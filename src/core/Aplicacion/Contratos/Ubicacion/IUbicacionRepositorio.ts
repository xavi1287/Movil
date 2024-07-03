
import { Location } from "../../../../presentation/components/Mapa";
import ResponseGlobal from "../../../Dominio/Auth/Response/ResponseGlobal";
import { UbicacionDto } from "../../Dto/UbicacionDto";

export interface IUbicacionRepositorio {
    obtenerGeolocalizacionInversa( userLocation: Location ): Promise<ResponseGlobal<UbicacionDto>>;
}