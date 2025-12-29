import React from "react";
import { Box, Text } from "ink";
import { theme } from "../../utils/theme";

interface Props {
  width?: number;
  color?: string;
}

export default function Divider({
  width = 40,
  color = theme.colors.border,
}: Props) {
  return (
    <Box marginY={1}>
      <Text color={color}>{theme.icons.box.horizontal.repeat(width)}</Text>
    </Box>
  );
}
