import {Request,Response} from 'express';
import Principal from '../c3d/principal';

class C3dController{

    public index (req:Request,res:Response){
        res.render('body/editor',{layout : 'c3d'});
    }

    public exec(req:Request, res:Response){
        var parser = require('../c3d/grammar');
        const {text} = req.body;
        try{
            let interprete = parser.parse(text);
            interprete.clear();
            interprete.ejecutar();
            res.json(interprete.report());
    
        }
        catch(err){
            res.json({
                salida : "Error de sintaxis mula",
                temps : [],
                heap : [],
                stack : [],
                h : 0,
                p : 0
            });
        }
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
