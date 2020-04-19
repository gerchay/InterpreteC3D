import { Instruccion } from "./Instruccion";
import Principal from "./principal";

export default class EndMetodo extends Instruccion{
    
    constructor(linea : number){
        super(linea);
    }

    ejecutar(entorno : Principal){
        entorno.actual = entorno.anterior.pop() || this.linea;
    }
}