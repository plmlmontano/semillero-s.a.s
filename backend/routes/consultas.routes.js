import {Router} from "express";
const router = Router();

import * as consultCtr from "../controllers/consultas.controllers";

router.get('/count', consultCtr.count);
router.get('/range-date', consultCtr.rangeDate);
router.get('/state', consultCtr.estate);
router.get('/state-linea-true', consultCtr.estateLineasTrue);
router.get('/state-linea-false', consultCtr.estateLineasFalse);
router.get('/count-linea-true', consultCtr.countLineaTrue);
router.get('/count-linea-false', consultCtr.countLineaFalse);
router.get('/max-min', consultCtr.maxMin);
router.get('/range-model-v1', consultCtr.rangeModeloV1);
router.get('/range-model-v2', consultCtr.rangeModeloV2);
router.get('/sum', consultCtr.sumModel);
router.get('/avg', consultCtr.averageModel);

export default router;