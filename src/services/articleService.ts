import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { Article, PaginatedResponse } from '../types/article.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadArticles(): Article[] {
  const dataPath = join(__dirname, '../data/articles.json');
  const data = readFileSync(dataPath, 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.articles;
}

export function getArticles(options: {
  page?: number;
  limit?: number;
}): PaginatedResponse<Article> {
  const { page = 1, limit = 10 } = options;
  const articles = loadArticles();

  // Sort by publishedAt descending
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = sorted.slice(start, end);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

export function getFeaturedArticles(): Article[] {
  const articles = loadArticles();
  return articles
    .filter((article) => article.featured)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = loadArticles();
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  const articles = loadArticles();
  return articles
    .filter((article) => article.category.slug === categorySlug)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function searchArticles(query: string): Article[] {
  const articles = loadArticles();
  const lowerQuery = query.toLowerCase();

  return articles
    .filter((article) => {
      const searchableText = [
        article.title,
        article.excerpt,
        article.content,
        article.category.name,
        article.author.name,
        ...article.tags,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(lowerQuery);
    })
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}
