"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C3dController {
    index(req, res) {
        res.render('body/editor', { layout: 'c3d' });
    }
    exec(req, res) {
        var parser = require('../c3d/grammar');
        const { text } = req.body;
        let interprete = parser.parse(text);
        interprete.clear();
        interprete.ejecutar();
        res.json(interprete.report());
    }
}
exports.c3dController = new C3dController();
/*import fs from 'fs';
try{
    const entrada = fs.readFileSync('./src/entrada.txt');
    let interprete = parser.parse(entrada.toString());
    interprete.ejecutar();
    //console.log(interprete);
}
catch(err){
    console.log(err);
}*/
//# sourceMappingURL=c3dController.js.map