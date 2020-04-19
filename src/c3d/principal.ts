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

    public actual : number;

    public functions : Map<string,number>;

    public cadena : any[];

    constructor(){
        this.stack = new Array();
        this.heap = new Array();
        this.p = 0;
        this.h = 0;
        this.temporal = new Array();
        this.label = new Array();
        this.anterior = new Array();
        this.instrucciones = new Array();
        this.actual = 0;
        this.functions = new Map();
        this.cadena = new Array();
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
}