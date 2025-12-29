export const TOOLS = [
  {
    id: "codex",
    name: "OpenAI Codex",
    description: "Cloud-based software engineering agent working on many tasks in parallel",
    color: "#10a37f",
    displayColor: "#86efac",
    icon: "◆",
    basePath: ".codex/skills",
  },
  {
    id: "opencode",
    name: "OpenCode",
    description: "The open source AI coding agent - write code in terminal, IDE, or desktop",
    color: "#6366f1",
    displayColor: "#a5b4fc",
    icon: "◇",
    basePath: ".opencode/skill",
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    description: "Anthropic's AI assistant - helpful, honest, and harmless",
    color: "#da7756",
    displayColor: "#fdba74",
    icon: "◈",
    basePath: ".claude/skills",
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "The AI-first code editor with smart completions",
    color: "#7c3aed",
    displayColor: "#c4b5fd",
    icon: "◉",
    basePath: ".cursor/rules",
  },
  {
    id: "ampcode",
    name: "Amp Code",
    description: "The frontier coding agent built by Sourcegraph for teams and outcomes",
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
