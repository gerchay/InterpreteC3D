import { Instruccion } from "./Instruccion";
import Begin from "./Begin";
import Label from "./Label";

export default class Principal{
    public stack: number[];
    public heap: number[];
    public p : number;
    public h : number;
    public temporal: number[];
    public label : number[];
    public anterior:number[];
    public instrucciones: Array<Instruccion>;
    public actual : number;
    public functions : Map<string,number>;
    public cadena : any[];

    constructor(instrucciones : Array<Instruccion>){
        this.stack = new Array();
        this.heap = new Array();
        this.p = 0;
        this.h = 0;
        this.temporal = new Array();
        this.label = new Array();
        this.anterior = new Array();
        this.instrucciones = instrucciones;
        this.actual = 0;
        this.functions = new Map();
        this.cadena = new Array();
        this.first();
    }

    public ejecutar(){
        this.actual = 0;
        for(let i = 0; i < this.instrucciones.length; i++){
            if(this.instrucciones[i] != null){
                this.instrucciones[i].ejecutar(this);
                i = this.actual;    
            }
        }
        console.log(this.cadena.join(""));
    }

    public report(){
        let report = {
            salida : this.cadena.join(""),
            temps : this.temporal,
            heap : this.heap,
            stack : this.stack,
            h : this.h,
            p : this.p
        }
        return report;
    }

    private first(){
        for(let i = 0; i < this.instrucciones.length; i++){
            let instruccion = this.instrucciones[i];
            if(instruccion instanceof Begin){
                let begin = instruccion as Begin;
                this.functions.set(begin.id,begin.linea);
            }
            else if(instruccion instanceof Label){
                let label = instruccion as Label;
                this.label[label.label] = label.linea;
            }
        }
    }
}