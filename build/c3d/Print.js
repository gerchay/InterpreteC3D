"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class Print extends Instruccion_1.Instruccion {
    // tipo 0 -> decimal
    // tipo 1 -> entero
    // tipo 2 -> char
    constructor(tipo, value, linea) {
        super(linea);
        this.tipo = tipo;
        this.value = value;
    }
    ejecutar(entorno) {
        let value = this.value.getValue(entorno);
        if (this.tipo == 0 || this.tipo == 1) {
            entorno.cadena.push(value);
            //console.log(value);
        }
        else {
            entorno.cadena.push(String.fromCharCode(value));
        }
        entorno.actual = this.linea;
    }
}
exports.default = Print;
/**
 T0 = 500;
 T1 = 10;
 T2 = 20;
 T3 = T1 + T2;
 */ 
//# sourceMappingURL=Print.js.map