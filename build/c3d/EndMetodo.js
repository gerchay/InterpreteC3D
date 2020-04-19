"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class EndMetodo extends Instruccion_1.Instruccion {
    constructor(linea) {
        super(linea);
    }
    ejecutar(entorno) {
        entorno.actual = entorno.anterior.pop() || this.linea;
    }
}
exports.default = EndMetodo;
//# sourceMappingURL=EndMetodo.js.map