import { Instruccion } from "./Instruccion";
import Literal from "./Literal";
import Principal from "./principal";

export default class If extends Instruccion {
    private left: Literal;
    private right: Literal;
    private label: number;
    private tipo: number;

    constructor(left: Literal, right: Literal, tipo: number, label: number, linea: number) {
        super(linea);
        this.right = right;
        this.left = left;
        this.label = label;
        this.tipo = tipo;
    }

    //Tipo 0 -> ==
    //Tipo 1 -> !=
    //Tipo 2 -> <
    //Tipo 3 -> <=
    //Tipo 4 -> >
    //Tipo 5 -> >=
    ejecutar(entorno: Principal): void {
        let leftVal = this.left.getValue(entorno);
        let rightVal = this.right.getValue(entorno);
        if(this.getCondicion(leftVal,rightVal)){
            entorno.actual = entorno.label[this.label];
        }
        else{
            entorno.actual = this.linea;
        }
    }

    private getCondicion(left: number, right: number): boolean {
        switch (this.tipo) {
            case 0:
                return left == right;
            case 1:
                return left != right;
            case 2:
                return left < right;
            case 3:
                return left <= right;
            case 4:
                return left > right;
            default:
                return left >= right;
        }
    }
}