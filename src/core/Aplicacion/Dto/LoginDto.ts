import { LstModuloRol } from "../../Dominio/Auth/Response/LoginResponse";

export interface LoginDto {
    token?:                string;
    lstModuloRol?:         LstModuloRol[];
    mensajeerror?:         string;
}