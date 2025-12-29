import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import type { Tool } from "../types";
import { TOOLS } from "../types";
import { KeyHint, Card } from "./ui";
import { theme } from "../utils/theme";

interface Props {
  onSelect: (tool: Tool) => void;
}

const TOOL_DESCRIPTIONS: Record<Tool, string> = {
  codex: "OpenAI's coding assistant with CLI integration",
  opencode: "Open-source AI coding companion",
  claude: "Anthropic's AI assistant for developers",
  cursor: "AI-first code editor with smart completions",
};

export default function ToolSelector({ onSelect }: Props) {
  const [selected, setSelected] = useState(0);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelected((s) => (s === 0 ? TOOLS.length - 1 : s - 1));
    }
    if (key.downArrow) {
      setSelected((s) => (s === TOOLS.length - 1 ? 0 : s + 1));
    }
    if (key.return) {
      onSelect(TOOLS[selected].id);
    }
  });

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color={theme.colors.text}>Select your coding tool</Text>
      </Box>

      {TOOLS.map((tool, index) => {
        const isSelected = index === selected;
        const toolTheme = theme.tools[tool.id];

        return (
          <Box key={tool.id} marginBottom={index < TOOLS.length - 1 ? 1 : 0}>
            <Card
              selected={isSelected}
              borderColor={isSelected ? toolTheme.color : theme.colors.textDim}
              width={52}
            >
              <Box>
                <Text
                  color={isSelected ? toolTheme.color : theme.colors.textDim}
                  bold={isSelected}
                >
                  {toolTheme.icon} {tool.name}
                </Text>
              </Box>
              <Box>
                <Text
                  color={
                    isSelected ? theme.colors.textMuted : theme.colors.textDim
                  }
                >
                  {TOOL_DESCRIPTIONS[tool.id]}
                </Text>
              </Box>
              <Box marginTop={0}>
                <Text color={theme.colors.textDim}>
                  {theme.icons.arrow} {tool.basePath}
                </Text>
              </Box>
            </Card>
          </Box>
        );
      })}

      <KeyHint
        hints={[
          { key: "↑↓", label: "navigate" },
          { key: "Enter", label: "select" },
        ]}
      />
    </Box>
  );
}
