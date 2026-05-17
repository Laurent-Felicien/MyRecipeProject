export const UserRole = { USER: 'user', CHEF: 'chef' } as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const RecipeCategory = { ENTREE: 'entrée', PLAT: 'plat', DESSERT: 'dessert', BOISSON: 'boisson' } as const;
export type RecipeCategory = (typeof RecipeCategory)[keyof typeof RecipeCategory];

export const RecipeDifficulty = { FACILE: 'facile', MOYEN: 'moyen', DIFFICILE: 'difficile' } as const;
export type RecipeDifficulty = (typeof RecipeDifficulty)[keyof typeof RecipeDifficulty];

export const ReportReason = { SPAM: 'spam', OFFENSIVE: 'offensive_content', WRONG_CATEGORY: 'wrong_category', PLAGIARISM: 'plagiarism', DANGEROUS: 'dangerous_content', OTHER: 'other' } as const;
export type ReportReason = (typeof ReportReason)[keyof typeof ReportReason];

export const ReportStatus = { PENDING: 'pending', DISMISSED: 'dismissed', UPHELD_CONTENT_REMOVED: 'upheld_content_removed', UPHELD_USER_BANNED: 'upheld_user_banned' } as const;
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];

export const ModerationActionType = { DISMISS_REPORT: 'dismiss_report', DELETE_RECIPE: 'delete_recipe', DELETE_COMMENT: 'delete_comment', BAN_USER: 'ban_user', UNBAN_USER: 'unban_user' } as const;
export type ModerationActionType = (typeof ModerationActionType)[keyof typeof ModerationActionType];

export const DeletionReason = { BY_OWNER: 'by_owner', BY_ADMIN_MODERATION: 'by_admin_moderation', BY_ADMIN_OTHER: 'by_admin_other' } as const;
export const CommentDeletionReason = { BY_AUTHOR: 'by_author', BY_RECIPE_OWNER: 'by_recipe_owner', BY_ADMIN: 'by_admin' } as const;
export const UnitCategory = { WEIGHT: 'weight', VOLUME: 'volume', COUNT: 'count' } as const;

export const RECIPE_CATEGORIES = Object.values(RecipeCategory);
export const RECIPE_DIFFICULTIES = Object.values(RecipeDifficulty);
export const REPORT_REASONS = Object.values(ReportReason);
