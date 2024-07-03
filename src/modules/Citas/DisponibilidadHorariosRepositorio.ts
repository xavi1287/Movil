import React from 'react'
import { AxiosAdapter } from '../../shared/http/AxiosAdapter';
import { UriDisponibilidadHorarios, UrlBase } from '@env';
import { HorariosDisponiblesRequest } from '../../core/Dominio/Agendamiento/Request/HorariosDisponiblesRequest';
import ResponseGlobal from '../../core/Dominio/Auth/Response/ResponseGlobal';
import { Horario, HorariosDisponiblesDto } from '../../core/Aplicacion/Dto/HorariosDisponiblesDto';
import { HorariosDisponiblesResponse } from '../../core/Dominio/Agendamiento/Response/HorariosDisponiblesResponse';
import { IDisponibilidadHorariosRepositorio } from '../../core/Aplicacion/Contratos/Citas/IDisponibilidadHorariosRepositorio';

export default class DisponibilidadHorariosRepositorio implements IDisponibilidadHorariosRepositorio {
    private apiCliente: AxiosAdapter;
    
    constructor() {
        this.apiCliente = new AxiosAdapter(UrlBase);
    }

    disponibilidadHorarios = async (
        horariosRequest: HorariosDisponiblesRequest
    ): Promise<ResponseGlobal<HorariosDisponiblesDto>> => 
    {
        try {
            
            if (!horariosRequest || typeof horariosRequest !== 'object') {
                throw new Error("horariosRequest no está definido o tiene una estructura incorrecta");
            }

            const response = await this.apiCliente.post<HorariosDisponiblesResponse>(UriDisponibilidadHorarios, horariosRequest);
            
            if (!response.isSuccessful) {
                return {
                    message: response.message,
                    data: undefined,
                    isSuccessful: false
                } as ResponseGlobal<HorariosDisponiblesDto>;
            }

            return this.returnDisponibilidadHorarios( response );
            
        } catch (error) {
            console.error("Error en método Disponibilidad de Horarios:", error);
            throw new Error("Error en método Disponibilidad de Horarios");
        }
    }

    private returnDisponibilidadHorarios = (object: ResponseGlobal<HorariosDisponiblesResponse> ) : ResponseGlobal<HorariosDisponiblesDto> => {

        if (!object.data) {
            throw new Error("Los datos de la respuesta están vacíos");
        }

        const disponibilidadHorarios: HorariosDisponiblesResponse = {
            horarios: object.data.horarios.map((horario: Horario) => ({
                consultorioId: horario.consultorioId,
                consultorioNombre: horario.consultorioNombre,
                tipoHorario: horario.tipoHorario,
                fecha: horario.fecha,
                hora: horario.hora,
                duracion: horario.duracion,
            })),
            codigo: object.data.codigo,
            mensaje: object.data.mensaje,
            mensajeModel: object.data.mensajeModel,
        };

        const resp : ResponseGlobal<HorariosDisponiblesDto> = {
            code: 200,
            message: '',
            data: disponibilidadHorarios,
            isSuccessful: true,
        }

        return resp;

    }
}
