import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task, TaskStatus } from '../types/task';

export function useTasks() {
  const ctx = useTaskContext();
  const [activeFilter, setActiveFilter] = useState<TaskStatus | 'todas'>('todas');

  const filteredTasks = ctx.filterByStatus(activeFilter);

  async function createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!data.title.trim()) throw new Error('Título é obrigatório');
    await ctx.addTask(data);
  }

  async function editTask(task: Task): Promise<void> {
    if (!task.title.trim()) throw new Error('Título é obrigatório');
    await ctx.updateTask(task);
  }

  async function removeTask(id: string): Promise<void> {
    await ctx.deleteTask(id);
  }

  return {
    tasks: ctx.tasks,
    filteredTasks,
    isLoading: ctx.isLoading,
    activeFilter,
    setActiveFilter,
    createTask,
    editTask,
    removeTask,
    getTaskById: ctx.getTaskById,
  };
}
