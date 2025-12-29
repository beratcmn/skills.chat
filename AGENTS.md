# AGENTS.md

This file provides guidance for AI coding agents working in this repository.

## Project Overview

**skills.chat** is a CLI tool for browsing and installing agent skills from prompts.chat. Built with React/Ink for terminal UI rendering.

- **Runtime**: Node.js >= 18, Bun preferred
- **Language**: TypeScript (strict mode)
- **UI Framework**: Ink (React for CLI)
- **Module System**: ESM only

## Build & Development Commands

### Primary Commands

```bash
# Run in development mode
bun run start
# or
bun run src/index.tsx

# Build for production
bun run build
# or
npm run build

# Type check (no emit, tsup handles build)
npx tsc --noEmit
```

### Package Management

```bash
# Install dependencies (prefer Bun)
bun install
# or
npm install
```

### Testing

No test framework is currently configured. When adding tests:

```bash
# Suggested: Use Bun's built-in test runner
bun test                    # Run all tests
bun test path/to/file.test.ts  # Run single test file
bun test --watch            # Watch mode
```

## Project Structure

```
src/
  index.tsx          # Entry point - renders App
  types.ts           # Shared types, interfaces, constants
  api/
    promptschat.ts   # API client for prompts.chat
  components/
    App.tsx          # Main app with state machine
    ToolSelector.tsx # Tool selection step
    ModeSelector.tsx # Mode selection step
    Search.tsx       # Search input component
    Results.tsx      # Search results list
    Favorites.tsx    # Favorites management
    NameEditor.tsx   # Skill name editing
    InstallSummary.tsx # Installation preview
    ui/              # Reusable UI primitives
      index.ts       # Barrel exports
      Badge.tsx
      Card.tsx
      Divider.tsx
      Header.tsx
      KeyHint.tsx
      Spinner.tsx
  utils/
    favorites.ts     # Favorites persistence
    paths.ts         # Skill installation logic
    theme.ts         # Colors, gradients, icons
```

## Code Style Guidelines

### File Naming

- **React components**: PascalCase (`App.tsx`, `ToolSelector.tsx`)
- **Utilities/modules**: camelCase (`favorites.ts`, `theme.ts`)
- **Types file**: `types.ts` in src root for shared types

### Imports

```typescript
// 1. Type imports must use 'import type' (enforced by verbatimModuleSyntax)
import type { Tool, SelectedSkill, Prompt } from "../types";

// 2. React is explicitly imported
import React, { useState, useEffect } from "react";

// 3. Named imports from Ink
import { Box, Text, useInput } from "ink";

// 4. Barrel imports for UI components
import { KeyHint, Spinner, Card } from "./ui";

// 5. Relative imports - no file extensions needed in imports
import { theme } from "../utils/theme";
```

### Naming Conventions

| Element             | Convention           | Example                                 |
| ------------------- | -------------------- | --------------------------------------- |
| Components          | PascalCase           | `function ToolSelector()`               |
| Interfaces          | PascalCase           | `interface Props`, `interface AppState` |
| Type aliases        | PascalCase           | `type Tool = "codex" \| "opencode"`     |
| Constants           | SCREAMING_SNAKE_CASE | `const TOOLS`, `const BASE_URL`         |
| Variables/functions | camelCase            | `handleToolSelect`, `toolInfo`          |
| Handler functions   | `handle` + Action    | `handleSearch`, `handleSelect`          |

### Type Definitions

```typescript
// Use interfaces for object shapes
interface Props {
  onSearch: (query: string, results: Prompt[]) => void;
}

interface AppState {
  step: Step;
  tool: Tool | null;
}

// Use type aliases for unions and simple types
type Tool = "codex" | "opencode" | "claude" | "cursor" | "ampcode";
type Step = "tool" | "mode" | "search" | "results";

// Use 'as const' for theme/config objects
export const theme = { ... } as const;
export type Theme = typeof theme;

// Export helper functions for type guards
export const getAuthorName = (author: Author | string | undefined): string => {
  if (!author) return "Anonymous";
  if (typeof author === "string") return author;
  return author.name || author.username || "Anonymous";
};
```

### React/Ink Patterns

```typescript
// Functional components only, with Props interface
interface Props {
  children: React.ReactNode;
  borderColor?: string;
}

export default function Card({
  children,
  borderColor = theme.colors.border,
}: Props) {
  // Component implementation
}

// Use useState for local state
const [query, setQuery] = useState("");
const [error, setError] = useState<string | null>(null);

// Use useInput for keyboard handling (Ink-specific)
useInput((input, key) => {
  if (key.return && query.trim()) performSearch();
  if (key.escape) process.exit(0);
});

// Use useEffect for side effects
useEffect(() => {
  const timer = setInterval(() => setCursorVisible((v) => !v), 530);
  return () => clearInterval(timer);
}, []);
```

### Error Handling

```typescript
// API layer: throw errors with descriptive messages
if (!res.ok) throw new Error(`Search failed: ${res.statusText}`);

// Component layer: catch and set error state
try {
  const result = await searchPrompts(query.trim());
  onSearch(query.trim(), result.prompts);
} catch (e) {
  setError(e instanceof Error ? e.message : "Search failed");
}

// Utils layer: silent recovery for file operations
try {
  const data = readFileSync(FAVORITES_FILE, "utf-8");
  return JSON.parse(data);
} catch {
  return [];
}
```

### Theme Usage

Always use the centralized theme from `utils/theme.ts`:

```typescript
import { theme } from "../utils/theme";

// Colors
<Text color={theme.colors.primary}>...</Text>
<Text color={theme.colors.error}>Error: {error}</Text>

// Icons
<Text>{theme.icons.selected}</Text>  // ✓
<Text>{theme.icons.cursor}</Text>    // ▸

// Tool-specific styling
<Text color={theme.tools[toolId].color}>
  {theme.tools[toolId].icon} {toolInfo.name}
</Text>
```

### Component Exports

- **Default exports** for React components
- **Named exports** for utility functions and types
- **Barrel exports** via `index.ts` for UI components

```typescript
// Component file
export default function Card({ ... }: Props) { ... }

// Barrel file (ui/index.ts)
export { default as Card } from "./Card";
export { default as Badge } from "./Badge";
```

## TypeScript Configuration

Key settings from `tsconfig.json`:

- `strict: true` - Strict type checking enabled
- `verbatimModuleSyntax: true` - Must use `import type` for types
- `noUncheckedIndexedAccess: true` - Strict indexed access
- `jsx: "react-jsx"` - Modern JSX transform
- `strictNullChecks: false` - Null checks disabled (be careful!)

## Architecture Notes

1. **Step-based State Machine**: `App.tsx` manages navigation through steps: `tool` -> `mode` -> `search`/`favorites` -> `results` -> `names` -> `summary` -> `done`

2. **Props Drilling**: State and handlers flow from `App.tsx` to child components

3. **External API**: `api/promptschat.ts` handles all prompts.chat API calls

4. **File System**: Skills are installed to tool-specific directories (e.g., `.codex/skills/`, `.cursor/rules/`)

## Dependencies

**Runtime**: ink, ink-big-text, ink-gradient, ink-spinner, react
**Dev**: typescript, tsup, @types/\*

## Common Patterns

When adding new features:

1. Define types in `src/types.ts`
2. Create components in `src/components/`
3. Add API functions to `src/api/`
4. Use theme colors/icons from `src/utils/theme.ts`
5. Follow the step-based navigation pattern in `App.tsx`
