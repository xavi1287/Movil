import ResponseGlobal from "../../core/Dominio/Auth/Response/ResponseGlobal";

export abstract class HttpAdapter {
    

    abstract get<T>(url: string,config?:Record<string,string>): Promise<ResponseGlobal<T>> ;

    abstract post<T>(url: string, body: any,config?:Record<string,string>): Promise<ResponseGlobal<T>>;

    abstract put<T>(url: string, body: any,config?:Record<string,string>): Promise<ResponseGlobal<T>>; 

    abstract delete<T>(url: string,config?:Record<string,string>): Promise<ResponseGlobal<T>>; 
}