import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/task';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '../context/ThemeContext';
import { formatDateShort } from '../utils/formatDate';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export function TaskCard({ task, onPress }: TaskCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}
    >
      <View style={styles.top}>
        <Text style={styles.icon}>{task.categoryIcon || '📌'}</Text>
        <View style={styles.badges}>
          <StatusBadge type="status" value={task.status} />
          <StatusBadge type="priority" value={task.priority} />
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {task.title}
      </Text>

      {task.description ? (
        <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={2}>
          {task.description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <View style={[styles.categoryTag, { backgroundColor: colors.surfaceAlt }]}>
          <Text style={[styles.categoryText, { color: colors.textSecondary }]}>{task.category}</Text>
        </View>
        <Text style={[styles.date, { color: colors.placeholder }]}>
          {formatDateShort(task.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  icon: { fontSize: 28 },
  badges: { flexDirection: 'row', gap: 6 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4, lineHeight: 22 },
  desc: { fontSize: 13, lineHeight: 18, marginBottom: 10 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  categoryTag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  categoryText: { fontSize: 11, fontWeight: '600' },
  date: { fontSize: 11 },
});
