import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Réutiliser la connexion pour éviter le leak du hot-reload Vite
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({ log: ['query', 'warn', 'error'] });
  }
  prisma = global.__prisma;
}

export { prisma };
