-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMPTZ,
    "role" VARCHAR(50) NOT NULL DEFAULT 'user',
    "avatar_url" TEXT,
    "bio" TEXT,
    "chef_presentation" TEXT,
    "chef_specialty" VARCHAR(50),
    "chef_slug" VARCHAR(255),
    "banned_at" TIMESTAMPTZ,
    "ban_reason" TEXT,
    "country_code" CHAR(2) NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "code" CHAR(2) NOT NULL,
    "name_fr" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "emoji_flag" VARCHAR(10),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "country_code" CHAR(2) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "difficulty" VARCHAR(50) NOT NULL,
    "cover_image_url" TEXT NOT NULL,
    "video_url" TEXT,
    "prep_time_minutes" INTEGER NOT NULL,
    "cook_time_minutes" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "published_at" TIMESTAMPTZ,
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "edit_count" INTEGER NOT NULL DEFAULT 0,
    "last_edited_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,
    "deletion_reason" VARCHAR(50),
    "deleted_by_user_id" BIGINT,
    "deleted_by_admin_id" BIGINT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" BIGSERIAL NOT NULL,
    "recipe_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "unit_code" CHAR(10) NOT NULL,
    "display_order" SMALLINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "steps" (
    "id" BIGSERIAL NOT NULL,
    "recipe_id" BIGINT NOT NULL,
    "step_order" SMALLINT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_images" (
    "id" BIGSERIAL NOT NULL,
    "recipe_id" BIGINT NOT NULL,
    "image_url" TEXT NOT NULL,
    "display_order" SMALLINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "recipe_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "code" CHAR(10) NOT NULL,
    "label_fr" VARCHAR(255) NOT NULL,
    "label_short_fr" VARCHAR(50) NOT NULL,
    "category" VARCHAR(50) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "recipe_edits" (
    "id" BIGSERIAL NOT NULL,
    "recipe_id" BIGINT NOT NULL,
    "edited_by_user_id" BIGINT NOT NULL,
    "changes_summary" JSONB NOT NULL,
    "edited_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_edits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "recipe_id" BIGINT NOT NULL,
    "liked_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "recipe_id" BIGINT NOT NULL,
    "parent_comment_id" BIGINT,
    "content" TEXT NOT NULL,
    "replies_count" INTEGER NOT NULL DEFAULT 0,
    "edit_count" INTEGER NOT NULL DEFAULT 0,
    "last_edited_at" TIMESTAMPTZ,
    "deleted_at" TIMESTAMPTZ,
    "deletion_reason" VARCHAR(50),
    "deleted_by_user_id" BIGINT,
    "deleted_by_admin_id" BIGINT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_views" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "recipe_id" BIGINT NOT NULL,
    "viewed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_edits" (
    "id" BIGSERIAL NOT NULL,
    "comment_id" BIGINT NOT NULL,
    "edited_by_user_id" BIGINT NOT NULL,
    "changes_summary" JSONB NOT NULL,
    "edited_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_edits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" BIGSERIAL NOT NULL,
    "reported_by_user_id" BIGINT NOT NULL,
    "reportable_type" VARCHAR(50) NOT NULL,
    "reportable_id" BIGINT NOT NULL,
    "reason" VARCHAR(50) NOT NULL,
    "custom_reason" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "resolved_by_action_id" BIGINT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moderation_actions" (
    "id" BIGSERIAL NOT NULL,
    "performed_by_admin_id" BIGINT NOT NULL,
    "action_type" VARCHAR(50) NOT NULL,
    "reason" TEXT NOT NULL,
    "targetable_type" VARCHAR(50),
    "targetable_id" BIGINT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "moderation_actions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_chef_slug_key" ON "users"("chef_slug");

-- CreateIndex
CREATE INDEX "users_country_code_idx" ON "users"("country_code");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_banned_at_idx" ON "users"("banned_at");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_slug_key" ON "recipes"("slug");

-- CreateIndex
CREATE INDEX "recipes_user_id_idx" ON "recipes"("user_id");

-- CreateIndex
CREATE INDEX "recipes_country_code_idx" ON "recipes"("country_code");

-- CreateIndex
CREATE INDEX "recipes_category_idx" ON "recipes"("category");

-- CreateIndex
CREATE INDEX "recipes_published_at_idx" ON "recipes"("published_at" DESC);

-- CreateIndex
CREATE INDEX "recipes_deleted_at_idx" ON "recipes"("deleted_at");

-- CreateIndex
CREATE INDEX "recipes_user_id_deleted_at_idx" ON "recipes"("user_id", "deleted_at");

-- CreateIndex
CREATE INDEX "ingredients_recipe_id_idx" ON "ingredients"("recipe_id");

-- CreateIndex
CREATE INDEX "ingredients_recipe_id_display_order_idx" ON "ingredients"("recipe_id", "display_order");

-- CreateIndex
CREATE INDEX "steps_recipe_id_idx" ON "steps"("recipe_id");

-- CreateIndex
CREATE INDEX "steps_recipe_id_step_order_idx" ON "steps"("recipe_id", "step_order");

-- CreateIndex
CREATE UNIQUE INDEX "steps_recipe_id_step_order_key" ON "steps"("recipe_id", "step_order");

-- CreateIndex
CREATE INDEX "recipe_images_recipe_id_idx" ON "recipe_images"("recipe_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_images_recipe_id_display_order_key" ON "recipe_images"("recipe_id", "display_order");

-- CreateIndex
CREATE INDEX "recipe_edits_recipe_id_idx" ON "recipe_edits"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_edits_edited_by_user_id_idx" ON "recipe_edits"("edited_by_user_id");

-- CreateIndex
CREATE INDEX "recipe_edits_recipe_id_edited_at_idx" ON "recipe_edits"("recipe_id", "edited_at" DESC);

-- CreateIndex
CREATE INDEX "likes_recipe_id_idx" ON "likes"("recipe_id");

-- CreateIndex
CREATE INDEX "likes_user_id_idx" ON "likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_recipe_id_key" ON "likes"("user_id", "recipe_id");

-- CreateIndex
CREATE INDEX "comments_recipe_id_idx" ON "comments"("recipe_id");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_parent_comment_id_idx" ON "comments"("parent_comment_id");

-- CreateIndex
CREATE INDEX "comments_deleted_at_idx" ON "comments"("deleted_at");

-- CreateIndex
CREATE INDEX "comments_recipe_id_parent_comment_id_deleted_at_idx" ON "comments"("recipe_id", "parent_comment_id", "deleted_at");

-- CreateIndex
CREATE INDEX "recipe_views_recipe_id_idx" ON "recipe_views"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_views_user_id_idx" ON "recipe_views"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_views_user_id_recipe_id_key" ON "recipe_views"("user_id", "recipe_id");

-- CreateIndex
CREATE INDEX "comment_edits_comment_id_idx" ON "comment_edits"("comment_id");

-- CreateIndex
CREATE INDEX "comment_edits_comment_id_edited_at_idx" ON "comment_edits"("comment_id", "edited_at" DESC);

-- CreateIndex
CREATE INDEX "reports_reported_by_user_id_idx" ON "reports"("reported_by_user_id");

-- CreateIndex
CREATE INDEX "reports_reportable_type_reportable_id_idx" ON "reports"("reportable_type", "reportable_id");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_resolved_by_action_id_idx" ON "reports"("resolved_by_action_id");

-- CreateIndex
CREATE INDEX "reports_status_created_at_idx" ON "reports"("status", "created_at" DESC);

-- CreateIndex
CREATE INDEX "moderation_actions_performed_by_admin_id_idx" ON "moderation_actions"("performed_by_admin_id");

-- CreateIndex
CREATE INDEX "moderation_actions_targetable_type_targetable_id_idx" ON "moderation_actions"("targetable_type", "targetable_id");

-- CreateIndex
CREATE INDEX "moderation_actions_action_type_idx" ON "moderation_actions"("action_type");

-- CreateIndex
CREATE INDEX "moderation_actions_created_at_idx" ON "moderation_actions"("created_at" DESC);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_country_code_fkey" FOREIGN KEY ("country_code") REFERENCES "countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_deleted_by_user_id_fkey" FOREIGN KEY ("deleted_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_deleted_by_admin_id_fkey" FOREIGN KEY ("deleted_by_admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_unit_code_fkey" FOREIGN KEY ("unit_code") REFERENCES "units"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_images" ADD CONSTRAINT "recipe_images_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_edits" ADD CONSTRAINT "recipe_edits_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_edits" ADD CONSTRAINT "recipe_edits_edited_by_user_id_fkey" FOREIGN KEY ("edited_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_deleted_by_user_id_fkey" FOREIGN KEY ("deleted_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_deleted_by_admin_id_fkey" FOREIGN KEY ("deleted_by_admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_views" ADD CONSTRAINT "recipe_views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_views" ADD CONSTRAINT "recipe_views_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_edits" ADD CONSTRAINT "comment_edits_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_edits" ADD CONSTRAINT "comment_edits_edited_by_user_id_fkey" FOREIGN KEY ("edited_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reported_by_user_id_fkey" FOREIGN KEY ("reported_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_resolved_by_action_id_fkey" FOREIGN KEY ("resolved_by_action_id") REFERENCES "moderation_actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moderation_actions" ADD CONSTRAINT "moderation_actions_performed_by_admin_id_fkey" FOREIGN KEY ("performed_by_admin_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
