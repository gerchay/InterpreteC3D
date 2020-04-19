"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Literal {
    //tipo 0 -> numero
    //tipo 1 -> temporal
    //tipo 2 -> p
    //tipo 3 -> h
    constructor(tipo, value) {
        this.tipo = tipo;
        this.value = value;
    }
    getValue(principal) {
        if (this.tipo == 0) {
            return this.value;
        }
        else if (this.tipo == 1) {
            return principal.temporal[this.value];
        }
        else if (this.tipo == 2) {
            return principal.p;
        }
        else {
            return principal.h;
        }
    }
    setValue(value, principal) {
        if (this.tipo == 1) {
            principal.temporal[this.value] = value;
        }
        else if (this.tipo == 2) {
            principal.p = value;
        }
        else {
            principal.h = value;
        }
    }
}
exports.default = Literal;
//# sourceMappingURL=Literal.js.map