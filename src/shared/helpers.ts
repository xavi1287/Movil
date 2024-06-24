
import { RegistroForm } from "../presentation/screens/Registro/RegistroInterfaces";

export const devuelveSoloFecha = ( fecha: Date ) : string => {

    const anio: string = fecha.getFullYear().toString();
    const mes: string  = `${ (fecha.getMonth() < 10) ? 0 : '' }${ fecha.getMonth() + 1 }`;
    const dia: string  = `${ (fecha.getDate() < 10) ? 0 : '' }${ fecha.getDate() }`

    return `${anio}-${mes}-${dia}`;

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

export const validaEmail = ( email: string ) : boolean => {

    const rejex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rejex.test (email );

}

export const validaDatosRegistroUsuario = ( form: RegistroForm ) => {

    let resp = {
        mensaje: '',
        esValido: false,
    }

    if ( !form.fechaNacimiento ) {
        resp.mensaje = 'La fecha de nacimiento es requerida';
        return resp;
    }

    if ( !form.email ) {
        resp.mensaje = 'Email requerido';
        return resp;
    }

    if ( !validaEmail(form.email) ) {
        resp.mensaje = 'Email inválido';
        return resp;
    }

    if ( !form.celular ) {
        resp.mensaje = 'Celular requerido';
        return resp;
    }

    if ( form.celular.length !== 10 ) {
        resp.mensaje = 'El celular debe tener 10 digitos';
        return resp;
    }

    if ( form.celular[0] !== '0' || form.celular[1] != '9' ) {
        resp.mensaje = 'Celular incorrecto';
        return resp;
    }

    if ( !form.contrasenia ) {
        resp.mensaje = 'Contraseña requerida';
        return resp;
    }

    if ( form.contrasenia.length < 6 ) {
        resp.mensaje = 'La contraseña debe tener al menos 6 caracteres';
        return resp;
    }

    if ( form.contrasenia.length > 12 ) {
        resp.mensaje = 'La contraseña puede tener máximo 12 caracteres';
        return resp;
    }

    if ( !/[a-zA-Z]/.test( form.contrasenia ) ) {
        resp.mensaje = 'La contraseña debe contener letras';
        return resp;
    }

    if ( !/[A-Z]/.test( form.contrasenia ) ) {
        resp.mensaje = 'La contraseña debe contener al menos una letra mayúscula';
        return resp;
    }

    if ( !/\d/.test( form.contrasenia ) ) {
        resp.mensaje = 'La contraseña debe contener números';
        return resp;
    }

    if ( !form.confirmaContrasenia ) {
        resp.mensaje = 'Confirmar contraseña';
        return resp;
    }

    if ( form.contrasenia !== form.confirmaContrasenia ) {
        resp.mensaje = 'No coinciden las contraseñas';
        return resp;
    }

    if ( !form.aceptaPoliticas ) {
        resp.mensaje = 'Debe aceptar las condiciones de uso';
        return resp;
    }

    resp.esValido = true;

    return resp;

}