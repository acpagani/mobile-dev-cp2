import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@taskflow:tasks';

export async function loadTasks(): Promise<Task[]> {
  try {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    return data ? (JSON.parse(data) as Task[]) : [];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export async function addTask(task: Task): Promise<void> {
  const tasks = await loadTasks();
  tasks.push(task);
  await saveTasks(tasks);
}

export async function updateTask(updated: Task): Promise<void> {
  const tasks = await loadTasks();
  const index = tasks.findIndex((t) => t.id === updated.id);
  if (index !== -1) {
    tasks[index] = updated;
    await saveTasks(tasks);
  }
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = await loadTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  await saveTasks(filtered);
}
