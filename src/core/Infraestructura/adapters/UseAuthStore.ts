
import { create } from "zustand";
import { IStatus } from "../../Aplicacion/Contratos/Auth/IStatus.ts";
import SeguridadRepositorio from '../../../modules/Auth/SeguridadRepositorio';
import type { LstModuloRol } from "../../Dominio/Auth/Response/LoginResponse";
import { UseStorage } from "./UseStorage";
import { isTokenValid } from '../../../shared/deviceInfo/ValidacionToken';
import { PersonaCedulaDto } from "../../Aplicacion/Dto/PersonaCedulaDto.ts";

export interface AuthState {
  status: IStatus,
  token?: string,
  roles: LstModuloRol[],
  loginState: (username: string, password: string) => Promise<boolean>,
  loginRegistroState: () => Promise<boolean>,
  
  checkStatus: () => Promise<void>,
  logout: () => Promise<void>,
  logoutRegistro: () => Promise<void>,
  infoPersonaRegistro?: PersonaCedulaDto;
  guardarInfoPersonaRegistro: (persona?: PersonaCedulaDto) => void
}

const seguridadRepositorio = new SeguridadRepositorio();

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'checking',
  token: undefined,
  roles: [],
  loginState: async (username, password) => {

    const respuesta = await seguridadRepositorio.login(username, password);

    if (!respuesta.token) {
      set({ status: 'noAutenticado', token: undefined, roles: [] });
      return false;
    }
    await UseStorage.setItem('token', respuesta.token);
    await UseStorage.setItem('cedula', username);
    set({ status: 'autenticado', token: respuesta.token, roles: respuesta.lstModuloRol });
    return true;
  },
  loginRegistroState: async () => {
    const respuesta = await seguridadRepositorio.loginRegistro();

    if (!respuesta.token) return false;

    await UseStorage.setItem('tokenRegistro', respuesta.token);

    return true;
  },
  checkStatus: async () => {
    const token = await UseStorage.getItem('token');
    if (token && isTokenValid(token)) {
      // Aquí puedes hacer una solicitud al backend para validar el token si es necesario
      set({ status: 'autenticado', token });
    } else {
      await UseStorage.removeItem('token');
      set({ status: 'noAutenticado', token: undefined, roles: [] });
    }
  },

  logout: async () => {
    await UseStorage.removeItem('token');
    set({ status: 'noAutenticado', token: undefined, roles: [] });
  },

  logoutRegistro: async () => {
    await UseStorage.removeItem('tokenRegistro');
    await UseStorage.removeItem('cedula');
  },

  guardarInfoPersonaRegistro(persona?: PersonaCedulaDto) {
    set({ infoPersonaRegistro: persona });
  },
  
}));