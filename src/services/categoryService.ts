import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { Category } from '../types/article.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadCategories(): Category[] {
  const dataPath = join(__dirname, '../data/categories.json');
  const data = readFileSync(dataPath, 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.categories;
}

export function getCategories(): Category[] {
  return loadCategories();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = loadCategories();
  return categories.find((category) => category.slug === slug);
}
