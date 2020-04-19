"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class Begin extends Instruccion_1.Instruccion {
    constructor(id, end, instructions, linea) {
        super(linea);
        this.id = id;
        this.end = end;
        this.instructions = instructions;
    }
    ejecutar(entorno) {
        entorno.actual = this.end;
    }
}
exports.default = Begin;
//# sourceMappingURL=Begin.js.map