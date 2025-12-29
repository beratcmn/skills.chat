import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { searchPrompts } from '../api/promptschat';
import type { Prompt } from '../types';

interface Props {
  onSearch: (query: string, results: Prompt[]) => void;
}

export default function Search({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useInput((input, key) => {
    if (key.return && query.trim()) {
      performSearch();
    }
    if (key.backspace || key.delete) {
      setQuery(q => q.slice(0, -1));
    }
    if (key.escape) {
      process.exit(0);
    }
    if (input && !key.ctrl && !key.meta && input.length === 1 && input !== ' ') {
      setQuery(q => q + input);
    }
  });

  const performSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchPrompts(query.trim());
      onSearch(query.trim(), result.prompts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flexDirection="column">
      <Box>
        <Text color="cyan">?</Text>
        <Text> </Text>
        <Text color="gray">Search prompts:</Text>
        <Text> </Text>
        <Text>{query}</Text>
        {loading && <Text color="yellow"> searching...</Text>}
      </Box>
      {error && (
        <Box marginTop={1}>
          <Text color="red">Error: {error}</Text>
        </Box>
      )}
      {!loading && !error && (
        <Box marginTop={1}>
          <Text color="gray">Type to search, </Text>
          <Text color="cyan">Enter</Text>
          <Text color="gray"> to find skills</Text>
        </Box>
      )}
    </Box>
  );
}
