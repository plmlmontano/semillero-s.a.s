import {Router} from "express";
const router = Router();

import * as lineaCtr from "../controllers/linea.controllers";

router.get('/', lineaCtr.getAll);
router.post('/', lineaCtr.save);
export default router;