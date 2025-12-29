import React from "react";
import { Box, Text, useInput } from "ink";
import type { Tool, SelectedSkill } from "../types";
import { TOOLS } from "../types";
import { installSkill } from "../utils/paths";

interface Props {
  skills: SelectedSkill[];
  tool: Tool;
  onInstall: () => void;
  onBack: () => void;
}

export default function InstallSummary({
  skills,
  tool,
  onInstall,
  onBack,
}: Props) {
  const toolInfo = TOOLS.find((t) => t.id === tool)!;

  useInput((input, key) => {
    if (key.return) {
      skills.forEach((skill) => installSkill(tool, skill));
      onInstall();
    }
    if (key.escape || input === "b") {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color="gray">Ready to install </Text>
        <Text color="cyan">{skills.length}</Text>
        <Text color="gray"> skill(s) to </Text>
        <Text color={toolInfo.color}>{toolInfo.name}</Text>
      </Box>

      {skills.map((skill, idx) => (
        <Box key={skill.prompt.id}>
          <Text color="gray">{idx + 1}.</Text>
          <Text> </Text>
          <Text color="white">{skill.name}/SKILL.md</Text>
        </Box>
      ))}

      <Box marginTop={1}>
        <Text color="green">Install?</Text>
        <Text> </Text>
        <Text color="cyan">Enter</Text>
        <Text color="gray"> yes, </Text>
        <Text color="cyan">Esc</Text>
        <Text color="gray"> no</Text>
      </Box>
    </Box>
  );
}

interface SuccessProps {
  count: number;
  onContinue: () => void;
  onExit: () => void;
}

export function Success({ count, onContinue, onExit }: SuccessProps) {
  useInput((input, key) => {
    if (key.return || input === " ") {
      onContinue();
    }
    if (key.escape || input === "q") {
      onExit();
    }
  });

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color="green">✓</Text>
        <Text> </Text>
        <Text color="green" bold>
          Installed {count} skill(s)!
        </Text>
      </Box>
      <Box>
        <Text color="cyan">Enter</Text>
        <Text color="gray"> search more, </Text>
        <Text color="cyan">Esc/q</Text>
        <Text color="gray"> exit</Text>
      </Box>
    </Box>
  );
}
