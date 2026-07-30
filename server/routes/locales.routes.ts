import { Router } from 'express';
import { createLocaleController, deleteLocaleController, getLocalesController } from '../controllers/locales.controller.ts';

const router = Router();

router.get('/', getLocalesController);
router.post('/', createLocaleController);
router.delete('/:locale', deleteLocaleController);

export default router;