import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import {
  type Prompt,
  getAuthorName,
  getCategoryName,
  getTagName,
} from "../types";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { KeyHint, Badge, Divider } from "./ui";
import { theme } from "../utils/theme";

interface Props {
  results: Prompt[];
  selected: Set<string>;
  onSelect: (ids: string[]) => void;
  onBack: () => void;
}

export default function Results({
  results,
  selected,
  onSelect,
  onBack,
}: Props) {
  const [cursor, setCursor] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const VISIBLE = 6;

  useEffect(() => {
    setCursor(0);
    const favSet = new Set(
      results.filter((p) => isFavorite(p.id)).map((p) => p.id),
    );
    setFavorites(favSet);
  }, [results]);

  useInput((input, key) => {
    if (key.upArrow) {
      setCursor((c) => Math.max(0, c - 1));
    }
    if (key.downArrow) {
      setCursor((c) => Math.min(results.length - 1, c + 1));
    }
    if (input === " ") {
      const id = results[cursor]?.id;
      if (id) {
        const newSelected = new Set(selected);
        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }
        onSelect(Array.from(newSelected));
      }
    }
    if (key.return && selected.size > 0) {
      onSelect(Array.from(selected));
    }
    if (key.escape || input === "b") {
      onBack();
    }
    if (input === "f") {
      const prompt = results[cursor];
      if (prompt) {
        const { added } = toggleFavorite(prompt);
        setFavorites((prev) => {
          const newSet = new Set(prev);
          if (added) {
            newSet.add(prompt.id);
          } else {
            newSet.delete(prompt.id);
          }
          return newSet;
        });
      }
    }
  });

  const scrollStart = Math.max(
    0,
    Math.min(cursor - 2, results.length - VISIBLE),
  );
  const visible = results.slice(scrollStart, scrollStart + VISIBLE);

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Development: theme.colors.cyan,
      Writing: theme.colors.pink,
      Analysis: theme.colors.purple,
      Design: theme.colors.fuchsia,
      Marketing: theme.colors.orange,
      Education: theme.colors.teal,
      Research: theme.colors.indigo,
    };
    return colors[category] || theme.colors.textMuted;
  };

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color={theme.colors.text}>Found </Text>
        <Text color={theme.colors.cyan} bold>
          {results.length}
        </Text>
        <Text color={theme.colors.text}> skills</Text>
        {selected.size > 0 && (
          <Text color={theme.colors.success}> ({selected.size} selected)</Text>
        )}
      </Box>

      {visible.map((prompt, idx) => {
        const globalIdx = scrollStart + idx;
        const isSelected = selected.has(prompt.id);
        const isCursor = globalIdx === cursor;
        const isFav = favorites.has(prompt.id);

        return (
          <Box
            key={prompt.id}
            flexDirection="column"
            marginBottom={1}
            paddingLeft={1}
            borderStyle={isCursor ? "round" : undefined}
            borderColor={
              isSelected
                ? theme.colors.success
                : isCursor
                  ? theme.colors.primary
                  : undefined
            }
          >
            <Box>
              {isSelected ? (
                <Text color={theme.colors.success}>
                  {theme.icons.selected}{" "}
                </Text>
              ) : (
                <Text color={theme.colors.textDim}>○ </Text>
              )}
              {isFav ? (
                <Text color={theme.colors.amber}>{theme.icons.star} </Text>
              ) : (
                <Text color={theme.colors.textDim}>
                  {theme.icons.starEmpty}{" "}
                </Text>
              )}
              <Text
                color={
                  isSelected
                    ? theme.colors.success
                    : isCursor
                      ? theme.colors.text
                      : theme.colors.textMuted
                }
                bold={isCursor}
              >
                {prompt.title}
              </Text>
            </Box>

            {isCursor && (
              <Box flexDirection="column" paddingLeft={4} marginTop={0}>
                <Text color={theme.colors.textMuted} wrap="truncate">
                  {prompt.description?.slice(0, 70) || "No description"}
                  {prompt.description?.length > 70 ? "..." : ""}
                </Text>
                <Box marginTop={0} gap={1}>
                  <Badge
                    backgroundColor={getCategoryColor(
                      getCategoryName(prompt.category),
                    )}
                    color={theme.colors.text}
                  >
                    {getCategoryName(prompt.category)}
                  </Badge>
                  <Text color={theme.colors.textDim}>
                    by {getAuthorName(prompt.author)}
                  </Text>
                  <Text color={theme.colors.amber}>↑{prompt.votes || 0}</Text>
                </Box>
                {prompt.tags && prompt.tags.length > 0 && (
                  <Box marginTop={0} gap={1}>
                    {prompt.tags.slice(0, 4).map((tag, tagIdx) => (
                      <Text key={tagIdx} color={theme.colors.textDim}>
                        #{getTagName(tag)}
                      </Text>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        );
      })}

      {results.length > VISIBLE && (
        <Box>
          <Text color={theme.colors.textDim}>
            {scrollStart > 0 ? "↑ " : "  "}
            {scrollStart + VISIBLE < results.length ? "↓ more" : ""}
          </Text>
        </Box>
      )}

      {selected.size > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text color={theme.colors.success} bold>
            Selected skills:
          </Text>
          <Box flexDirection="row" flexWrap="wrap" gap={1}>
            {results
              .filter((p) => selected.has(p.id))
              .map((p) => (
                <Badge
                  key={p.id}
                  backgroundColor={theme.colors.success}
                  color="#000"
                >
                  {p.title}
                </Badge>
              ))}
          </Box>
        </Box>
      )}

      <KeyHint
        hints={[
          { key: "↑↓", label: "navigate" },
          { key: "Space", label: "select" },
          { key: "f", label: "favorite" },
          { key: "Enter", label: "continue" },
          { key: "Esc", label: "back" },
        ]}
      />
    </Box>
  );
}
