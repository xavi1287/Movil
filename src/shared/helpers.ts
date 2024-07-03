
import type { Input, Output } from "../core/Dominio/Log/Request/LogRequest";
import { AddressComponent, Result } from "../core/Dominio/Ubicacion/Response/UbicacionResponse";
import { RegistroForm } from "../presentation/screens/Registro/RegistroInterfaces";

export const devuelveSoloFecha = (fecha: Date): string => {

    const anio: string = fecha.getFullYear().toString();
    const mes: string = `${(fecha.getMonth() + 1 < 10) ? 0 : ''}${fecha.getMonth() + 1}`;
    const dia: string = `${(fecha.getDate() < 10) ? 0 : ''}${fecha.getDate()}`

    return `${anio}-${mes}-${dia}`;

}
export enum EnumInteraccionEstado {
    Ok = 1,
    Error = 2,
    Start = 3,
    Secuencial = 4,
}
export enum EnumPasosFlujo {
    Login = 0,
    
    PersonaPorCedula = 1,
    ValidarFechas = 2,
    ValidarFechasConSinregCivil = 3,
    ValidarCorreo = 4,
    ValidarMenuCorreo = 5,
    ValidarTelefono = 6,
    ValidarMenuTelefono = 7,
    ValidarDireccion = 8,
    MenuPrincipal = 9,
    ServiciosPorPaciente = 10,
    EstablecimientosPorPaciente = 11,
    DisponibilidadFechas = 12,
    OpcionMañanaTardeHorarios = 13,
    DisponibilidadHorarios = 14,
    AgendarCita = 15,
    MenuSalidaAgendamiento = 16,
    OpcionReagendamientoCita = 17,
    DisponibilidadHorariosReagendamiento = 19,
    OpcionCancelarCita = 20,
    GuardarEncuesta = 21,
    DisponibilidadFechasMotivos = 22,
    CitaVigentesPorPaciente = 23,
    MenuSalidaReagendarCancelarCita = 24,
    MenuSeleccionVerCitaInfo = 25,
    MostrarCitasVigentes = 26,
    SolicitudConfirmacionReagendamiento = 27,
    SetearMotivosReagendamiento = 28,
    CitaVigentesParaCancelar = 29,
    SolicitudConfirmacionCancelacion = 30,
    ConfirmarCancelacion = 31,
    OpcionMañanaTardeHorariosEnReagendamiento = 32,
    EstablecimientosPorPacienteReagendamiento = 33,
    MotivosParaReagendamientoCita = 34,
    DisponibilidadFechasCalificacion = 35,
    MenuSinCitasEnInformacion = 36,
    OpcionRegistrarDireccionDomicilio = 37,
    ValidarRegistroDireccionDomicilio = 38,
    OpcionMantenerCancelarCita = 39,
    OpcionesRegistrarDireccion = 40,
    GenerarNucleos = 41,
    OpcionesServicioSecundario = 42,
    MenuModificarDatosPaciente = 50,
    MenuActualizarConservar = 51,
    ActualizarDireccionPaciente = 52,
    OpcionesDespuesActualizarDatos = 53,
    OpcionesModificarTelefonosPaciente = 54,
    ActualizarTelefonoRegistrado = 55,
    AceptarCancelarNumeroIngresado = 56,
    ValidarCedulaSeguridadInformacion = 57,
    MenuModificarCorreosPaciente = 58,
    ActualizarCorreosRegistrado = 59,
    AceptarCancelarCorreoIngresado = 60,
    ValidarCedulaSeguridadInformacionCorreo = 61,
    ValidarMenuActualizarDatoFamiliar = 62,
    ValidarCedulaSeguridadInformacionFamiliar = 63,
    MenuCedulaIngresadaFamiliar = 64,
    ValidaAnioExpedicionFamiliar = 65,
    RegistrarFamiliar = 66,
    ConviveFamiliar = 67,
    PreguntaCorreoFamiliar = 68,
    MenuRegistradoFamiliar = 69,
    OpcionesFamiliarActualizar = 70,
    ObtenerParentescos = 71,
    RegistrarPersona = 72,
    ObtenerDireccion = 73,
    ObtenerCorreo = 74,
    ObtenerTelefono = 75,
    RegistrarCorreo = 76,
    RegistrarTelefono = 77,
    ObtenerEncuesta = 78,
    Fin = 100
}

export const devuelveFechaEscrita = (fecha: string): string => {

    const nombresDias: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const nombresMeses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const fechaAux: Date = new Date(fecha);

    const diaSemana: number = fechaAux.getDay();
    const dia: number = fechaAux.getDate();
    const mes: number = fechaAux.getMonth();
    const anio: number = fechaAux.getFullYear();

    return `${nombresDias[diaSemana]} ${dia} de ${nombresMeses[mes]} del ${anio}`;;
}

