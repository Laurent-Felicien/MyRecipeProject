-- Full-Text Search setup — run after prisma migrate deploy
-- All statements use IF NOT EXISTS / CREATE OR REPLACE for idempotency

ALTER TABLE recipes ADD COLUMN IF NOT EXISTS search_text TSVECTOR;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS search_text TSVECTOR;

CREATE INDEX IF NOT EXISTS idx_recipes_search_text ON recipes USING GIN(search_text);
CREATE INDEX IF NOT EXISTS idx_comments_search_text ON comments USING GIN(search_text);
CREATE INDEX IF NOT EXISTS idx_recipe_views_chrono ON recipe_views(viewed_at DESC);

CREATE OR REPLACE FUNCTION update_recipes_search_text()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_text := to_tsvector('french',
    COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.description, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_recipes_update_search_text ON recipes;
CREATE TRIGGER tr_recipes_update_search_text
  BEFORE INSERT OR UPDATE OF title, description ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_recipes_search_text();

CREATE OR REPLACE FUNCTION update_comments_search_text()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_text := to_tsvector('french', COALESCE(NEW.content, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_comments_update_search_text ON comments;
CREATE TRIGGER tr_comments_update_search_text
  BEFORE INSERT OR UPDATE OF content ON comments
  FOR EACH ROW EXECUTE FUNCTION update_comments_search_text();
