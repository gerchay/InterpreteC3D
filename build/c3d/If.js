"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class If extends Instruccion_1.Instruccion {
    constructor(left, right, tipo, label, linea) {
        super(linea);
        this.right = right;
        this.left = left;
        this.label = label;
        this.tipo = tipo;
    }
    //Tipo 0 -> ==
    //Tipo 1 -> !=
    //Tipo 2 -> <
    //Tipo 3 -> <=
    //Tipo 4 -> >
    //Tipo 5 -> >=
    ejecutar(entorno) {
        let leftVal = this.left.getValue(entorno);
        let rightVal = this.right.getValue(entorno);
        if (this.getCondicion(leftVal, rightVal)) {
            entorno.actual = entorno.label[this.label];
        }
        else {
            entorno.actual = this.linea;
        }
    }
    getCondicion(left, right) {
        switch (this.tipo) {
            case 0:
                return left == right;
            case 1:
                return left != right;
            case 2:
                return left < right;
            case 3:
                return left <= right;
            case 4:
                return left > right;
            default:
                return left >= right;
        }
    }
}
exports.default = If;
//# sourceMappingURL=If.js.map