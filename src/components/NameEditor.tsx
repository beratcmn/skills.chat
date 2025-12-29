import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import type { SelectedSkill } from "../types";
import { KeyHint } from "./ui";
import { theme } from "../utils/theme";

interface Props {
  skills: SelectedSkill[];
  onConfirm: (skills: SelectedSkill[]) => void;
  onBack: () => void;
}

const isValidKebabCase = (str: string): boolean => {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
};

export default function NameEditor({ skills, onConfirm, onBack }: Props) {
  const [editingIdx, setEditingIdx] = useState(0);
  const [names, setNames] = useState(skills.map((s) => s.name));
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(timer);
  }, []);

  useInput((input, key) => {
    if (key.upArrow) {
      setEditingIdx((i) => Math.max(0, i - 1));
    }
    if (key.downArrow) {
      setEditingIdx((i) => Math.min(skills.length - 1, i + 1));
    }
    if (key.backspace || key.delete) {
      setNames((n) => {
        const copy = [...n];
        copy[editingIdx] = copy[editingIdx].slice(0, -1);
        return copy;
      });
    }
    if (key.return) {
      const allValid = names.every((n) => n.length > 0 && isValidKebabCase(n));
      if (allValid) {
        const updated = skills.map((s, i) => ({ ...s, name: names[i] }));
        onConfirm(updated);
      }
    }
    if (key.escape || input === "b") {
      onBack();
    }
    if (input && !key.ctrl && !key.meta && input.length === 1) {
      const char = input.toLowerCase();
      if (/[a-z0-9-]/.test(char)) {
        setNames((n) => {
          const copy = [...n];
          copy[editingIdx] += char;
          return copy;
        });
      }
    }
  });

  const allValid = names.every((n) => n.length > 0 && isValidKebabCase(n));

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color={theme.colors.text}>Edit skill names </Text>
        <Text color={theme.colors.textMuted}>(kebab-case only)</Text>
      </Box>

      {skills.map((skill, idx) => {
        const isEditing = idx === editingIdx;
        const name = names[idx];
        const isValid = name.length > 0 && isValidKebabCase(name);
        const isEmpty = name.length === 0;

        return (
          <Box key={skill.prompt.id} flexDirection="column" marginBottom={1}>
            <Box>
              <Text color={theme.colors.textMuted}>
                {idx + 1}. {skill.prompt.title}
              </Text>
            </Box>
            <Box>
              <Text color={isEditing ? theme.colors.primary : theme.colors.textDim}>
                {isEditing ? theme.icons.cursor : " "}{" "}
              </Text>
              <Text color={theme.colors.border}>
                {theme.icons.box.topLeft}
                {theme.icons.box.horizontal.repeat(38)}
                {theme.icons.box.topRight}
              </Text>
            </Box>
            <Box>
              <Text>{"  "}</Text>
              <Text
                color={
                  isEditing
                    ? theme.colors.primary
                    : isValid
                      ? theme.colors.border
                      : theme.colors.error
                }
              >
                {theme.icons.box.vertical}
              </Text>
              <Text color={isEditing ? theme.colors.text : theme.colors.textMuted}>
                {" "}
                {name}
              </Text>
              {isEditing && (
                <Text color={cursorVisible ? theme.colors.primary : "transparent"}>
                  ▌
                </Text>
              )}
              <Text>{"".padEnd(Math.max(0, 36 - name.length - (isEditing ? 1 : 0)))}</Text>
              <Text
                color={
                  isEditing
                    ? theme.colors.primary
                    : isValid
                      ? theme.colors.border
                      : theme.colors.error
                }
              >
                {theme.icons.box.vertical}
              </Text>
            </Box>
            <Box>
              <Text>{"  "}</Text>
              <Text color={theme.colors.border}>
                {theme.icons.box.bottomLeft}
                {theme.icons.box.horizontal.repeat(38)}
                {theme.icons.box.bottomRight}
              </Text>
            </Box>
            {!isValid && !isEmpty && (
              <Box paddingLeft={3}>
                <Text color={theme.colors.error}>
                  ✗ Use lowercase letters, numbers, and hyphens only
                </Text>
              </Box>
            )}
            {isEmpty && (
              <Box paddingLeft={3}>
                <Text color={theme.colors.error}>✗ Name cannot be empty</Text>
              </Box>
            )}
          </Box>
        );
      })}

      <Box marginTop={1}>
        {allValid ? (
          <Text color={theme.colors.success}>
            {theme.icons.check} All names are valid
          </Text>
        ) : (
          <Text color={theme.colors.warning}>
            ⚠ Fix validation errors to continue
          </Text>
        )}
      </Box>

      <KeyHint
        hints={[
          { key: "↑↓", label: "switch field" },
          { key: "Type", label: "edit name" },
          { key: "Enter", label: "confirm" },
          { key: "Esc", label: "back" },
        ]}
      />
    </Box>
  );
}
