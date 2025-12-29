import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import { searchPrompts } from "../api/promptschat";
import type { Prompt } from "../types";
import { KeyHint, Spinner } from "./ui";
import { theme } from "../utils/theme";

interface Props {
  onSearch: (query: string, results: Prompt[]) => void;
}

export default function Search({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(timer);
  }, []);

  useInput((input, key) => {
    if (key.return && query.trim()) {
      performSearch();
    }
    if (key.backspace || key.delete) {
      setQuery((q) => q.slice(0, -1));
    }
    if (key.escape) {
      process.exit(0);
    }
    if (input && !key.ctrl && !key.meta && input.length === 1) {
      setQuery((q) => q + input);
    }
  });

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchPrompts(query.trim());
      onSearch(query.trim(), result.prompts);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color={theme.colors.text}>Search for agent skills</Text>
      </Box>

      <Box>
        <Text color={theme.colors.border}>
          {theme.icons.box.topLeft}
          {theme.icons.box.horizontal.repeat(48)}
          {theme.icons.box.topRight}
        </Text>
      </Box>
      <Box>
        <Text color={theme.colors.border}>{theme.icons.box.vertical}</Text>
        <Text color={theme.colors.pink}> 🔍 </Text>
        <Text color={theme.colors.text}>{query}</Text>
        <Text color={cursorVisible ? theme.colors.primary : "transparent"}>
          ▌
        </Text>
        <Text>{"".padEnd(Math.max(0, 44 - query.length))}</Text>
        <Text color={theme.colors.border}>{theme.icons.box.vertical}</Text>
      </Box>
      <Box>
        <Text color={theme.colors.border}>
          {theme.icons.box.bottomLeft}
          {theme.icons.box.horizontal.repeat(48)}
          {theme.icons.box.bottomRight}
        </Text>
      </Box>

      {loading && (
        <Box marginTop={1}>
          <Spinner
            color={theme.colors.cyan}
            label="Searching prompts.chat..."
          />
        </Box>
      )}

      {error && (
        <Box marginTop={1}>
          <Text color={theme.colors.error}>✗ Error: {error}</Text>
        </Box>
      )}

      {!loading && !error && (
        <Box marginTop={1}>
          <Text color={theme.colors.textMuted}>
            Type to search, then press{" "}
          </Text>
          <Text color={theme.colors.primary}>Enter</Text>
          <Text color={theme.colors.textMuted}> to find skills</Text>
        </Box>
      )}

      <KeyHint
        hints={[
          { key: "Enter", label: "search" },
          { key: "Esc", label: "exit" },
        ]}
      />
    </Box>
  );
}
