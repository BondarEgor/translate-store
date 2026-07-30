import { Router } from 'express';
import { createTranslationController, deleteTranslationController, getTranslationsController, updateAllTranslationByKeyController, updateTranslationController } from '../controllers/translations.service.ts';

const translationsRouter = Router();

translationsRouter.get('/', getTranslationsController);
translationsRouter.post('/', createTranslationController);
translationsRouter.delete('/:locale/:key', deleteTranslationController);
translationsRouter.put('/:namespace/:locale/:key', updateTranslationController);
translationsRouter.put('/:namespace/:locale/:key/all', updateAllTranslationByKeyController);

export default translationsRouter;