import { Instruccion } from "./Instruccion";
import Principal from "./principal";
import Literal from "./Literal";

export default class Asignacion extends Instruccion {

    private tipo: number;
    private left: Literal;
    private right: Literal | null;
    private destino: Literal;

    constructor(tipo: number, left: Literal, right: Literal | null, destino: Literal, linea : number) {
        super(linea);
        this.tipo = tipo;
        this.left = left;
        this.right = right;
        this.destino = destino;
    }

    // Tipo 0 -> Directa
    // Tipo 1 -> Suma
    // Tipo 2 -> Resta
    // Tipo 3 -> Mult
    // Tipo 4 -> Div
    // Tipo 5 -> Modulo
    ejecutar(entorno: Principal): void {
        let leftVal = this.left.getValue(entorno);
        let rightVal = this.right == null ? 0 : this.right.getValue(entorno);

        switch (this.tipo) {
            case 0:
                this.destino.setValue(leftVal,entorno);
                break;
            case 1:
                let x = 10;
                this.destino.setValue(leftVal + rightVal,entorno);
                break;
            case 2:
                this.destino.setValue(leftVal - rightVal,entorno);
                break;
            case 3:
                this.destino.setValue(leftVal * rightVal,entorno);
                break;
            case 4:
                if(rightVal == 0){
                    entorno.cadena.push('N');
                    entorno.cadena.push('o');
                    entorno.cadena.push(' ');
                    entorno.cadena.push('s');
                    entorno.cadena.push('e');
                    entorno.cadena.push('a');
                    entorno.cadena.push('s');
                    entorno.cadena.push(' ');
                    entorno.cadena.push('m');
                    entorno.cadena.push('u');
                    entorno.cadena.push('l');
                    entorno.cadena.push('a');
                    this.destino.setValue(0,entorno);
                }
                else{
                    this.destino.setValue(leftVal / rightVal,entorno);
                }
                break;
            default:
                this.destino.setValue(leftVal % rightVal,entorno);
                break;
        }
        entorno.actual = this.linea;
    }

}