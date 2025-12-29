import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import type { Tool } from "../types";
import { TOOLS } from "../types";

interface Props {
  onSelect: (tool: Tool) => void;
}

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
      {TOOLS.map((tool, index) => (
        <Box key={tool.id}>
          {index === selected ? (
            <Text color={tool.color}>▸ {tool.name}</Text>
          ) : (
            <Text color="gray"> {tool.name}</Text>
          )}
        </Box>
      ))}
      <Box marginTop={1}>
        <Text color="gray">↑↓ to navigate, </Text>
        <Text color="cyan">Enter</Text>
        <Text color="gray"> to select</Text>
      </Box>
    </Box>
  );
}
