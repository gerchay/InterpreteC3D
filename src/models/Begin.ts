import { Instruccion } from "./Instruccion";
import Principal from "./principal";

export default class Begin extends Instruccion{

    public id : string;
    public end : number;
    public instructions : Array<Instruccion>;

    constructor(id: string, end: number, instructions : Array<Instruccion>, linea : number){
        super(linea);
        this.id = id;
        this.end = end;
        this.instructions = instructions;
    }

    ejecutar(entorno : Principal){
        entorno.actual = this.end;
    }
}