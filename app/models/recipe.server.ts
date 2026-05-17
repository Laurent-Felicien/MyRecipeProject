import { prisma } from '~/utils/db.server';

// Récupérer une recette par slug (protection brouillon incluse)
export async function getRecipeBySlug(slug: string, currentUserId?: bigint) {
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
    include: {
      user: { select: { id: true, name: true, avatarUrl: true, chefSlug: true } },
      country: true,
      ingredients: { orderBy: { displayOrder: 'asc' }, include: { unit: true } },
      steps: { orderBy: { stepOrder: 'asc' } },
      images: { orderBy: { displayOrder: 'asc' } },
    },
  });

  if (!recipe) return null;
  if (!recipe.publishedAt && recipe.userId !== currentUserId) return null;
  if (recipe.deletedAt) return null;
  return recipe;
}

// Recettes publiées avec pagination
export async function getPublishedRecipes(page: number = 1, perPage: number = 20) {
  const skip = (page - 1) * perPage;
  const [recipes, total] = await Promise.all([
    prisma.recipe.findMany({
      where: { publishedAt: { not: null }, deletedAt: null },
      orderBy: { publishedAt: 'desc' },
      skip, take: perPage,
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, chefSlug: true } },
        country: true,
      },
    }),
    prisma.recipe.count({ where: { publishedAt: { not: null }, deletedAt: null } }),
  ]);
  return { recipes, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

// Recettes d'un chef (dashboard)
export async function getChefRecipes(userId: bigint) {
  return prisma.recipe.findMany({
    where: { userId, deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: { country: true },
  });
}

// Par catégorie
export async function getRecipesByCategory(category: string, page: number = 1, perPage: number = 20) {
  const skip = (page - 1) * perPage;
  return prisma.recipe.findMany({
    where: { category, publishedAt: { not: null }, deletedAt: null },
    orderBy: { publishedAt: 'desc' },
    skip, take: perPage,
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
      country: true,
    },
  });
}

// Par pays d'origine culinaire
export async function getRecipesByCountry(countryCode: string, page: number = 1, perPage: number = 20) {
  const skip = (page - 1) * perPage;
  return prisma.recipe.findMany({
    where: { countryCode, publishedAt: { not: null }, deletedAt: null },
    orderBy: { publishedAt: 'desc' },
    skip, take: perPage,
    include: {
      user: { select: { id: true, name: true, avatarUrl: true } },
      country: true,
    },
  });
}
