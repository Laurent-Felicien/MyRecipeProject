import { redirect } from '@remix-run/node';
import { prisma } from '~/utils/db.server';
import { getUserId, getAdminId } from '~/utils/session.server';

// Retourne le user connecté, redirige vers login sinon
export async function requireUser(request: Request) {
  const userId = await getUserId(request);
  if (!userId) throw redirect('/auth/login');

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.deletedAt || user.bannedAt) throw redirect('/auth/login');

  return user;
}

// Retourne le chef (role=chef + email vérifié)
export async function requireChef(request: Request) {
  const user = await requireUser(request);
  if (user.role !== 'chef') throw redirect('/dashboard');
  if (!user.emailVerifiedAt) throw redirect('/dashboard?error=email_not_verified');
  return user;
}

// Retourne le user avec email vérifié
export async function requireVerifiedUser(request: Request) {
  const user = await requireUser(request);
  if (!user.emailVerifiedAt) throw redirect('/dashboard?error=email_not_verified');
  return user;
}

// Retourne l'admin connecté, redirige vers admin/login sinon
export async function requireAdmin(request: Request) {
  const adminId = await getAdminId(request);
  if (!adminId) throw redirect('/admin/login');

  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) throw redirect('/admin/login');

  prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  }).catch(() => {});

  return admin;
}

// Retourne le user si connecté, null sinon (pas de redirection)
export async function getOptionalUser(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.deletedAt || user.bannedAt) return null;
  return user;
}

// --- Helpers d'autorisation ---

export function canEditRecipe(userId: bigint, recipeUserId: bigint): boolean {
  return userId === recipeUserId;
}

export function canDeleteComment(
  userId: bigint,
  commentUserId: bigint,
  recipeUserId: bigint
): boolean {
  if (userId === commentUserId) return true;
  if (userId === recipeUserId) return true;
  return false;
}
