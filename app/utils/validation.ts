import { z } from 'zod';

// --- Auth ---

export const signupSchema = z.object({
  name: z.string().min(2, 'Nom trop court').max(255),
  email: z.string().email('Email invalide').max(255),
  password: z.string()
    .min(8, 'Min 8 caractères')
    .regex(/[a-zA-Z]/, 'Au moins 1 lettre')
    .regex(/[0-9]/, 'Au moins 1 chiffre'),
  countryCode: z.string().length(2, 'Code pays invalide'),
  role: z.enum(['user', 'chef']),
  chefPresentation: z.string().min(200).max(500).optional(),
  chefSpecialty: z.enum(['entrée', 'plat', 'dessert', 'boisson', 'autre']).optional(),
}).refine(
  (d) => d.role !== 'chef' || (d.chefPresentation && d.chefSpecialty),
  { message: 'Présentation et spécialité obligatoires pour les chefs', path: ['chefPresentation'] }
);

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

// --- Recette ---

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Nom requis').max(255),
  quantity: z.coerce.number().positive('Quantité doit être positive'),
  unitCode: z.string().min(1).max(10),
  displayOrder: z.coerce.number().int().min(1).max(50),
});

export const stepSchema = z.object({
  content: z.string().min(1, 'Contenu requis'),
  stepOrder: z.coerce.number().int().min(1).max(30),
});

export const recipeSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(255),
  description: z.string().max(300).optional().nullable(),
  countryCode: z.string().length(2),
  category: z.enum(['entrée', 'plat', 'dessert', 'boisson']),
  difficulty: z.enum(['facile', 'moyen', 'difficile']),
  prepTimeMinutes: z.coerce.number().int().min(0),
  cookTimeMinutes: z.coerce.number().int().min(0),
  servings: z.coerce.number().int().min(1),
  videoUrl: z.string().url().optional().nullable(),
  ingredients: z.array(ingredientSchema).min(1, 'Au moins 1 ingrédient').max(50),
  steps: z.array(stepSchema).min(1, 'Au moins 1 étape').max(30),
});

// --- Commentaire ---

export const commentSchema = z.object({
  content: z.string().min(2, 'Min 2 caractères').max(1000, 'Max 1000 caractères'),
  parentCommentId: z.coerce.number().int().positive().optional().nullable(),
});

// --- Signalement ---

export const reportSchema = z.object({
  reason: z.enum(['spam', 'offensive_content', 'wrong_category', 'plagiarism', 'dangerous_content', 'other']),
  customReason: z.string().max(200).optional().nullable(),
}).refine(
  (d) => d.reason !== 'other' || (d.customReason && d.customReason.length > 0),
  { message: 'Raison obligatoire si "Autre"', path: ['customReason'] }
);

// --- Profil ---

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(255),
  bio: z.string().max(200).optional().nullable(),
  chefPresentation: z.string().min(200).max(500).optional().nullable(),
  chefSpecialty: z.enum(['entrée', 'plat', 'dessert', 'boisson', 'autre']).optional().nullable(),
});

// --- Helpers ---

export function parseFormData<T extends z.ZodTypeAny>(
  formData: FormData,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string[]> } {
  const raw = Object.fromEntries(formData);
  const result = schema.safeParse(raw);
  if (result.success) return { success: true, data: result.data };
  return { success: false, errors: result.error.flatten().fieldErrors as Record<string, string[]> };
}
