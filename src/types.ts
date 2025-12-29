export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  type: string;
  author: Author | string;
  category: string;
  tags: string[];
  votes: number;
  createdAt: string;
}

export interface SearchResult {
  query: string;
  count: number;
  prompts: Prompt[];
}

export type Tool = "codex" | "opencode" | "claude" | "cursor";

export interface ToolInfo {
  id: Tool;
  name: string;
  color: string;
  basePath: string;
}

export const TOOLS: ToolInfo[] = [
  {
    id: "codex",
    name: "OpenAI Codex",
    color: "#10a37f",
    basePath: ".codex/skills",
  },
  {
    id: "opencode",
    name: "OpenCode",
    color: "#6366f1",
    basePath: ".opencode/skill",
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    color: "#d4a574",
    basePath: ".claude/skills",
  },
  { id: "cursor", name: "Cursor", color: "#7c3aed", basePath: ".cursor/rules" },
];

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
  category: string;
  tags: string[];
  votes: number;
  createdAt: string;
  favoritedAt: string;
}

export const getAuthorName = (author: Author | string | undefined): string => {
  if (!author) return "Anonymous";
  if (typeof author === "string") return author;
  return author.name || author.username || "Anonymous";
};
