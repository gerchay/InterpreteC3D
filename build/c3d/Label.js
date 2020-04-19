"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class Label extends Instruccion_1.Instruccion {
    constructor(labelList, linea) {
        super(linea);
        this.labelList = labelList;
    }
    ejecutar(entorno) {
        entorno.actual = this.labelList[this.labelList.length - 1];
    }
}
exports.default = Label;
//# sourceMappingURL=Label.js.map