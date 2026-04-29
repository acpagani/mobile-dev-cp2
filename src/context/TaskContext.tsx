import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, TaskStatus } from '../types/task';
import * as taskStorage from '../services/taskStorage';
import { generateId } from '../utils/generateId';

interface TaskContextData {
  tasks: Task[];
  isLoading: boolean;
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (updated: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
  filterByStatus: (status: TaskStatus | 'todas') => Task[];
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    taskStorage.loadTasks().then((loaded) => {
      setTasks(loaded);
      setIsLoading(false);
    });
  }, []);

  async function addTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const now = new Date().toISOString();
    const task: Task = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    const updated = [...tasks, task];
    setTasks(updated);
    await taskStorage.saveTasks(updated);
  }

  async function updateTask(updated: Task): Promise<void> {
    const now = new Date().toISOString();
    const task = { ...updated, updatedAt: now };
    const updatedList = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(updatedList);
    await taskStorage.saveTasks(updatedList);
  }

  async function deleteTask(id: string): Promise<void> {
    const filtered = tasks.filter((t) => t.id !== id);
    setTasks(filtered);
    await taskStorage.saveTasks(filtered);
  }

  function getTaskById(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
  }

  function filterByStatus(status: TaskStatus | 'todas'): Task[] {
    if (status === 'todas') return tasks;
    return tasks.filter((t) => t.status === status);
  }

  return (
    <TaskContext.Provider
      value={{ tasks, isLoading, addTask, updateTask, deleteTask, getTaskById, filterByStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextData {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be inside TaskProvider');
  return ctx;
}
