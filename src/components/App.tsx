import React, { useState } from "react";
import { Box, Text, useApp } from "ink";
import type { Tool, SelectedSkill, Prompt, FavoritePrompt } from "../types";
import ToolSelector from "./ToolSelector";
import ModeSelector, { type Mode } from "./ModeSelector";
import Search from "./Search";
import Results from "./Results";
import Favorites from "./Favorites";
import NameEditor from "./NameEditor";
import InstallSummary, { Success } from "./InstallSummary";
import { TOOLS } from "../types";
import { loadFavorites } from "../utils/favorites";

type Step =
  | "tool"
  | "mode"
  | "search"
  | "results"
  | "favorites"
  | "names"
  | "summary"
  | "done";

interface AppState {
  step: Step;
  tool: Tool | null;
  mode: Mode | null;
  query: string;
  results: Prompt[];
  selected: Set<string>;
  skills: SelectedSkill[];
}

export default function App() {
  const [state, setState] = useState<AppState>({
    step: "tool",
    tool: null,
    mode: null,
    query: "",
    results: [],
    selected: new Set(),
    skills: [],
  });

  const reset = () => {
    setState({
      step: "tool",
      tool: null,
      mode: null,
      query: "",
      results: [],
      selected: new Set(),
      skills: [],
    });
  };

  const handleToolSelect = (tool: Tool) => {
    setState((s) => ({ ...s, tool, step: "mode" }));
  };

  const handleModeSelect = (mode: Mode) => {
    if (mode === "favorites") {
      setState((s) => ({ ...s, mode, step: "favorites" }));
    } else {
      setState((s) => ({ ...s, mode, step: "search" }));
    }
  };

  const handleSearch = (query: string, results: Prompt[]) => {
    setState((s) => ({ ...s, query, results, step: "results" }));
  };

  const handleSelect = (ids: string[]) => {
    const selected = new Set(ids);
    const skills: SelectedSkill[] = state.results
      .filter((p) => selected.has(p.id))
      .map((p) => ({
        prompt: p,
        name: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      }));
    setState((s) => ({ ...s, selected, skills, step: "names" }));
  };

  const handleFavoritesSelect = (
    ids: string[],
    favorites: FavoritePrompt[],
  ) => {
    const selected = new Set(ids);
    const skills: SelectedSkill[] = favorites
      .filter((f) => selected.has(f.id))
      .map((f) => ({
        prompt: f,
        name: f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      }));
    setState((s) => ({ ...s, selected, skills, step: "names" }));
  };

  const handleNamesConfirm = (skills: SelectedSkill[]) => {
    setState((s) => ({ ...s, skills, step: "summary" }));
  };

  const handleInstall = () => {
    setState((s) => ({ ...s, step: "done" }));
  };

  const handleDone = () => {
    reset();
  };

  const toolInfo = state.tool ? TOOLS.find((t) => t.id === state.tool) : null;

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          ◇
        </Text>
        <Text> </Text>
        <Text bold color="cyan">
          Agent Skills
        </Text>
        <Text> </Text>
        <Text color="gray">- Install skills from prompts.chat</Text>
      </Box>

      {toolInfo && (
        <Box marginBottom={1}>
          <Text color="gray">Target: </Text>
          <Text color={toolInfo.color}>{toolInfo.name}</Text>
        </Box>
      )}

      {state.step === "tool" && <ToolSelector onSelect={handleToolSelect} />}
      {state.step === "mode" && (
        <ModeSelector
          onSelect={handleModeSelect}
          onBack={() => setState((s) => ({ ...s, step: "tool" }))}
          favoritesCount={loadFavorites().length}
        />
      )}
      {state.step === "search" && <Search onSearch={handleSearch} />}
      {state.step === "results" && (
        <Results
          results={state.results}
          selected={state.selected}
          onSelect={handleSelect}
          onBack={() => setState((s) => ({ ...s, step: "search" }))}
        />
      )}
      {state.step === "favorites" && (
        <Favorites
          onSelect={handleFavoritesSelect}
          onBack={() => setState((s) => ({ ...s, step: "mode" }))}
        />
      )}
      {state.step === "names" && (
        <NameEditor
          skills={state.skills}
          onConfirm={handleNamesConfirm}
          onBack={() =>
            setState((s) => ({
              ...s,
              step: state.mode === "favorites" ? "favorites" : "results",
            }))
          }
        />
      )}
      {state.step === "summary" && (
        <InstallSummary
          skills={state.skills}
          tool={state.tool!}
          onInstall={handleInstall}
          onBack={() => setState((s) => ({ ...s, step: "names" }))}
        />
      )}
      {state.step === "done" && (
        <Success
          count={state.skills.length}
          onContinue={handleDone}
          onExit={() => process.exit(0)}
        />
      )}
    </Box>
  );
}
