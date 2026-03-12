import { useState, useEffect, useCallback } from 'react';
import { listTasks } from '../../store.js';
import type { TaskState } from '../../types.js';

/**
 * Hook to load and poll tasks
 */
export function useTasks(pollIntervalMs: number = 3000): {
  tasks: TaskState[];
  refresh: () => void;
} {
  const [tasks, setTasks] = useState<TaskState[]>([]);

  const loadTasks = useCallback(() => {
    try {
      const data = listTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Polling
  useEffect(() => {
    const interval = setInterval(loadTasks, pollIntervalMs);
    return () => clearInterval(interval);
  }, [loadTasks, pollIntervalMs]);

  return { tasks, refresh: loadTasks };
}
