import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import type { Prompt, FavoritePrompt } from "../types";

const FAVORITES_DIR = join(homedir(), ".skills-chat");
const FAVORITES_FILE = join(FAVORITES_DIR, "favorites.json");

function ensureDir(): void {
  if (!existsSync(FAVORITES_DIR)) {
    mkdirSync(FAVORITES_DIR, { recursive: true });
  }
}

export function loadFavorites(): FavoritePrompt[] {
  ensureDir();
  if (!existsSync(FAVORITES_FILE)) {
    return [];
  }
  try {
    const data = readFileSync(FAVORITES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: FavoritePrompt[]): void {
  ensureDir();
  writeFileSync(FAVORITES_FILE, JSON.stringify(favorites, null, 2));
}

export function addFavorite(prompt: Prompt): FavoritePrompt[] {
  const favorites = loadFavorites();
  if (favorites.some((f) => f.id === prompt.id)) {
    return favorites;
  }
  const favorite: FavoritePrompt = {
    ...prompt,
    favoritedAt: new Date().toISOString(),
  };
  const updated = [...favorites, favorite];
  saveFavorites(updated);
  return updated;
}

export function removeFavorite(id: string): FavoritePrompt[] {
  const favorites = loadFavorites();
  const updated = favorites.filter((f) => f.id !== id);
  saveFavorites(updated);
  return updated;
}

export function isFavorite(id: string): boolean {
  const favorites = loadFavorites();
  return favorites.some((f) => f.id === id);
}

export function toggleFavorite(prompt: Prompt): {
  favorites: FavoritePrompt[];
  added: boolean;
} {
  if (isFavorite(prompt.id)) {
    return { favorites: removeFavorite(prompt.id), added: false };
  }
  return { favorites: addFavorite(prompt), added: true };
}
