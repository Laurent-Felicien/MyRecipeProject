import { createCookieSessionStorage, redirect } from '@remix-run/node';

// Session utilisateur
const userSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__user_session',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14, // 14 jours
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
  },
});

// Session admin (cookie séparé, durée courte)
const adminSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__admin_session',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1, // 1 jour
    path: '/admin',
    sameSite: 'strict',
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
  },
});

// --- User ---

export async function createUserSession(userId: bigint, redirectTo: string) {
  const session = await userSessionStorage.getSession();
  session.set('userId', userId.toString());
  return redirect(redirectTo, {
    headers: { 'Set-Cookie': await userSessionStorage.commitSession(session) },
  });
}

export async function getUserSession(request: Request) {
  return userSessionStorage.getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request): Promise<bigint | null> {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return BigInt(userId);
}

export async function destroyUserSession(request: Request) {
  const session = await getUserSession(request);
  return redirect('/auth/login', {
    headers: { 'Set-Cookie': await userSessionStorage.destroySession(session) },
  });
}

// --- Admin ---

export async function createAdminSession(adminId: bigint, redirectTo: string) {
  const session = await adminSessionStorage.getSession();
  session.set('adminId', adminId.toString());
  return redirect(redirectTo, {
    headers: { 'Set-Cookie': await adminSessionStorage.commitSession(session) },
  });
}

export async function getAdminSession(request: Request) {
  return adminSessionStorage.getSession(request.headers.get('Cookie'));
}

export async function getAdminId(request: Request): Promise<bigint | null> {
  const session = await getAdminSession(request);
  const adminId = session.get('adminId');
  if (!adminId || typeof adminId !== 'string') return null;
  return BigInt(adminId);
}

export async function destroyAdminSession(request: Request) {
  const session = await getAdminSession(request);
  return redirect('/admin/login', {
    headers: { 'Set-Cookie': await adminSessionStorage.destroySession(session) },
  });
}
