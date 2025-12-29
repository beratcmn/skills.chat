import type { SearchResult, Prompt } from "../types";

const BASE_URL = "https://prompts.chat/api";

export async function searchPrompts(
  query: string,
  limit = 20,
): Promise<SearchResult> {
  const url = `${BASE_URL}/prompts?q=${encodeURIComponent(query)}&perPage=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Search failed: ${res.statusText}`);
  const data = await res.json();
  return data as SearchResult;
}

export async function getPrompt(id: string): Promise<Prompt> {
  const res = await fetch(`${BASE_URL}/prompts/${id}`);
  if (!res.ok) throw new Error(`Get prompt failed: ${res.statusText}`);
  const data = await res.json();
  return data as Prompt;
}
