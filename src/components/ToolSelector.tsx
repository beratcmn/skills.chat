import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import type { Tool } from "../types";
import { TOOLS } from "../utils/tools";
import { KeyHint, Card } from "./ui";
import { theme } from "../utils/theme";

interface Props {
  onSelect: (tool: Tool) => void;
}

export default function ToolSelector({ onSelect }: Props) {
  const [selected, setSelected] = useState(0);

  useInput((input, key) => {
    if (key.leftArrow) {
      setSelected((s) => {
        const col = s % 2;
        const row = Math.floor(s / 2);
        if (col === 0) {
          return s;
        }
        return s - 1;
      });
    }
    if (key.rightArrow) {
      setSelected((s) => {
        const col = s % 2;
        if (col === 1) {
          return s;
        }
        return s + 1;
      });
    }
    if (key.upArrow) {
      setSelected((s) => {
        const row = Math.floor(s / 2);
        if (row === 0) {
          return s;
        }
        return s - 2;
      });
    }
    if (key.downArrow) {
      setSelected((s) => {
        const row = Math.floor(s / 2);
        if (row === 3) {
          return s;
        }
        return s + 2;
      });
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

      <Box flexDirection="row">
        <Box flexDirection="column">
          {TOOLS.filter((_, i) => i % 2 === 0).map((tool, filterIndex) => {
            const index = filterIndex * 2;
            const isSelected = index === selected;

            return (
              <Box key={tool.id} marginBottom={index < 6 ? 1 : 0}>
                <Card
                  selected={isSelected}
                  borderColor={
                    isSelected ? tool.displayColor : theme.colors.textDim
                  }
                  width={52}
                  height={6}
                >
                  <Box>
                    <Text
                      color={
                        isSelected ? tool.displayColor : theme.colors.textDim
                      }
                      bold={isSelected}
                    >
                      {tool.icon} {tool.name}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      color={
                        isSelected
                          ? theme.colors.textMuted
                          : theme.colors.textDim
                      }
                    >
                      {tool.description}
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
        </Box>
        <Box flexDirection="column" marginLeft={1}>
          {TOOLS.filter((_, i) => i % 2 === 1).map((tool, filterIndex) => {
            const index = filterIndex * 2 + 1;
            const isSelected = index === selected;

            return (
              <Box key={tool.id} marginBottom={index < 7 ? 1 : 0}>
                <Card
                  selected={isSelected}
                  borderColor={
                    isSelected ? tool.displayColor : theme.colors.textDim
                  }
                  width={52}
                  height={6}
                >
                  <Box>
                    <Text
                      color={
                        isSelected ? tool.displayColor : theme.colors.textDim
                      }
                      bold={isSelected}
                    >
                      {tool.icon} {tool.name}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      color={
                        isSelected
                          ? theme.colors.textMuted
                          : theme.colors.textDim
                      }
                    >
                      {tool.description}
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
        </Box>
      </Box>

      <KeyHint
        hints={[
          { key: "←→", label: "column" },
          { key: "↑↓", label: "row" },
          { key: "Enter", label: "select" },
        ]}
      />
    </Box>
  );
}
