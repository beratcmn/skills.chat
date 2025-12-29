import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import type { FavoritePrompt } from "../types";
import { loadFavorites, removeFavorite } from "../utils/favorites";

interface Props {
  onSelect: (ids: string[], favorites: FavoritePrompt[]) => void;
  onBack: () => void;
}

export default function Favorites({ onSelect, onBack }: Props) {
  const [favorites, setFavorites] = useState<FavoritePrompt[]>([]);
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const VISIBLE = 10;

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
        <Box marginBottom={1}>
          <Text color="yellow">No favorites saved yet.</Text>
        </Box>
        <Text color="gray">Search for prompts and press </Text>
        <Text color="cyan">f</Text>
        <Text color="gray"> to add them to favorites.</Text>
        <Box marginTop={1}>
          <Text color="cyan">Esc</Text>
          <Text color="gray"> to go back</Text>
        </Box>
      </Box>
    );
  }

  const scrollStart = Math.max(
    0,
    Math.min(cursor - 3, favorites.length - VISIBLE),
  );
  const visible = favorites.slice(scrollStart, scrollStart + VISIBLE);

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color="yellow">★ </Text>
        <Text color="cyan">{favorites.length}</Text>
        <Text color="gray"> favorites</Text>
        {selected.size > 0 && (
          <Text color="green"> ({selected.size} selected)</Text>
        )}
      </Box>

      {visible.map((fav, idx) => {
        const globalIdx = scrollStart + idx;
        const isSelected = selected.has(fav.id);
        const isCursor = globalIdx === cursor;
        return (
          <Box key={fav.id}>
            {isSelected ? (
              <Text color="green">✓</Text>
            ) : isCursor ? (
              <Text color="cyan">▸</Text>
            ) : (
              <Text> </Text>
            )}
            <Text> </Text>
            <Text color="yellow">★</Text>
            <Text> </Text>
            <Text color={isSelected ? "green" : isCursor ? "white" : "dim"}>
              {fav.title}
            </Text>
          </Box>
        );
      })}

      {favorites.length > VISIBLE && (
        <Box marginTop={1}>
          <Text color="gray">
            {cursor > 0 ? "↑" : " "} {cursor < favorites.length - 1 ? "↓" : " "}
          </Text>
        </Box>
      )}

      {selected.size > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text color="green" bold>
            Selected:
          </Text>
          {favorites
            .filter((f) => selected.has(f.id))
            .map((f) => (
              <Box key={f.id}>
                <Text color="green"> • {f.title}</Text>
              </Box>
            ))}
        </Box>
      )}

      <Box marginTop={1}>
        <Text color="gray">↑↓ navigate, </Text>
        <Text color="cyan">Space</Text>
        <Text color="gray"> select, </Text>
        <Text color="red">d</Text>
        <Text color="gray"> remove, </Text>
        <Text color="cyan">Enter</Text>
        <Text color="gray"> install, </Text>
        <Text color="cyan">Esc</Text>
        <Text color="gray"> back</Text>
      </Box>
    </Box>
  );
}
