import {Instruccion} from './Instruccion';
import Principal from './principal';
import Literal from './Literal';

export default class Print implements Instruccion{

    private tipo : number;
    private value : Literal;

    // tipo 0 -> decimal
    // tipo 1 -> entero
    // tipo 2 -> char
    constructor(tipo : number, value : Literal){
        this.tipo = tipo;
        this.value = value;
    }

    ejecutar(entorno: Principal): void {
        let value = this.value.getValue(entorno);
        if(this.tipo == 0 || this.tipo == 1){
            console.log(value);
        }
        else{
            console.log(String.fromCharCode(value));
        }
    }

}

/**
 T0 = 500;
 T1 = 10;
 T2 = 20;
 T3 = T1 + T2;
 */