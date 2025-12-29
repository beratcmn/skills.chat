import React from "react";
import { Text } from "ink";
import { theme } from "../../utils/theme";

interface Props {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
}

export default function Badge({
  children,
  color = theme.colors.text,
  backgroundColor = theme.colors.border,
}: Props) {
  return (
    <Text backgroundColor={backgroundColor} color={color}>
      {" "}
      {children}{" "}
    </Text>
  );
}
