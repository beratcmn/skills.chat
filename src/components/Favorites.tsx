import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import { type FavoritePrompt, getAuthorName, getCategoryName } from "../types";
import { loadFavorites, removeFavorite } from "../utils/favorites";
import { KeyHint, Badge, Card } from "./ui";
import { theme } from "../utils/theme";

interface Props {
  onSelect: (ids: string[], favorites: FavoritePrompt[]) => void;
  onBack: () => void;
}

export default function Favorites({ onSelect, onBack }: Props) {
  const [favorites, setFavorites] = useState<FavoritePrompt[]>([]);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const VISIBLE = 6;

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  useInput((input, key) => {
    if (favorites.length === 0) {
      if (key.escape || input === "b") {
        onBack();
      }
      return;
    }

    if (key.upArrow) {
      setCursor((c) => Math.max(0, c - 1));
    }
    if (key.downArrow) {
      setCursor((c) => Math.min(favorites.length - 1, c + 1));
    }
    if (input === " ") {
      const id = favorites[cursor]?.id;
      if (id) {
        const newSelected = new Set(selected);
        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }
        setSelected(newSelected);
      }
    }
    if (input === "d" || input === "x") {
      const id = favorites[cursor]?.id;
      if (id) {
        const updated = removeFavorite(id);
        setFavorites(updated);
        setSelected((s) => {
          const newSet = new Set(s);
          newSet.delete(id);
          return newSet;
        });
        if (cursor >= updated.length && cursor > 0) {
          setCursor(cursor - 1);
        }
      }
    }
    if (key.return && selected.size > 0) {
      onSelect(Array.from(selected), favorites);
    }
    if (key.escape || input === "b") {
      onBack();
    }
  });

  if (favorites.length === 0) {
    return (
      <Box flexDirection="column">
        <Card borderColor={theme.colors.amber} width={50}>
          <Box flexDirection="column" alignItems="center">
            <Text color={theme.colors.amber} bold>
              {theme.icons.star} No favorites yet
            </Text>
            <Box marginTop={1}>
              <Text color={theme.colors.textMuted}>
                Search for skills and press{" "}
              </Text>
              <Text color={theme.colors.amber}>f</Text>
              <Text color={theme.colors.textMuted}> to save them</Text>
            </Box>
          </Box>
        </Card>

        <KeyHint hints={[{ key: "Esc", label: "go back" }]} />
      </Box>
    );
  }

  const scrollStart = Math.max(
    0,
    Math.min(cursor - 2, favorites.length - VISIBLE),
  );
  const visible = favorites.slice(scrollStart, scrollStart + VISIBLE);

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color={theme.colors.amber}>{theme.icons.star} </Text>
        <Text color={theme.colors.cyan} bold>
          {favorites.length}
        </Text>
        <Text color={theme.colors.text}> favorites</Text>
        {selected.size > 0 && (
          <Text color={theme.colors.success}> ({selected.size} selected)</Text>
        )}
      </Box>

      {visible.map((fav, idx) => {
        const globalIdx = scrollStart + idx;
        const isSelected = selected.has(fav.id);
        const isCursor = globalIdx === cursor;

        return (
          <Box
            key={fav.id}
            flexDirection="column"
            marginBottom={1}
            paddingLeft={1}
            borderStyle={isCursor ? "round" : undefined}
            borderColor={
              isSelected
                ? theme.colors.success
                : isCursor
                  ? theme.colors.amber
                  : undefined
            }
          >
            <Box>
              {isSelected ? (
                <Text color={theme.colors.success}>{theme.icons.selected} </Text>
              ) : (
                <Text color={theme.colors.textDim}>○ </Text>
              )}
              <Text color={theme.colors.amber}>{theme.icons.star} </Text>
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
                {fav.title}
              </Text>
            </Box>

            {isCursor && (
              <Box flexDirection="column" paddingLeft={4}>
                <Text color={theme.colors.textMuted} wrap="truncate">
                  {fav.description?.slice(0, 70) || "No description"}
                  {fav.description?.length > 70 ? "..." : ""}
                </Text>
                <Box marginTop={0} gap={1}>
                  <Text color={theme.colors.textDim}>
                    by {getAuthorName(fav.author)}
                  </Text>
                  <Text color={theme.colors.textDim}>•</Text>
                  <Text color={theme.colors.textDim}>
                    {getCategoryName(fav.category)}
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        );
      })}

      {favorites.length > VISIBLE && (
        <Box>
          <Text color={theme.colors.textDim}>
            {scrollStart > 0 ? "↑ " : "  "}
            {scrollStart + VISIBLE < favorites.length ? "↓ more" : ""}
          </Text>
        </Box>
      )}

      {selected.size > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text color={theme.colors.success} bold>
            Selected skills:
          </Text>
          <Box flexDirection="row" flexWrap="wrap" gap={1}>
            {favorites
              .filter((f) => selected.has(f.id))
              .map((f) => (
                <Badge key={f.id} backgroundColor={theme.colors.success} color="#000">
                  {f.title}
                </Badge>
              ))}
          </Box>
        </Box>
      )}

      <KeyHint
        hints={[
          { key: "↑↓", label: "navigate" },
          { key: "Space", label: "select" },
          { key: "d", label: "remove" },
          { key: "Enter", label: "install" },
          { key: "Esc", label: "back" },
        ]}
      />
    </Box>
  );
}
