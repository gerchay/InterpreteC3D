import { Instruccion } from "./Instruccion";
import Principal from "./principal";
import Literal from "./Literal";

export default class AccesoHS extends Instruccion {
    private term1: Literal;
    private term2: Literal;
    private tipo: number;

    constructor(term1: Literal, term2: Literal, tipo: number, linea : number) {
        super(linea);
        this.term1 = term1;
        this.term2 = term2;
        this.tipo = tipo;
    }

    //Tipo 0 -> Acceso Stack
    //Tipo 1 -> Acceso Heap
    //Tipo 2 -> Asignacion Stack
    //Tipo 3 -> Asignacion Heap    
    ejecutar(entorno: Principal): void {
        let valueLef = this.term2.getValue(entorno);
        switch (this.tipo) {
            case 0:
                this.term1.setValue(entorno.stack[valueLef],entorno);
                break;
            case 1:
                this.term1.setValue(entorno.heap[valueLef],entorno);
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