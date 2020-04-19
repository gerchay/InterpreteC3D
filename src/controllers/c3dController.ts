import {Request,Response} from 'express';

class C3dController{

    public index (req:Request,res:Response){
        res.render('body/editor',{layout : 'c3d'});
    }
}

export const c3dController = new C3dController();