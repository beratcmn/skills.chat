import React, { useState, useEffect } from "react";
import { Box, Text } from "ink";
import { theme } from "../../utils/theme";

interface Snowflake {
  x: number;
  y: number;
  char: string;
}

interface Props {
  width: number;
  height: number;
}

const SNOWFLAKE_CHARS = ["*", ".", "+", "."];
const NUM_SNOWFLAKES = 12;

export default function SnowAnimation({ width, height }: Props) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Initialize snowflakes at random positions
    const initial: Snowflake[] = [];
    for (let i = 0; i < NUM_SNOWFLAKES; i++) {
      initial.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        char: SNOWFLAKE_CHARS[
          Math.floor(Math.random() * SNOWFLAKE_CHARS.length)
        ]!,
      });
    }
    setSnowflakes(initial);

    // Animation interval
    const interval = setInterval(() => {
      setSnowflakes((prev) =>
        prev.map((flake) => {
          let newY = flake.y + 1;
          let newX =
            flake.x +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.7 ? 1 : 0);

          // Wrap around
          if (newY >= height) {
            newY = 0;
            newX = Math.floor(Math.random() * width);
          }
          if (newX < 0) newX = width - 1;
          if (newX >= width) newX = 0;

          return {
            x: newX,
            y: newY,
            char: flake.char,
          };
        }),
      );
    }, 300);

    return () => clearInterval(interval);
  }, [width, height]);

  // Create a grid for snow overlay
  const snowGrid: (string | null)[][] = [];
  for (let y = 0; y < height; y++) {
    snowGrid[y] = [];
    for (let x = 0; x < width; x++) {
      snowGrid[y]![x] = null;
    }
  }

  // Place snowflakes on grid
  for (const flake of snowflakes) {
    if (flake.y >= 0 && flake.y < height && flake.x >= 0 && flake.x < width) {
      snowGrid[flake.y]![flake.x] = flake.char;
    }
  }

  return (
    <Box position="absolute" flexDirection="column">
      {snowGrid.map((row, y) => (
        <Text key={y}>
          {row.map((cell, x) => (
            <Text key={x} color={cell ? theme.christmas.snow : undefined}>
              {cell || " "}
            </Text>
          ))}
        </Text>
      ))}
    </Box>
  );
}
