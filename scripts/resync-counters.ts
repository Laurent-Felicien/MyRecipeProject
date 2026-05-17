// scripts/resync-counters.ts
// Recalcule les compteurs dénormalisés depuis la source de vérité
// Usage : npx tsx scripts/resync-counters.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resync() {
  console.log('Resync des compteurs...');

  // Recettes
  const recipes = await prisma.recipe.findMany({ select: { id: true } });
  let updated = 0;

  for (const recipe of recipes) {
    const [likesCount, commentsCount, viewsCount, editCount] = await Promise.all([
      prisma.like.count({ where: { recipeId: recipe.id } }),
      prisma.comment.count({ where: { recipeId: recipe.id, deletedAt: null } }),
      prisma.recipeView.count({ where: { recipeId: recipe.id } }),
      prisma.recipeEdit.count({ where: { recipeId: recipe.id } }),
    ]);

    await prisma.recipe.update({
      where: { id: recipe.id },
      data: { likesCount, commentsCount, viewsCount, editCount },
    });
    updated++;
  }
  console.log(`✅ ${updated} recettes mises à jour.`);

  // Commentaires (replies_count)
  const comments = await prisma.comment.findMany({
    where: { parentCommentId: null },
    select: { id: true },
  });
  let commentsUpdated = 0;

  for (const comment of comments) {
    const repliesCount = await prisma.comment.count({
      where: { parentCommentId: comment.id, deletedAt: null },
    });
    await prisma.comment.update({
      where: { id: comment.id },
      data: { repliesCount },
    });
    commentsUpdated++;
  }
  console.log(`✅ ${commentsUpdated} commentaires (replies_count) mis à jour.`);

  console.log('Resync terminé.');
}

resync()
  .catch((e) => { console.error('Erreur resync :', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
