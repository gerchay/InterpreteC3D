import { Instruccion } from "./Instruccion";
import Principal from "./principal";

export default class Label extends Instruccion{
    public label : number;
    constructor(label : number, linea : number){
        super(linea);
        this.label = label;
    }

    ejecutar(entorno: Principal): void {
        entorno.actual = this.linea;
    }
}