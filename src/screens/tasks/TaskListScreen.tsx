import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../../components/Header';
import { FilterBar } from '../../components/FilterBar';
import { TaskCard } from '../../components/TaskCard';
import { EmptyState } from '../../components/EmptyState';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../context/ThemeContext';
import { TaskStackParamList } from '../../types/navigation';

type NavProp = NativeStackNavigationProp<TaskStackParamList, 'TaskList'>;

export function TaskListScreen() {
  const { colors } = useTheme();
  const { filteredTasks, activeFilter, setActiveFilter, isLoading } = useTasks();
  const navigation = useNavigation<NavProp>();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header title="Tarefas" />
      <FilterBar
        active={activeFilter} onChange={setActiveFilter} />
      <FlatList
        style={{ flex: 1 }}
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="📋"
            title="Nenhuma tarefa aqui"
            subtitle="Toque no botão + para criar sua primeira tarefa"
          />
        }
        contentContainerStyle={filteredTasks.length === 0 ? { flex: 1 } : { paddingTop: 4, paddingBottom: 100 }}
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('TaskForm', {})}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  fabText: { color: '#FFF', fontSize: 28, fontWeight: '300', lineHeight: 32 },
});
