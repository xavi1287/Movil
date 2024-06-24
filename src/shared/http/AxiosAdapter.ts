import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpAdapter } from "./HttpAdapter";
import { Timeout, UrlBase } from "@env";
import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";
import { UseStorage } from "../../core/Infraestructura/adapters/UseStorage";


export class AxiosAdapter implements HttpAdapter {
    private apiCliente: AxiosInstance;

    constructor(urlBase: string) {
        this.apiCliente = axios.create({
            baseURL:urlBase===""? UrlBase:urlBase,
            timeout: Timeout,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Interceptor para añadir el JWT a cada solicitud
        this.apiCliente.interceptors.request.use(
            async (config) => {
                const token = await UseStorage.getItem('token');
                const tokenRegistro = await UseStorage.getItem('tokenRegistro');

                if (tokenRegistro || token) {
                    config.headers.Authorization = `Bearer ${ (tokenRegistro) ? tokenRegistro : token}`;
                }
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
    private async Request<T>(method: 'get' | 'post' | 'put' | 'delete', url: string, data?: any, config?: AxiosRequestConfig
    ): Promise<ResponseGlobal<T>> {
        let response: AxiosResponse<T> = {} as AxiosResponse<T>;
        try {
            response = await this.apiCliente.request({
                method,
                url,
                data,
                ...config
            });

            return new ResponseGlobal(
                response.data,
                response.status >= 200 && response.status < 300,
                response.status,
                response.statusText
            );
        } catch (error: any) {
            return new ResponseGlobal(
                response.data,
                false,
                response.status,
                error.message
            );
        }
    }
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseGlobal<T>> {
        return this.Request<T>('get', url, undefined, config);
    }

    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ResponseGlobal<T>> {
        return this.Request<T>('post', url, data, config);
    }

    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ResponseGlobal<T>> {
        return this.Request<T>('put', url, data, config);
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseGlobal<T>> {
        return this.Request<T>('delete', url, undefined, config);
    }
}
