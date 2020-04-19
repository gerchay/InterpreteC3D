import {Request,Response} from 'express';
import Principal from '../c3d/principal';
var parser = require('../c3d/grammar');

class C3dController{

    public index (req:Request,res:Response){
        res.render('body/editor',{layout : 'c3d'});
    }

    public exec(req:Request, res:Response){
        const {text} = req.body;
        let interprete = parser.parse(text);
        interprete.ejecutar();
        res.json(interprete.report());
    }
}

export const c3dController = new C3dController();

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
