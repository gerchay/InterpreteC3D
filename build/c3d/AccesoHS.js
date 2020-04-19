"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("./Instruccion");
class AccesoHS extends Instruccion_1.Instruccion {
    constructor(term1, term2, tipo, linea) {
        super(linea);
        this.term1 = term1;
        this.term2 = term2;
        this.tipo = tipo;
    }
    //Tipo 0 -> Acceso Stack
    //Tipo 1 -> Acceso Heap
    //Tipo 2 -> Asignacion Stack
    //Tipo 3 -> Asignacion Heap    
    ejecutar(entorno) {
        let valueLef = this.term2.getValue(entorno);
        switch (this.tipo) {
            case 0:
                this.term1.setValue(entorno.stack[valueLef], entorno);
                break;
            case 1:
                this.term1.setValue(entorno.heap[valueLef], entorno);
                break;
            case 2:
                entorno.stack[this.term1.getValue(entorno)] = valueLef;
                break;
            default:
                entorno.heap[this.term1.getValue(entorno)] = valueLef;
                break;
        }
        entorno.actual = this.linea;
    }
}
exports.default = AccesoHS;
//# sourceMappingURL=AccesoHS.js.map