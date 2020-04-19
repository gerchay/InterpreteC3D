"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class Call extends Instruccion_1.Instruccion {
    constructor(id, linea) {
        super(linea);
        this.id = id;
    }
    ejecutar(entorno) {
        entorno.anterior.push(this.linea);
        entorno.actual = entorno.functions.get(this.id) || this.linea;
    }
}
exports.default = Call;
//# sourceMappingURL=Call.js.map