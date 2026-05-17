import { prisma } from '~/utils/db.server';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

export async function generateUniqueRecipeSlug(title: string): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let counter = 1;
  while (await prisma.recipe.findUnique({ where: { slug } })) {
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
}

export async function generateUniqueChefSlug(name: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let counter = 1;
  while (await prisma.user.findFirst({ where: { chefSlug: slug } })) {
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
}
