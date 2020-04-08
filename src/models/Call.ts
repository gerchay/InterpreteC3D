import { Instruccion } from "./Instruccion";
import Principal from "./principal";

export default class Call extends Instruccion{

    private id : string;

    constructor(id : string, linea : number){
        super(linea);
        this.id = id;
    }

    ejecutar(entorno : Principal){
        entorno.anterior.push(this.linea);
        entorno.actual = entorno.functions.get(this.id) || this.linea;
    }
}