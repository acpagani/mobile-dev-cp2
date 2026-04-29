import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../hooks/useTasks';
import { Header } from '../../components/Header';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { TaskStackParamList } from '../../types/navigation';
import { formatDate } from '../../utils/formatDate';

type NavProp = NativeStackNavigationProp<TaskStackParamList, 'TaskDetail'>;
type RouteType = RouteProp<TaskStackParamList, 'TaskDetail'>;

export function TaskDetailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteType>();
  const { getTaskById, removeTask } = useTasks();

  const task = getTaskById(route.params.taskId);

  if (!task) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Header title="Detalhes" />
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>
            Tarefa não encontrada.
          </Text>
        </View>
      </View>
    );
  }

  function handleDelete() {
    Alert.alert(
      'Excluir tarefa',
      `Tem certeza que deseja excluir "${task!.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await removeTask(task!.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header title="Detalhes" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.icon}>{task.categoryIcon || '📌'}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>

          <View style={styles.badgeRow}>
            <StatusBadge type="status" value={task.status} />
            <StatusBadge type="priority" value={task.priority} />
          </View>

          {task.description ? (
            <Text style={[styles.desc, { color: colors.textSecondary }]}>{task.description}</Text>
          ) : null}

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Row label="Categoria" value={task.category} colors={colors} />
          <Row label="Criada em" value={formatDate(task.createdAt)} colors={colors} />
          <Row label="Atualizada em" value={formatDate(task.updatedAt)} colors={colors} />
        </View>

        <CustomButton
          title="✏️  Editar"
          onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
          style={{ marginBottom: 12 }}
        />
        <CustomButton
          title="🗑️  Excluir"
          onPress={handleDelete}
          variant="danger"
        />
      </ScrollView>
    </View>
  );
}

function Row({ label, value, colors }: { label: string; value: string; colors: { textSecondary: string; text: string } }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 16 },
  card: { borderRadius: 20, padding: 20, borderWidth: 1, marginBottom: 20 },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  desc: { fontSize: 15, lineHeight: 22, marginBottom: 16 },
  divider: { height: 1, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel: { fontSize: 13, fontWeight: '600' },
  rowValue: { fontSize: 13 },
});
