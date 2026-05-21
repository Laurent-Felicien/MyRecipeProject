# MyRecipeProject

Plateforme web de partage de recettes. Les chefs publient leurs recettes, les utilisateurs les découvrent, likent et commentent.

## Stack

Remix · Prisma · PostgreSQL · Tailwind CSS · Cloudflare R2 · Resend

## Installation

```bash
git clone https://github.com/Laurent-Felicien/MyRecipeProject.git
cd MyRecipeProject
npm install
cp .env.example .env
```

Renseigne les variables dans `.env`, puis :

```bash
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Licence

MIT
