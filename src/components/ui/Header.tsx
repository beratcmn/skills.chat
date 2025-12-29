import React from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import { theme } from "../../utils/theme";

interface Props {
  showBigText?: boolean;
}

export default function Header({ showBigText = false }: Props) {
  if (showBigText) {
    return (
      <Box flexDirection="column" marginBottom={1}>
        <Gradient name="pastel">
          <BigText text="skills" font="tiny" />
        </Gradient>
        <Box marginTop={-1}>
          <Text color={theme.colors.textMuted}>
            {theme.icons.bullet} Install agent skills from{" "}
          </Text>
          <Text color={theme.colors.cyan}>prompts.chat</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box marginBottom={1}>
      <Gradient name="pastel">
        <Text bold>◇ skills.chat</Text>
      </Gradient>
      <Text color={theme.colors.textMuted}> {theme.icons.arrow} </Text>
      <Text color={theme.colors.textDim}>Install agent skills</Text>
    </Box>
  );
}
