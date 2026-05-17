import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du seed...');

  // Pays (ISO 3166-1 alpha-2)
  const countries = [
    { code: 'CI', nameFr: "Côte d'Ivoire", nameEn: 'Ivory Coast', emojiFlag: '🇨🇮' },
    { code: 'SN', nameFr: 'Sénégal', nameEn: 'Senegal', emojiFlag: '🇸🇳' },
    { code: 'ML', nameFr: 'Mali', nameEn: 'Mali', emojiFlag: '🇲🇱' },
    { code: 'BF', nameFr: 'Burkina Faso', nameEn: 'Burkina Faso', emojiFlag: '🇧🇫' },
    { code: 'GN', nameFr: 'Guinée', nameEn: 'Guinea', emojiFlag: '🇬🇳' },
    { code: 'CM', nameFr: 'Cameroun', nameEn: 'Cameroon', emojiFlag: '🇨🇲' },
    { code: 'NG', nameFr: 'Nigeria', nameEn: 'Nigeria', emojiFlag: '🇳🇬' },
    { code: 'GH', nameFr: 'Ghana', nameEn: 'Ghana', emojiFlag: '🇬🇭' },
    { code: 'TG', nameFr: 'Togo', nameEn: 'Togo', emojiFlag: '🇹🇬' },
    { code: 'BJ', nameFr: 'Bénin', nameEn: 'Benin', emojiFlag: '🇧🇯' },
    { code: 'NE', nameFr: 'Niger', nameEn: 'Niger', emojiFlag: '🇳🇪' },
    { code: 'CD', nameFr: 'RD Congo', nameEn: 'DR Congo', emojiFlag: '🇨🇩' },
    { code: 'CG', nameFr: 'Congo', nameEn: 'Congo', emojiFlag: '🇨🇬' },
    { code: 'GA', nameFr: 'Gabon', nameEn: 'Gabon', emojiFlag: '🇬🇦' },
    { code: 'ZA', nameFr: 'Afrique du Sud', nameEn: 'South Africa', emojiFlag: '🇿🇦' },
    { code: 'KE', nameFr: 'Kenya', nameEn: 'Kenya', emojiFlag: '🇰🇪' },
    { code: 'ET', nameFr: 'Éthiopie', nameEn: 'Ethiopia', emojiFlag: '🇪🇹' },
    { code: 'MG', nameFr: 'Madagascar', nameEn: 'Madagascar', emojiFlag: '🇲🇬' },
    { code: 'MA', nameFr: 'Maroc', nameEn: 'Morocco', emojiFlag: '🇲🇦' },
    { code: 'TN', nameFr: 'Tunisie', nameEn: 'Tunisia', emojiFlag: '🇹🇳' },
    { code: 'DZ', nameFr: 'Algérie', nameEn: 'Algeria', emojiFlag: '🇩🇿' },
    { code: 'EG', nameFr: 'Égypte', nameEn: 'Egypt', emojiFlag: '🇪🇬' },
    { code: 'FR', nameFr: 'France', nameEn: 'France', emojiFlag: '🇫🇷' },
    { code: 'IT', nameFr: 'Italie', nameEn: 'Italy', emojiFlag: '🇮🇹' },
    { code: 'ES', nameFr: 'Espagne', nameEn: 'Spain', emojiFlag: '🇪🇸' },
    { code: 'PT', nameFr: 'Portugal', nameEn: 'Portugal', emojiFlag: '🇵🇹' },
    { code: 'DE', nameFr: 'Allemagne', nameEn: 'Germany', emojiFlag: '🇩🇪' },
    { code: 'GB', nameFr: 'Royaume-Uni', nameEn: 'United Kingdom', emojiFlag: '🇬🇧' },
    { code: 'BE', nameFr: 'Belgique', nameEn: 'Belgium', emojiFlag: '🇧🇪' },
    { code: 'CH', nameFr: 'Suisse', nameEn: 'Switzerland', emojiFlag: '🇨🇭' },
    { code: 'GR', nameFr: 'Grèce', nameEn: 'Greece', emojiFlag: '🇬🇷' },
    { code: 'TR', nameFr: 'Turquie', nameEn: 'Turkey', emojiFlag: '🇹🇷' },
    { code: 'US', nameFr: 'États-Unis', nameEn: 'United States', emojiFlag: '🇺🇸' },
    { code: 'CA', nameFr: 'Canada', nameEn: 'Canada', emojiFlag: '🇨🇦' },
    { code: 'MX', nameFr: 'Mexique', nameEn: 'Mexico', emojiFlag: '🇲🇽' },
    { code: 'BR', nameFr: 'Brésil', nameEn: 'Brazil', emojiFlag: '🇧🇷' },
    { code: 'AR', nameFr: 'Argentine', nameEn: 'Argentina', emojiFlag: '🇦🇷' },
    { code: 'PE', nameFr: 'Pérou', nameEn: 'Peru', emojiFlag: '🇵🇪' },
    { code: 'CO', nameFr: 'Colombie', nameEn: 'Colombia', emojiFlag: '🇨🇴' },
    { code: 'HT', nameFr: 'Haïti', nameEn: 'Haiti', emojiFlag: '🇭🇹' },
    { code: 'JP', nameFr: 'Japon', nameEn: 'Japan', emojiFlag: '🇯🇵' },
    { code: 'CN', nameFr: 'Chine', nameEn: 'China', emojiFlag: '🇨🇳' },
    { code: 'IN', nameFr: 'Inde', nameEn: 'India', emojiFlag: '🇮🇳' },
    { code: 'TH', nameFr: 'Thaïlande', nameEn: 'Thailand', emojiFlag: '🇹🇭' },
    { code: 'VN', nameFr: 'Vietnam', nameEn: 'Vietnam', emojiFlag: '🇻🇳' },
    { code: 'KR', nameFr: 'Corée du Sud', nameEn: 'South Korea', emojiFlag: '🇰🇷' },
    { code: 'LB', nameFr: 'Liban', nameEn: 'Lebanon', emojiFlag: '🇱🇧' },
  ];

  for (const c of countries) {
    await prisma.country.upsert({ where: { code: c.code }, update: {}, create: c });
  }
  console.log(`${countries.length} pays insérés.`);

  // Unités de mesure
  const units = [
    { code: 'g', labelFr: 'gramme', labelShortFr: 'g', category: 'weight' },
    { code: 'kg', labelFr: 'kilogramme', labelShortFr: 'kg', category: 'weight' },
    { code: 'oz', labelFr: 'once', labelShortFr: 'oz', category: 'weight' },
    { code: 'lb', labelFr: 'livre', labelShortFr: 'lb', category: 'weight' },
    { code: 'ml', labelFr: 'millilitre', labelShortFr: 'ml', category: 'volume' },
    { code: 'cl', labelFr: 'centilitre', labelShortFr: 'cl', category: 'volume' },
    { code: 'l', labelFr: 'litre', labelShortFr: 'l', category: 'volume' },
    { code: 'tsp', labelFr: 'cuillère à café', labelShortFr: 'c. à c.', category: 'volume' },
    { code: 'tbsp', labelFr: 'cuillère à soupe', labelShortFr: 'c. à s.', category: 'volume' },
    { code: 'cup', labelFr: 'tasse', labelShortFr: 'tasse', category: 'volume' },
    { code: 'fl_oz', labelFr: 'once liquide', labelShortFr: 'fl oz', category: 'volume' },
    { code: 'piece', labelFr: 'pièce', labelShortFr: 'pc', category: 'count' },
    { code: 'pinch', labelFr: 'pincée', labelShortFr: 'pincée', category: 'count' },
    { code: 'bunch', labelFr: 'botte', labelShortFr: 'botte', category: 'count' },
    { code: 'slice', labelFr: 'tranche', labelShortFr: 'tr.', category: 'count' },
    { code: 'clove', labelFr: 'gousse', labelShortFr: 'gousse', category: 'count' },
    { code: 'leaf', labelFr: 'feuille', labelShortFr: 'feuille', category: 'count' },
    { code: 'can', labelFr: 'boîte', labelShortFr: 'boîte', category: 'count' },
    { code: 'sachet', labelFr: 'sachet', labelShortFr: 'sachet', category: 'count' },
  ];

  for (const u of units) {
    await prisma.unit.upsert({ where: { code: u.code }, update: {}, create: u });
  }
  console.log(`${units.length} unités insérées.`);

  console.log('Seed terminé.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
