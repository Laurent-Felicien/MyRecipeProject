-- CHECK constraints

ALTER TABLE users ADD CONSTRAINT ck_users_role
  CHECK (role IN ('user', 'chef'));
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_category
  CHECK (category IN ('entrée', 'plat', 'dessert', 'boisson'));
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_difficulty
  CHECK (difficulty IN ('facile', 'moyen', 'difficile'));
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_deletion_reason
  CHECK (deletion_reason IS NULL OR deletion_reason IN ('by_owner', 'by_admin_moderation', 'by_admin_other'));
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_soft_delete
  CHECK ((deleted_at IS NULL) OR (deleted_by_user_id IS NOT NULL OR deleted_by_admin_id IS NOT NULL));
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_prep_time CHECK (prep_time_minutes >= 0);
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_cook_time CHECK (cook_time_minutes >= 0);
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_servings CHECK (servings >= 1);
ALTER TABLE recipes ADD CONSTRAINT ck_recipes_counters
  CHECK (likes_count >= 0 AND comments_count >= 0 AND views_count >= 0 AND edit_count >= 0);
ALTER TABLE ingredients ADD CONSTRAINT ck_ingredients_quantity CHECK (quantity > 0);
ALTER TABLE ingredients ADD CONSTRAINT ck_ingredients_order
  CHECK (display_order >= 1 AND display_order <= 50);
ALTER TABLE steps ADD CONSTRAINT ck_steps_order
  CHECK (step_order >= 1 AND step_order <= 30);
ALTER TABLE recipe_images ADD CONSTRAINT ck_recipe_images_order
  CHECK (display_order >= 1 AND display_order <= 8);
ALTER TABLE units ADD CONSTRAINT ck_units_category
  CHECK (category IN ('weight', 'volume', 'count'));
ALTER TABLE comments ADD CONSTRAINT ck_comments_content_length
  CHECK (length(content) >= 2 AND length(content) <= 1000);
ALTER TABLE comments ADD CONSTRAINT ck_comments_deletion_reason
  CHECK (deletion_reason IS NULL OR deletion_reason IN ('by_author', 'by_recipe_owner', 'by_admin'));
ALTER TABLE comments ADD CONSTRAINT ck_comments_soft_delete
  CHECK ((deleted_at IS NULL) OR (deleted_by_user_id IS NOT NULL OR deleted_by_admin_id IS NOT NULL));
ALTER TABLE comments ADD CONSTRAINT ck_comments_counters
  CHECK (replies_count >= 0 AND edit_count >= 0);
ALTER TABLE reports ADD CONSTRAINT ck_reports_reportable_type
  CHECK (reportable_type IN ('recipe', 'comment'));
ALTER TABLE reports ADD CONSTRAINT ck_reports_reason
  CHECK (reason IN ('spam', 'offensive_content', 'wrong_category', 'plagiarism', 'dangerous_content', 'other'));
ALTER TABLE reports ADD CONSTRAINT ck_reports_status
  CHECK (status IN ('pending', 'dismissed', 'upheld_content_removed', 'upheld_user_banned'));
ALTER TABLE reports ADD CONSTRAINT ck_reports_custom_reason
  CHECK (reason != 'other' OR custom_reason IS NOT NULL);
ALTER TABLE moderation_actions ADD CONSTRAINT ck_moderation_action_type
  CHECK (action_type IN ('dismiss_report', 'delete_recipe', 'delete_comment', 'ban_user', 'unban_user'));
ALTER TABLE moderation_actions ADD CONSTRAINT ck_moderation_targetable_type
  CHECK (targetable_type IS NULL OR targetable_type IN ('recipe', 'comment', 'user', 'report'));
ALTER TABLE moderation_actions ADD CONSTRAINT ck_moderation_action_target_coherence CHECK (
  (action_type = 'dismiss_report' AND targetable_type = 'report' AND targetable_id IS NOT NULL)
  OR (action_type = 'delete_recipe' AND targetable_type = 'recipe' AND targetable_id IS NOT NULL)
  OR (action_type = 'delete_comment' AND targetable_type = 'comment' AND targetable_id IS NOT NULL)
  OR (action_type IN ('ban_user', 'unban_user') AND targetable_type = 'user' AND targetable_id IS NOT NULL)
);

-- Strategic indexes (Prisma-managed)
CREATE INDEX IF NOT EXISTS idx_users_email_active ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_recipes_user_active ON recipes(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_recipes_country_active ON recipes(country_code) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_recipes_category_active ON recipes(category) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_comments_recipe_active ON comments(recipe_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_comments_user_active ON comments(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_recipes_published_active
  ON recipes(published_at DESC, created_at DESC)
  WHERE published_at IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_recipes_chef_dashboard
  ON recipes(user_id, published_at DESC, deleted_at)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_comments_recipe_thread
  ON comments(recipe_id, parent_comment_id, created_at DESC)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_reports_pending_recent
  ON reports(status, created_at DESC)
  WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_recipes_created_brin
  ON recipes USING BRIN(created_at)
  WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_moderation_actions_chrono
  ON moderation_actions(created_at DESC);
