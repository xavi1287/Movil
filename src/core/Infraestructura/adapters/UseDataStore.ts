import { create } from 'zustand';
import { PersonaCedulaDto } from '../../Aplicacion/Dto/PersonaCedulaDto';
import { CitasVigentesDto } from '../../Aplicacion/Dto/CitasVigentesDto';

export interface DataState {
    code: number,
    message: string,
    dataPersona?: PersonaCedulaDto,
    saveDataPersona: ( persona?: PersonaCedulaDto ) => void,
    dataCitasvigentes?: CitasVigentesDto,
    saveDataCitasVigentes: ( citas?: CitasVigentesDto ) => void,
}

export const useDataStore = create<DataState>((set, get) => ({
    code: 0,
    message: '',
    saveDataPersona( persona?: PersonaCedulaDto ) {
        set({ dataPersona: persona });
    },
    saveDataCitasVigentes( citas?: CitasVigentesDto ) {
        set({ dataCitasvigentes: citas });
    },
}));
