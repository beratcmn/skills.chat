import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import type { Prompt } from "../types";
import { isFavorite, toggleFavorite } from "../utils/favorites";

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
  const VISIBLE = 10;

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
    Math.min(cursor - 3, results.length - VISIBLE),
  );
  const visible = results.slice(scrollStart, scrollStart + VISIBLE);

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color="gray">Found </Text>
        <Text color="cyan">{results.length}</Text>
        <Text color="gray"> skills</Text>
        {selected.size > 0 && (
          <Text color="green"> ({selected.size} selected)</Text>
        )}
      </Box>

      {visible.map((prompt, idx) => {
        const globalIdx = scrollStart + idx;
        const isSelected = selected.has(prompt.id);
        const isCursor = globalIdx === cursor;
        const isFav = favorites.has(prompt.id);
        return (
          <Box key={prompt.id}>
            {isSelected ? (
              <Text color="green">✓</Text>
            ) : isCursor ? (
              <Text color="cyan">▸</Text>
            ) : (
              <Text> </Text>
            )}
            <Text> </Text>
            {isFav ? (
              <Text color="yellow">★</Text>
            ) : (
              <Text color="gray">☆</Text>
            )}
            <Text> </Text>
            <Text color="gray">{globalIdx + 1}.</Text>
            <Text> </Text>
            <Text color={isSelected ? "green" : isCursor ? "white" : "dim"}>
              {prompt.title}
            </Text>
          </Box>
        );
      })}

      {results.length > VISIBLE && (
        <Box marginTop={1}>
          <Text color="gray">
            {cursor > 0 ? "↑" : " "} {cursor < results.length - 1 ? "↓" : " "}
          </Text>
        </Box>
      )}

      {selected.size > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text color="green" bold>
            Selected:
          </Text>
          {results
            .filter((p) => selected.has(p.id))
            .map((p) => (
              <Box key={p.id}>
                <Text color="green"> • {p.title}</Text>
              </Box>
            ))}
        </Box>
      )}

      <Box marginTop={1}>
        <Text color="gray">↑↓ navigate, </Text>
        <Text color="cyan">Space</Text>
        <Text color="gray"> select, </Text>
        <Text color="yellow">f</Text>
        <Text color="gray"> favorite, </Text>
        <Text color="cyan">Enter</Text>
        <Text color="gray"> continue, </Text>
        <Text color="cyan">Esc</Text>
        <Text color="gray"> back</Text>
      </Box>
    </Box>
  );
}
