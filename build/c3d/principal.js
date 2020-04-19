"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Principal {
    constructor() {
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
    ejecutar() {
        this.actual = 0;
        for (let i = 0; i < this.instrucciones.length; i++) {
            if (this.instrucciones[i] != null) {
                this.instrucciones[i].ejecutar(this);
                i = this.actual;
            }
        }
        console.log(this.cadena.join(""));
    }
    report() {
        let report = {
            salida: this.cadena.join(""),
            temps: this.temporal,
            heap: this.heap,
            stack: this.stack,
            h: this.h,
            p: this.p
        };
        return report;
    }
    clear() {
        this.stack = new Array();
        this.heap = new Array();
        this.p = 0;
        this.h = 0;
        this.temporal = new Array();
        this.actual = 0;
        this.cadena = new Array();
    }
}
exports.default = Principal;
//# sourceMappingURL=principal.js.map