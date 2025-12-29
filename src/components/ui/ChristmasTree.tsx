import React from "react";
import { Box, Text } from "ink";
import { theme } from "../../utils/theme";

export default function ChristmasTree() {
  const c = theme.christmas;

  return (
    <Box flexDirection="column" alignItems="center">
      {/* Star */}
      <Text color={c.star}>★</Text>

      {/* Tree layers - bigger tree */}
      <Text>
        <Text color={c.treeGreen}>/</Text>
        <Text color={c.ornamentRed}>o</Text>
        <Text color={c.treeGreen}>\</Text>
      </Text>
      <Text>
        <Text color={c.treeGreen}>/</Text>
        <Text color={c.ornamentBlue}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentGold}>o</Text>
        <Text color={c.treeGreen}>\</Text>
      </Text>
      <Text>
        <Text color={c.treeGreen}>/</Text>
        <Text color={c.ornamentGold}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentRed}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentBlue}>o</Text>
        <Text color={c.treeGreen}>\</Text>
      </Text>
      <Text>
        <Text color={c.treeGreen}>/</Text>
        <Text color={c.ornamentRed}>o</Text>
        <Text color={c.treeGreen}>||</Text>
        <Text color={c.ornamentBlue}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentGold}>o</Text>
        <Text color={c.treeGreen}>||</Text>
        <Text color={c.ornamentRed}>o</Text>
        <Text color={c.treeGreen}>\</Text>
      </Text>
      <Text>
        <Text color={c.treeGreen}>/</Text>
        <Text color={c.ornamentBlue}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentGold}>o</Text>
        <Text color={c.treeGreen}>||</Text>
        <Text color={c.ornamentRed}>o</Text>
        <Text color={c.treeGreen}>||</Text>
        <Text color={c.ornamentBlue}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentGold}>o</Text>
        <Text color={c.treeGreen}>\</Text>
      </Text>
      <Text>
        <Text color={c.treeGreen}>/</Text>
        <Text color={c.ornamentGold}>o</Text>
        <Text color={c.treeGreen}>||</Text>
        <Text color={c.ornamentRed}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentBlue}>o</Text>
        <Text color={c.treeGreen}>||</Text>
        <Text color={c.ornamentGold}>o</Text>
        <Text color={c.treeGreen}>|</Text>
        <Text color={c.ornamentRed}>o</Text>
        <Text color={c.treeGreen}>||</Text>
        <Text color={c.ornamentBlue}>o</Text>
        <Text color={c.treeGreen}>\</Text>
      </Text>

      {/* Trunk */}
      <Text color={c.trunk}>|||||</Text>
    </Box>
  );
}