export const formatTimeTo12Hour = (dateString: string) => {

    const dateObject = new Date(dateString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const amPm = hours < 12 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${amPm}`;

}

export const formatDateToYearMonthDay = (dateString: string) => {

    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

}

export const verificaCedula = (validarCedula: string): boolean => {

    let aux = 0, par = 0, impar = 0, verifi: number;

    for (let i = 0; i < 9; i += 2) {
        let digit = parseInt(validarCedula[i], 10);
        aux = 2 * digit;
        if (aux > 9)
            aux -= 9;
        par += aux;
    }

    for (let i = 1; i < 9; i += 2) {
        let digit = parseInt(validarCedula[i], 10);
        impar += digit;
    }

    aux = par + impar;
    if (aux % 10 !== 0) {
        verifi = 10 - (aux % 10);
    } else {
        verifi = 0;
    }

    if (verifi === parseInt(validarCedula[9], 10)) {
        return true;
    } else {
        return false;
    }

}

export const validaEmail = (email: string): boolean => {

    const rejex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rejex.test(email);

}

export const validaDatosRegistroUsuario = (form: RegistroForm) => {

    let resp = {
        mensaje: '',
        esValido: false,
    }

    if (!form.fechaNacimiento) {
        resp.mensaje = 'La fecha de nacimiento es requerida';
        return resp;
    }

    if (!form.email) {
        resp.mensaje = 'Email requerido';
        return resp;
    }

    if (!validaEmail(form.email)) {
        resp.mensaje = 'Email inválido';
        return resp;
    }

    if (!form.celular) {
        resp.mensaje = 'Celular requerido';
        return resp;
    }

    if (form.celular.length !== 10) {
        resp.mensaje = 'El celular debe tener 10 digitos';
        return resp;
    }

    if (form.celular[0] !== '0' || form.celular[1] != '9') {
        resp.mensaje = 'Celular incorrecto';
        return resp;
    }

    if (!form.contrasenia) {
        resp.mensaje = 'Contraseña requerida';
        return resp;
    }

    if (form.contrasenia.length < 6) {
        resp.mensaje = 'La contraseña debe tener al menos 6 caracteres';
        return resp;
    }

    if (form.contrasenia.length > 12) {
        resp.mensaje = 'La contraseña puede tener máximo 12 caracteres';
        return resp;
    }

    if (!/[a-zA-Z]/.test(form.contrasenia)) {
        resp.mensaje = 'La contraseña debe contener letras';
        return resp;
    }

    if (!/[A-Z]/.test(form.contrasenia)) {
        resp.mensaje = 'La contraseña debe contener al menos una letra mayúscula';
        return resp;
    }

    if (!/\d/.test(form.contrasenia)) {
        resp.mensaje = 'La contraseña debe contener números';
        return resp;
    }

    if (!form.confirmaContrasenia) {
        resp.mensaje = 'Confirmar contraseña';
        return resp;
    }

    if (form.contrasenia !== form.confirmaContrasenia) {
        resp.mensaje = 'No coinciden las contraseñas';
        return resp;
    }

    if (!form.aceptaPoliticas) {
        resp.mensaje = 'Debe aceptar las condiciones de uso';
        return resp;
    }

    resp.esValido = true;

    return resp;

}
/**
 * * Funcion que reemplaza un parametro en una URI
 * @param cadena Cadena de texo que contiene la URI
 * @param parametro Parametro a reemplazar
 * @param valor valor a colocar en el parametro
 * @returns cadena con el parametro reemplazado
 */
export const replaceUri = (cadena: string, parametro: string, valor: string): string => {

    let resp = cadena.replace(parametro, valor);
    return resp;

}
/**
 * * Funcion que transforma un objeto en un string JSON
 * @param inputEntity 
 * @returns 
 */
export const transformaInputJson = (input: Input): string => {
    const log = JSON.stringify(input);
    return log;
};
/**
 * * Funcion que transforma un objeto en un string JSON
 * @param ouputEntity 
 * @returns 
 */
export const transformarOuputJson = (ouputEntity: any): string => {
    const log: Output = {

        Respuesta: ouputEntity,

    };
    return JSON.stringify(log);
};

export const obtenerDataGoogle = ( data: Result, filtro: string ) : string => {

    const resp = data.address_components.find( (resp: AddressComponent) =>
        resp.types.includes( filtro )
    );

    return resp ? resp.long_name : "";

};

export const obtenerCalleGoogle = ( data: Result ) : string => {

    let calle: string = "";

    data.address_components.forEach(resp => {
        if (resp.types.includes("route")) {
            if (calle.length > 0) {
                calle += ", ";
            }
            calle += resp.short_name;
        }
    });

    return calle;
    
}