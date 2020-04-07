import { Instruccion } from "./Instruccion";

export default class Principal{
    public stack: number[];
    public heap: number[];
    public p : number;
    public h : number;
    
    public temporal: number[];
    public label : number[];

    public anterior:number[];

    public instrucciones: Array<Instruccion>;

    constructor(){
        this.stack = new Array();
        this.heap = new Array();
        this.p = 0;
        this.h = 0;
        this.temporal = new Array();
        this.label = new Array();
        this.anterior = new Array();
        this.instrucciones = new Array();
    }

    public ejecutar(){
        this.instrucciones.forEach(instruccion =>{
            instruccion.ejecutar(this);
        });
    }
}