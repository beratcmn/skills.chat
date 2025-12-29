import React from "react";
import { Box, Text } from "ink";
import { theme } from "../../utils/theme";

interface Props {
  children: React.ReactNode;
  borderColor?: string;
  width?: number;
  height?: number;
  selected?: boolean;
  padding?: number;
}

export default function Card({
  children,
  borderColor = theme.colors.border,
  width = 50,
  height,
  selected = false,
  padding = 1,
}: Props) {
  const activeColor = selected ? theme.colors.primary : borderColor;
  const innerWidth = width - 2;
  const innerHeight = height ? height - 2 : undefined;

  return (
    <Box flexDirection="column">
      <Text color={activeColor}>
        {theme.icons.box.topLeft}
        {theme.icons.box.horizontal.repeat(innerWidth)}
        {theme.icons.box.topRight}
      </Text>
      <Box flexDirection="row">
        <Text color={activeColor}>{theme.icons.box.vertical}</Text>
        <Box
          flexDirection="column"
          width={innerWidth}
          paddingX={padding}
          height={innerHeight}
        >
          {children}
        </Box>
        <Text color={activeColor}>{theme.icons.box.vertical}</Text>
      </Box>
      <Text color={activeColor}>
        {theme.icons.box.bottomLeft}
        {theme.icons.box.horizontal.repeat(innerWidth)}
        {theme.icons.box.bottomRight}
      </Text>
    </Box>
  );
}
