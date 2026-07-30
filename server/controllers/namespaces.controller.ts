import type { Response, Request } from 'express';
import { createNamespaceService, deleteNamespaceService, getNamespacesService } from '../services/namespaces.service.ts';

export async function getNamespacesController(req: Request, res: Response) {
  try {
    const namespaces = await getNamespacesService();
    res.send(namespaces);
  } catch (e) {
    res.status(500).json({
      message: (e as Error).message
    });
  }
}
export async function createNamespaceController(req: Request<{}, {}, { namespace: string; }>, res: Response) {
  try {
    const created = await createNamespaceService(req.body.namespace);
    res.send(created);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
}

export async function deleteNamespaceController(req: Request<{ namespace: string; }>, res: Response) {
  try {
    await deleteNamespaceService(req.params.namespace);
    res.status(204);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
}