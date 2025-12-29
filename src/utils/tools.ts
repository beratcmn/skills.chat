export const TOOLS = [
  {
    id: "codex",
    name: "OpenAI Codex",
    description: "OpenAI's coding assistant with CLI integration",
    color: "#10a37f",
    displayColor: "#86efac",
    icon: "◆",
    basePath: ".codex/skills",
  },
  {
    id: "opencode",
    name: "OpenCode",
    description: "Open-source AI coding companion",
    color: "#6366f1",
    displayColor: "#a5b4fc",
    icon: "◇",
    basePath: ".opencode/skill",
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    description: "Anthropic's AI assistant for developers",
    color: "#d4a574",
    displayColor: "#fcd34d",
    icon: "◈",
    basePath: ".claude/skills",
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first code editor with smart completions",
    color: "#7c3aed",
    displayColor: "#c4b5fd",
    icon: "◉",
    basePath: ".cursor/rules",
  },
  {
    id: "ampcode",
    name: "Amp Code",
    description: "AI-powered coding assistant",
    color: "#f97316",
    displayColor: "#fdba74",
    icon: "◎",
    basePath: ".agents/skills",
  },
] as const;

export type Tool = (typeof TOOLS)[number]["id"];

export interface ToolInfo {
  id: Tool;
  name: string;
  description: string;
  color: string;
  displayColor: string;
  icon: string;
  basePath: string;
}

export function getToolInfo(tool: Tool): ToolInfo {
  return TOOLS.find((t) => t.id === tool)!;
}
