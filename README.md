# MyRecipeProject

Plateforme web de partage de recettes. Les chefs publient leurs recettes, les utilisateurs les découvrent, likent et commentent.

## Stack

- **Remix** (SSR, TypeScript)
- **Prisma** + **PostgreSQL** (Neon)
- **Tailwind CSS**
- **Cloudflare R2** (stockage médias)
- **Resend** (emails transactionnels)

## Prérequis

- Node.js 20+
- Un compte [Neon](https://neon.tech) pour la base de données
- Un bucket [Cloudflare R2](https://developers.cloudflare.com/r2/) pour les médias
- Un compte [Resend](https://resend.com) pour les emails

## Installation

```bash
git clone https://github.com/votre-username/myrecipeproject.git
cd myrecipeproject
npm install
cp .env.example .env
```

Renseignez les variables dans `.env`, puis :

```bash
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run lint` | Vérification du code |
| `npm run typecheck` | Vérification TypeScript |
| `npm test` | Tests |
| `npm run db:migrate` | Appliquer les migrations |
| `npm run db:seed` | Seed pays et unités |
| `npm run db:studio` | Interface Prisma Studio |
| `npm run db:resync` | Recalculer les compteurs |

## Structure

```
app/
├── routes/          # Pages et API (Remix file-based routing)
├── models/          # Accès aux données (Prisma)
├── services/        # Logique métier
├── utils/           # Auth, sessions, email, uploads, validation
├── components/      # Composants React
└── types/           # Types TypeScript partagés
prisma/
├── schema.prisma    # Schéma de la base de données
├── migrations/      # Migrations
└── seed.ts          # Données de référence
```

## Déploiement

L'application est conçue pour être déployée sur **Vercel** (frontend/backend) avec **Neon** (base de données).

## Licence

MIT
