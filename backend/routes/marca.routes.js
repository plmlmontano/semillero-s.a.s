import {Router} from "express";
const router = Router();

import * as marcaCtr from "../controllers/marca.controllers";

router.get('/', marcaCtr.getAll);
router.post('/', marcaCtr.save);
export default router;