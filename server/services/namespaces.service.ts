import { createNamespace, deleteNamespace, getNamespaces } from '../repositories/namespace.repository.ts';

export async function getNamespacesService() {
  const namespaces = await getNamespaces();

  const mappedNamespaces = namespaces.map((namespace) => ({
    createdAt: namespace.created_at,
    name: namespace.name
  }));

  return mappedNamespaces;
}

export async function createNamespaceService(namespace: string) {
  const created = await createNamespace(namespace);
  return created;
}

export async function deleteNamespaceService(namespace: string) {
  return await deleteNamespace(namespace);
}