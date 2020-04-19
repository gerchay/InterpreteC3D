import {Router} from 'express';

const router:Router = Router();

import {c3dController} from '../controllers/c3dController';

router.get('/',c3dController.index);

router.post('/run',c3dController.exec);

export default router;

