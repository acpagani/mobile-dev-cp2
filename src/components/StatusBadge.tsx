import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskStatus, TaskPriority } from '../types/task';
import { useTheme } from '../context/ThemeContext';

interface StatusBadgeProps {
  type: 'status' | 'priority';
  value: TaskStatus | TaskPriority;
}

export function StatusBadge({ type, value }: StatusBadgeProps) {
  const { colors } = useTheme();

  const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string }> = {
    pendente: { label: 'Pendente', color: colors.warning, bg: colors.warning + '22' },
    em_andamento: { label: 'Em andamento', color: colors.info, bg: colors.info + '22' },
    concluida: { label: 'Concluída', color: colors.success, bg: colors.success + '22' },
  };

  const priorityConfig: Record<TaskPriority, { label: string; color: string; bg: string }> = {
    baixa: { label: 'Baixa', color: colors.success, bg: colors.success + '22' },
    media: { label: 'Média', color: colors.warning, bg: colors.warning + '22' },
    alta: { label: 'Alta', color: colors.danger, bg: colors.danger + '22' },
  };

  const config = type === 'status'
    ? statusConfig[value as TaskStatus]
    : priorityConfig[value as TaskPriority];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
});
