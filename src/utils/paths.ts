import type { Tool, SelectedSkill } from '../types';
import { TOOLS } from '../types';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export function getToolInfo(tool: Tool) {
  return TOOLS.find(t => t.id === tool)!;
}

export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function generateSkillContent(skill: SelectedSkill): string {
  return skill.prompt.content;
}

export function installSkill(tool: Tool, skill: SelectedSkill): void {
  const toolInfo = getToolInfo(tool);
  const dirPath = join(process.cwd(), toolInfo.basePath, skill.name);
  
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
  
  const filePath = join(dirPath, 'SKILL.md');
  const content = generateSkillContent(skill);
  writeFileSync(filePath, content);
}
