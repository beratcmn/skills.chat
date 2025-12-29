import React, { useState } from "react";
import { Box, Text, useInput } from "ink";

export type Mode = "search" | "favorites";

interface ModeOption {
  id: Mode;
  name: string;
  icon: string;
}

const MODES: ModeOption[] = [
  { id: "search", name: "Search prompts.chat", icon: "🔍" },
  { id: "favorites", name: "View Favorites", icon: "★" },
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
        <Text color="white">What would you like to do?</Text>
      </Box>
      {MODES.map((mode, index) => {
        const isSelected = index === selected;
        const countLabel =
          mode.id === "favorites" ? ` (${favoritesCount})` : "";
        return (
          <Box key={mode.id}>
            {isSelected ? (
              <Text color="cyan">
                ▸ {mode.icon} {mode.name}
                {countLabel}
              </Text>
            ) : (
              <Text color="gray">
                {" "}
                {mode.icon} {mode.name}
                {countLabel}
              </Text>
            )}
          </Box>
        );
      })}
      <Box marginTop={1}>
        <Text color="gray">↑↓ navigate, </Text>
        <Text color="cyan">Enter</Text>
        <Text color="gray"> select, </Text>
        <Text color="cyan">Esc</Text>
        <Text color="gray"> back</Text>
      </Box>
    </Box>
  );
}
