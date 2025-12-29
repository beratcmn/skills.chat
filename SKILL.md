---
name: skills-chat-cli
source: local
description: CLI tool to search and install Agent Skills from prompts.chat
author: skills.chat
category: Development
tags: ["cli", "agent-skills", "prompts-chat"]
---

# Skills Chat CLI

A visual CLI tool to search, discover, and install Agent Skills from prompts.chat into various coding tool directories.

## Usage

```bash
bun run start
```

## Workflow

1. Select your coding tool (Codex, OpenCode, Claude, or Cursor)
2. Enter a search query to find prompts
3. Select one or more skills with space
4. Edit skill names if needed (kebab-case)
5. Confirm installation

## Output Structure

Skills are saved to:
- Codex: `.codex/skills/<name>/SKILL.md`
- OpenCode: `.opencode/skill/<name>/SKILL.md`
- Claude: `.claude/skills/<name>/SKILL.md`
- Cursor: `.cursor/rules/<name>/SKILL.md`
