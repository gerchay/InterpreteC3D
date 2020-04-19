import { Instruccion } from "./Instruccion";
import Principal from "./principal";

export default class GoTo extends Instruccion{

    private label : number;

    constructor(label : number, linea : number){
        super(linea);
        this.label = label;
    }

    ejecutar(entorno: Principal): void {
        entorno.actual = entorno.label[this.label];
    }
}