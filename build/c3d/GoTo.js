"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class GoTo extends Instruccion_1.Instruccion {
    constructor(label, linea) {
        super(linea);
        this.label = label;
    }
    ejecutar(entorno) {
        entorno.actual = entorno.label[this.label];
    }
}
exports.default = GoTo;
//# sourceMappingURL=GoTo.js.map