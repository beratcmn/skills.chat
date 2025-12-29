import React from "react";
import { Box, Text } from "ink";
import { theme } from "../../utils/theme";

interface KeyHintItem {
  key: string;
  label: string;
}

interface Props {
  hints: KeyHintItem[];
}

export default function KeyHint({ hints }: Props) {
  return (
    <Box marginTop={1} flexWrap="wrap">
      {hints.map((hint, idx) => (
        <Box key={hint.key} marginRight={2}>
          <Text backgroundColor={theme.colors.border} color={theme.colors.text}>
            {" "}
            {hint.key}{" "}
          </Text>
          <Text color={theme.colors.textMuted}> {hint.label}</Text>
          {idx < hints.length - 1 && (
            <Text color={theme.colors.textDim}> </Text>
          )}
        </Box>
      ))}
    </Box>
  );
}
