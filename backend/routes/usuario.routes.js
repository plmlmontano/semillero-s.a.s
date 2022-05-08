import {Router} from "express";
const router = Router();

import * as usuarioCtr from "../controllers/usuario.controllers";

router.get('/', usuarioCtr.getAll);
router.post('/', usuarioCtr.save);
export default router;