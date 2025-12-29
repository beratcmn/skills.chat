import React from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import { theme } from "../../utils/theme";
import ChristmasTree from "./ChristmasTree";
import SnowAnimation from "./SnowAnimation";

interface Props {
  showBigText?: boolean;
}

function isChristmasSeason(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
  const day = now.getDate();

  // Dec 1 - Dec 31 (month 11) OR Jan 1 - Jan 10 (month 0)
  if (month === 11 && day >= 1) return true;
  if (month === 0 && day <= 10) return true;
  return false;
}

const HEADER_WIDTH = 80;
const HEADER_HEIGHT = 9;

export default function Header({ showBigText = false }: Props) {
  const showChristmas = isChristmasSeason();

  if (showBigText) {
    return (
      <Box flexDirection="column" marginBottom={1}>
        {/* Snow overlay covering the entire header */}
        {showChristmas && (
          <SnowAnimation width={HEADER_WIDTH} height={HEADER_HEIGHT} />
        )}

        <Box flexDirection="row">
          {/* Left column: SKILLS title */}
          <Box flexDirection="column" width={44}>
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

          {/* Right column: Christmas tree aligned with second tool column */}
          {showChristmas && (
            <Box alignItems="flex-start" justifyContent="center">
              <ChristmasTree />
            </Box>
          )}
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
