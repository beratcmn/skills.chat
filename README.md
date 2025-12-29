# skills.chat

Search and install Agent Skills from prompts.chat to your local development environment.

## Features

- Search prompts from prompts.chat registry
- Multi-select skills for batch installation
- Edit skill names before installation
- Support for multiple coding tools:
  - OpenAI Codex (`.codex/skills/<name>/SKILL.md`)
  - OpenCode (`.opencode/skill/<name>/SKILL.md`)
  - Anthropic Claude (`.claude/skills/<name>/SKILL.md`)
  - Cursor (`.cursor/rules/<name>/SKILL.md`)

## Usage

```bash
# Run the CLI
bun run start
bunx skills.chat

# Install globally (optional)
npm install -g skills.chat
skills.chat
```

## Keyboard Controls

- `↑↓` - Navigate / scroll
- `Space` - Select / deselect
- `Enter` - Confirm / install
- `Esc` - Go back

## Installation

Skills are saved to your current working directory with auto-created directories.

## Format

Installed skills follow the Agent Skills standard:

```markdown
---
name: <skill-name>
source: prompts.chat
promptId: <id>
author: <author>
category: <category>
tags: [<tags>]
---

<prompt content>
```
