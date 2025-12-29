import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import Gradient from "ink-gradient";
import type { Tool, SelectedSkill } from "../types";
import { TOOLS } from "../utils/tools";
import { installSkill } from "../utils/paths";
import { KeyHint, Spinner, Card } from "./ui";
import { theme } from "../utils/theme";

interface Props {
  skills: SelectedSkill[];
  tool: Tool;
  onInstall: () => void;
  onBack: () => void;
}

export default function InstallSummary({
  skills,
  tool,
  onInstall,
  onBack,
}: Props) {
  const toolInfo = TOOLS.find((t) => t.id === tool)!;
  const [installing, setInstalling] = useState(false);
  const [progress, setProgress] = useState(0);

  useInput(
    (input, key) => {
      if (installing) return;

      if (key.return) {
        setInstalling(true);
      }
      if (key.escape || input === "b") {
        onBack();
      }
    },
    { isActive: !installing },
  );

  useEffect(() => {
    if (!installing) return;

    const installNext = async () => {
      for (let i = 0; i < skills.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        installSkill(tool, skills[i]);
        setProgress(i + 1);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      onInstall();
    };

    installNext();
  }, [installing]);

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text color={theme.colors.text}>
          {installing ? "Installing" : "Ready to install"}{" "}
        </Text>
        <Text color={theme.colors.cyan} bold>
          {skills.length}
        </Text>
        <Text color={theme.colors.text}> skill(s) to </Text>
        <Text color={toolInfo.displayColor} bold>
          {toolInfo.icon} {toolInfo.name}
        </Text>
      </Box>

      <Card borderColor={theme.colors.border} width={56}>
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text color={theme.colors.textMuted}>📁 {toolInfo.basePath}/</Text>
          </Box>
          {skills.map((skill, idx) => {
            const isInstalled = progress > idx;
            const isInstalling = installing && progress === idx;

            return (
              <Box key={skill.prompt.id}>
                <Text color={theme.colors.textDim}>{"   ├── "}</Text>
                {isInstalled ? (
                  <Text color={theme.colors.success}>{theme.icons.check} </Text>
                ) : isInstalling ? (
                  <Spinner color={theme.colors.cyan} />
                ) : (
                  <Text color={theme.colors.textDim}>○ </Text>
                )}
                <Text
                  color={
                    isInstalled
                      ? theme.colors.success
                      : isInstalling
                        ? theme.colors.cyan
                        : theme.colors.textMuted
                  }
                >
                  {skill.name}/
                </Text>
                <Text color={theme.colors.textDim}>SKILL.md</Text>
              </Box>
            );
          })}
        </Box>
      </Card>

      {installing && (
        <Box marginTop={1}>
          <Text color={theme.colors.cyan}>
            Installing... {progress}/{skills.length}
          </Text>
        </Box>
      )}

      {!installing && (
        <>
          <Box marginTop={1}>
            <Text color={theme.colors.success}>
              {theme.icons.arrow} Proceed with installation?
            </Text>
          </Box>

          <KeyHint
            hints={[
              { key: "Enter", label: "install" },
              { key: "Esc", label: "cancel" },
            ]}
          />
        </>
      )}
    </Box>
  );
}

interface SuccessProps {
  count: number;
  onContinue: () => void;
  onExit: () => void;
}

export function Success({ count, onContinue, onExit }: SuccessProps) {
  const [frame, setFrame] = useState(0);
  const sparkles = ["✨", "🎉", "⭐", "💫"];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((f) => (f + 1) % sparkles.length);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  useInput((input, key) => {
    if (key.return || input === " ") {
      onContinue();
    }
    if (key.escape || input === "q") {
      onExit();
    }
  });

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Gradient name="pastel">
          <Text bold>
            {sparkles[frame]} Installation Complete! {sparkles[frame]}
          </Text>
        </Gradient>
      </Box>

      <Card borderColor={theme.colors.success} width={50}>
        <Box flexDirection="column" alignItems="center">
          <Text color={theme.colors.success} bold>
            {theme.icons.check} Successfully installed {count} skill
            {count > 1 ? "s" : ""}
          </Text>
          <Box marginTop={1}>
            <Text color={theme.colors.textMuted}>
              Skills are ready to use in your project
            </Text>
          </Box>
        </Box>
      </Card>

      <KeyHint
        hints={[
          { key: "Enter", label: "install more" },
          { key: "q/Esc", label: "exit" },
        ]}
      />
    </Box>
  );
}
