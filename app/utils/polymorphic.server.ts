import { prisma } from '~/utils/db.server';

// Résolution du contenu signalé (recette ou commentaire)
export async function getReportable(type: string, id: bigint) {
  if (type === 'recipe') {
    const data = await prisma.recipe.findUnique({ where: { id }, include: { user: true } });
    return data ? { kind: 'recipe' as const, data } : null;
  }
  if (type === 'comment') {
    const data = await prisma.comment.findUnique({ where: { id }, include: { user: true, recipe: true } });
    return data ? { kind: 'comment' as const, data } : null;
  }
  return null;
}

// Résolution de la cible d'une action de modération
export async function getModerationTarget(type: string, id: bigint) {
  switch (type) {
    case 'recipe':
      return { kind: 'recipe' as const, data: await prisma.recipe.findUnique({ where: { id } }) };
    case 'comment':
      return { kind: 'comment' as const, data: await prisma.comment.findUnique({ where: { id } }) };
    case 'user':
      return { kind: 'user' as const, data: await prisma.user.findUnique({ where: { id } }) };
    case 'report':
      return { kind: 'report' as const, data: await prisma.report.findUnique({ where: { id } }) };
    default:
      return null;
  }
}
