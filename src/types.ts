export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  pinned?: boolean;
  parentId?: string | null;
  parent?: Category | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  author: Author | string;
  category: Category | string;
  tags: (Tag | string)[];
  votes: number;
  createdAt: string;
}

export interface SearchResult {
  query: string;
  count: number;
  prompts: Prompt[];
}

export type { Tool, ToolInfo } from "./utils/tools";

export interface SelectedSkill {
  prompt: Prompt;
  name: string;
}

export interface FavoritePrompt {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  author: Author | string;
  category: Category | string;
  tags: (Tag | string)[];
  votes: number;
  createdAt: string;
  favoritedAt: string;
}

export const getAuthorName = (author: Author | string | undefined): string => {
  if (!author) return "Anonymous";
  if (typeof author === "string") return author;
  return author.name || author.username || "Anonymous";
};

export const getCategoryName = (
  category: Category | string | undefined,
): string => {
  if (!category) return "General";
  if (typeof category === "string") return category;
  return category.name || "General";
};

export const getTagName = (tag: Tag | string): string => {
  if (typeof tag === "string") return tag;
  return tag.name || tag.slug;
};
