import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { KeyHint, Card } from "./ui";
import { theme } from "../utils/theme";

export type Mode = "search" | "favorites";

interface ModeOption {
  id: Mode;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const MODES: ModeOption[] = [
  {
    id: "search",
    name: "Search prompts.chat",
    description: "Find new skills from the registry",
    icon: "🔍",
    color: theme.colors.cyan,
  },
  {
    id: "favorites",
    name: "View Favorites",
    description: "Access your saved skills",
    icon: "★",
    color: theme.colors.amber,
  },
];

interface Props {
  onSelect: (mode: Mode) => void;
  onBack: () => void;
  favoritesCount: number;
}

export default function ModeSelector({
  onSelect,
  onBack,
  favoritesCount,
}: Props) {
  const [selected, setSelected] = useState(0);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelected((s) => (s === 0 ? MODES.length - 1 : s - 1));
    }
    if (key.downArrow) {
      setSelected((s) => (s === MODES.length - 1 ? 0 : s + 1));
    }
    if (key.return) {
      onSelect(MODES[selected].id);
    }
    if (key.escape) {
      onBack();
    }
  });

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color={theme.colors.text}>What would you like to do?</Text>
      </Box>

      {MODES.map((mode, index) => {
        const isSelected = index === selected;
        const countLabel =
          mode.id === "favorites" ? ` (${favoritesCount})` : "";

        return (
          <Box key={mode.id} marginBottom={index < MODES.length - 1 ? 1 : 0}>
            <Card
              selected={isSelected}
              borderColor={isSelected ? mode.color : theme.colors.textDim}
              width={52}
            >
              <Box>
                <Text color={mode.color} bold>
                  {mode.icon} {mode.name}
                  {countLabel}
                </Text>
              </Box>
              <Box>
                <Text color={theme.colors.textMuted}>{mode.description}</Text>
              </Box>
            </Card>
          </Box>
        );
      })}

      <KeyHint
        hints={[
          { key: "↑↓", label: "navigate" },
          { key: "Enter", label: "select" },
          { key: "Esc", label: "back" },
        ]}
      />
    </Box>
  );
}
