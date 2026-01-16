export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  featuredImage: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export type CategorySlug =
  | 'race-reviews'
  | 'driver-profiles'
  | 'team-news'
  | 'tech-analysis';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  color: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
