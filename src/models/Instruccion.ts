import principal from './Principal';

export abstract class Instruccion{

    constructor(){

    }

    abstract ejecutar(entorno : principal) : void;
}