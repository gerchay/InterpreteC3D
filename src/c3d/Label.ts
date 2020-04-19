import { Instruccion } from "./Instruccion";
import Principal from "./principal";

export default class Label extends Instruccion{
    public labelList : number[];
    constructor(labelList : number[], linea : number){
        super(linea);
        this.labelList = labelList;
    }

    ejecutar(entorno: Principal): void {
        entorno.actual = this.labelList[this.labelList.length - 1];
    }
}