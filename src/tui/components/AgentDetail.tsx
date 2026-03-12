import React from 'react';
import { Box, Text } from 'ink';
import type { TeammateState } from '../../types.js';
import { formatProgressBar, getStatusColor, formatRelativeTime } from '../utils/format.js';

interface AgentDetailProps {
  agent: TeammateState | null;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent }) => {
  if (!agent) {
    return (
      <Box paddingX={1} paddingY={1}>
        <Text dimColor>Select an agent to view details</Text>
      </Box>
    );
  }

  const statusColor = getStatusColor(agent.status);

  return (
    <Box flexDirection="column" paddingX={1}>
      <Text bold>SELECTED: {agent.name}</Text>
      <Box borderStyle="single" borderColor="gray" flexDirection="column" paddingX={1}>
        <Box>
          <Text dimColor>Role: </Text>
          <Text>{agent.role}</Text>
        </Box>
        <Box>
          <Text dimColor>Model: </Text>
          <Text>{agent.model || 'default'}</Text>
        </Box>
        <Box>
          <Text dimColor>Status: </Text>
          <Text color={statusColor}>{agent.status}</Text>
        </Box>
        {agent.progress !== undefined && (
          <Box>
            <Text dimColor>Progress: </Text>
            <Text color={statusColor}>{formatProgressBar(agent.progress, 10)}</Text>
            <Text> {agent.progress}%</Text>
            {agent.progressNote && (
              <Text dimColor> - {agent.progressNote}</Text>
            )}
          </Box>
        )}
        {(agent.currentTask || agent.todo) && (
          <Box>
            <Text dimColor>Current Task: </Text>
            <Text>{agent.currentTask || agent.todo}</Text>
          </Box>
        )}
        {agent.currentProblem && (
          <Box>
            <Text dimColor>Problem: </Text>
            <Text color="red">{agent.currentProblem}</Text>
          </Box>
        )}
        <Box>
          <Text dimColor>Last Updated: </Text>
          <Text>{formatRelativeTime(agent.lastUpdated)}</Text>
        </Box>
        {agent.pendingTasks && agent.pendingTasks.length > 0 && (
          <Box>
            <Text dimColor>Pending: </Text>
            <Text>{agent.pendingTasks.length} tasks</Text>
          </Box>
        )}
        {agent.completedTasks && agent.completedTasks.length > 0 && (
          <Box>
            <Text dimColor>Completed: </Text>
            <Text>{agent.completedTasks.length} tasks</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AgentDetail;
