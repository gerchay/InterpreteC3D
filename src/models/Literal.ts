import Principal from "./principal";

export default class Literal{
    private tipo : number;
    private value : number;

    //tipo 0 -> numero
    //tipo 1 -> temporal
    //tipo 2 -> p
    //tipo 3 -> h

    public constructor(tipo : number, value : number){
        this.tipo = tipo;
        this.value = value;
    }

    public getValue(principal : Principal) : number{
        if(this.tipo == 0){
            return this.value;
        }
        else if(this.tipo == 1){
            return principal.temporal[this.value];
        }
        else if(this.tipo == 2){
            return principal.p;
        }
        else {
            return principal.h;
        }
    }

    public setValue(value : number,principal : Principal){
        if(this.tipo == 1){
            principal.temporal[this.value] = value;
        }
        else if(this.tipo == 2){
            principal.p = value;
        }
        else{
            principal.h = value;
        }
    }
}