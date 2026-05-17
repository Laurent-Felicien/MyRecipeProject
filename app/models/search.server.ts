import { prisma } from '~/utils/db.server';

export async function searchRecipes(query: string, page: number = 1, perPage: number = 20) {
  if (!query.trim()) return { results: [], total: 0, page, perPage, totalPages: 0 };

  const tsQuery = query.trim().split(/\s+/).filter(Boolean).join(' & ');
  const offset = (page - 1) * perPage;

  const results = await prisma.$queryRaw<Array<{
    id: bigint; title: string; slug: string; description: string | null;
    cover_image_url: string; likes_count: number; comments_count: number;
    views_count: number; category: string; difficulty: string;
    prep_time_minutes: number; cook_time_minutes: number; servings: number;
    relevance: number; user_name: string; user_avatar: string | null;
  }>>`
    SELECT r.id, r.title, r.slug, r.description, r.cover_image_url,
           r.likes_count, r.comments_count, r.views_count,
           r.category, r.difficulty, r.prep_time_minutes,
           r.cook_time_minutes, r.servings,
           ts_rank(r.search_text, to_tsquery('french', ${tsQuery})) as relevance,
           u.name as user_name, u.avatar_url as user_avatar
    FROM recipes r
    JOIN users u ON r.user_id = u.id
    WHERE r.search_text @@ to_tsquery('french', ${tsQuery})
      AND r.published_at IS NOT NULL
      AND r.deleted_at IS NULL
    ORDER BY relevance DESC
    LIMIT ${perPage} OFFSET ${offset}
  `;

  const countResult = await prisma.$queryRaw<[{ count: bigint }]>`
    SELECT COUNT(*) as count FROM recipes
    WHERE search_text @@ to_tsquery('french', ${tsQuery})
      AND published_at IS NOT NULL AND deleted_at IS NULL
  `;

  const total = Number(countResult[0]?.count ?? 0);
  return { results, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}
