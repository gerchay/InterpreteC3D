"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const c3dController_1 = require("../controllers/c3dController");
router.get('/', c3dController_1.c3dController.index);
router.post('/run', c3dController_1.c3dController.exec);
exports.default = router;
//# sourceMappingURL=c3dRoute.js.map