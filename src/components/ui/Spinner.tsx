import React, { useState, useEffect } from "react";
import { Text } from "ink";
import { theme } from "../../utils/theme";

interface Props {
  color?: string;
  label?: string;
}

export default function Spinner({ color = theme.colors.cyan, label }: Props) {
  const [frame, setFrame] = useState(0);
  const frames = theme.icons.spinner;

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <Text>
      <Text color={color}>{frames[frame]}</Text>
      {label && <Text color={theme.colors.textMuted}> {label}</Text>}
    </Text>
  );
}
