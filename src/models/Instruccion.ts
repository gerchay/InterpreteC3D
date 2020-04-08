import Principal from "./principal";

export abstract class Instruccion{

    public linea : number;

    constructor(linea : number){
        this.linea = linea;
    }

    abstract ejecutar(entorno : Principal) : void;
}