import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { SelectedSkill } from '../types';

interface Props {
  skills: SelectedSkill[];
  onConfirm: (skills: SelectedSkill[]) => void;
  onBack: () => void;
}

export default function NameEditor({ skills, onConfirm, onBack }: Props) {
  const [editingIdx, setEditingIdx] = useState(0);
  const [names, setNames] = useState(skills.map(s => s.name));

  useInput((input, key) => {
    if (key.upArrow) {
      setEditingIdx(i => Math.max(0, i - 1));
    }
    if (key.downArrow) {
      setEditingIdx(i => Math.min(skills.length - 1, i + 1));
    }
    if (key.backspace || key.delete) {
      setNames(n => {
        const copy = [...n];
        copy[editingIdx] = copy[editingIdx].slice(0, -1);
        return copy;
      });
    }
    if (key.return) {
      const updated = skills.map((s, i) => ({ ...s, name: names[i] }));
      onConfirm(updated);
    }
    if (key.escape || input === 'b') {
      onBack();
    }
    if (input && !key.ctrl && !key.meta && input.length === 1) {
      setNames(n => {
        const copy = [...n];
        copy[editingIdx] += input;
        return copy;
      });
    }
  });

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color="gray">Edit skill names (kebab-case):</Text>
      </Box>

      {skills.map((skill, idx) => (
        <Box key={skill.prompt.id}>
          {idx === editingIdx ? (
            <Text color="cyan">▸</Text>
          ) : (
            <Text> </Text>
          )}
          <Text> </Text>
          <Text color="gray">{idx + 1}.</Text>
          <Text> </Text>
          <Text color="white">{names[idx]}</Text>
        </Box>
      ))}

      <Box marginTop={1}>
        <Text color="gray">↑↓ navigate, </Text>
        <Text color="cyan">Edit name</Text>
        <Text color="gray">, </Text>
        <Text color="cyan">Enter</Text>
        <Text color="gray"> confirm, </Text>
        <Text color="cyan">Esc</Text>
        <Text color="gray"> back</Text>
      </Box>
    </Box>
  );
}
