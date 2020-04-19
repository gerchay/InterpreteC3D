"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class Asignacion extends Instruccion_1.Instruccion {
    constructor(tipo, left, right, destino, linea) {
        super(linea);
        this.tipo = tipo;
        this.left = left;
        this.right = right;
        this.destino = destino;
    }
    // Tipo 0 -> Directa
    // Tipo 1 -> Suma
    // Tipo 2 -> Resta
    // Tipo 3 -> Mult
    // Tipo 4 -> Div
    // Tipo 5 -> Modulo
    ejecutar(entorno) {
        let leftVal = this.left.getValue(entorno);
        let rightVal = this.right == null ? 0 : this.right.getValue(entorno);
        switch (this.tipo) {
            case 0:
                this.destino.setValue(leftVal, entorno);
                break;
            case 1:
                let x = 10;
                this.destino.setValue(leftVal + rightVal, entorno);
                break;
            case 2:
                this.destino.setValue(leftVal - rightVal, entorno);
                break;
            case 3:
                this.destino.setValue(leftVal * rightVal, entorno);
                break;
            case 4:
                this.destino.setValue(leftVal / rightVal, entorno);
                break;
            default:
                this.destino.setValue(leftVal % rightVal, entorno);
                break;
        }
        entorno.actual = this.linea;
    }
}
exports.default = Asignacion;
//# sourceMappingURL=Asignacion.js.map