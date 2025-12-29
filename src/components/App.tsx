import React, { useState } from 'react';
import { Box, Text, useApp } from 'ink';
import type { Tool, SelectedSkill, Prompt } from '../types';
import ToolSelector from './ToolSelector';
import Search from './Search';
import Results from './Results';
import NameEditor from './NameEditor';
import InstallSummary, { Success } from './InstallSummary';
import { TOOLS } from '../types';

type Step = 'tool' | 'search' | 'results' | 'names' | 'summary' | 'done';

interface AppState {
  step: Step;
  tool: Tool | null;
  query: string;
  results: Prompt[];
  selected: Set<string>;
  skills: SelectedSkill[];
}

export default function App() {
  const [state, setState] = useState<AppState>({
    step: 'tool',
    tool: null,
    query: '',
    results: [],
    selected: new Set(),
    skills: [],
  });

  const reset = () => {
    setState({
      step: 'tool',
      tool: null,
      query: '',
      results: [],
      selected: new Set(),
      skills: [],
    });
  };

  const handleToolSelect = (tool: Tool) => {
    setState(s => ({ ...s, tool, step: 'search' }));
  };

  const handleSearch = (query: string, results: Prompt[]) => {
    setState(s => ({ ...s, query, results, step: 'results' }));
  };

  const handleSelect = (ids: string[]) => {
    const selected = new Set(ids);
    const skills: SelectedSkill[] = state.results
      .filter(p => selected.has(p.id))
      .map(p => ({
        prompt: p,
        name: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      }));
    setState(s => ({ ...s, selected, skills, step: 'names' }));
  };

  const handleNamesConfirm = (skills: SelectedSkill[]) => {
    setState(s => ({ ...s, skills, step: 'summary' }));
  };

  const handleInstall = () => {
    setState(s => ({ ...s, step: 'done' }));
  };

  const handleDone = () => {
    reset();
  };

  const toolInfo = state.tool ? TOOLS.find(t => t.id === state.tool) : null;

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">◇</Text>
        <Text> </Text>
        <Text bold color="cyan">Agent Skills</Text>
        <Text> </Text>
        <Text color="gray">- Install skills from prompts.chat</Text>
      </Box>

      {toolInfo && (
        <Box marginBottom={1}>
          <Text color="gray">Target: </Text>
          <Text color={toolInfo.color}>{toolInfo.name}</Text>
        </Box>
      )}

      {state.step === 'tool' && (
        <ToolSelector onSelect={handleToolSelect} />
      )}
      {state.step === 'search' && (
        <Search onSearch={handleSearch} />
      )}
      {state.step === 'results' && (
        <Results
          results={state.results}
          selected={state.selected}
          onSelect={handleSelect}
          onBack={() => setState(s => ({ ...s, step: 'search' }))}
        />
      )}
      {state.step === 'names' && (
        <NameEditor
          skills={state.skills}
          onConfirm={handleNamesConfirm}
          onBack={() => setState(s => ({ ...s, step: 'results' }))}
        />
      )}
      {state.step === 'summary' && (
        <InstallSummary
          skills={state.skills}
          tool={state.tool!}
          onInstall={handleInstall}
          onBack={() => setState(s => ({ ...s, step: 'names' }))}
        />
      )}
      {state.step === 'done' && (
        <Success
          count={state.skills.length}
          onContinue={handleDone}
          onExit={() => process.exit(0)}
        />
      )}
    </Box>
  );
}
