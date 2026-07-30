import { Router } from 'express';
import { createNamespaceController, deleteNamespaceController, getNamespacesController } from '../controllers/namespaces.controller.ts';

const namespaceRouter = Router();

namespaceRouter.get('/', getNamespacesController);
namespaceRouter.post('/', createNamespaceController);
namespaceRouter.delete('/:namespace', deleteNamespaceController);

export default namespaceRouter;