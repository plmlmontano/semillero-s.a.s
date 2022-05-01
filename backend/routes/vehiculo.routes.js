import {Router} from "express";
const router = Router();

import * as vehiculoCtr from "../controllers/vehiculo.controllers";

router.get('/', vehiculoCtr.getAll);
router.get('/all', vehiculoCtr.all);
router.get('/:placa', vehiculoCtr.getByPlaca);
router.post('/', vehiculoCtr.save);
router.put('/:placa', vehiculoCtr.update);
router.delete('/:placa', vehiculoCtr.deleteByPlaca);
export default router;