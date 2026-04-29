import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../hooks/useTasks';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { TaskStatus, TaskPriority } from '../../types/task';
import { TaskStackParamList } from '../../types/navigation';
import { fetchCategories } from '../../services/api';

type NavProp = NativeStackNavigationProp<TaskStackParamList, 'TaskForm'>;
type RoutePropType = RouteProp<TaskStackParamList, 'TaskForm'>;

const CATEGORY_ICONS: Record<string, string> = {
  default: '📌',
  smartphones: '📱', laptops: '💻', fragrances: '🌸', skincare: '✨',
  groceries: '🛒', 'home-decoration': '🏠', furniture: '🪑', tops: '👕',
  automotive: '🚗', motorcycle: '🏍️', lighting: '💡',
};

const STATUSES: { label: string; value: TaskStatus }[] = [
  { label: 'Pendente', value: 'pendente' },
  { label: 'Em andamento', value: 'em_andamento' },
  { label: 'Concluída', value: 'concluida' },
];

const PRIORITIES: { label: string; value: TaskPriority }[] = [
  { label: 'Baixa', value: 'baixa' },
  { label: 'Média', value: 'media' },
  { label: 'Alta', value: 'alta' },
];

export function TaskFormScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();
  const { createTask, editTask, getTaskById } = useTasks();

  const taskId = route.params?.taskId;
  const isEdit = !!taskId;
  const existingTask = taskId ? getTaskById(taskId) : undefined;

  const [title, setTitle] = useState(existingTask?.title ?? '');
  const [description, setDescription] = useState(existingTask?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(existingTask?.status ?? 'pendente');
  const [priority, setPriority] = useState<TaskPriority>(existingTask?.priority ?? 'media');
  const [category, setCategory] = useState(existingTask?.category ?? '');
  const [categoryIcon, setCategoryIcon] = useState(existingTask?.categoryIcon ?? '📌');
  const [categories, setCategories] = useState<string[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories(['Trabalho', 'Pessoal', 'Estudos', 'Saúde', 'Finanças']))
      .finally(() => setCatLoading(false));
  }, []);

  async function handleSave() {
    if (!title.trim()) {
      setTitleError('Título é obrigatório');
      return;
    }
    setTitleError('');
    setSaving(true);
    try {
      if (isEdit && existingTask) {
        await editTask({ ...existingTask, title, description, status, priority, category, categoryIcon });
      } else {
        await createTask({ title, description, status, priority, category, categoryIcon });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    } finally {
      setSaving(false);
    }
  }

  function selectCategory(cat: string) {
    setCategory(cat);
    const slug = cat.toLowerCase().replace(/ /g, '-');
    setCategoryIcon(CATEGORY_ICONS[slug] ?? CATEGORY_ICONS.default);
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header title={isEdit ? 'Editar Tarefa' : 'Nova Tarefa'} />
      <ScrollView contentContainerStyle={styles.content}>
        <CustomInput
          label="Título *"
          placeholder="Ex: Estudar React Native"
          value={title}
          onChangeText={(t) => { setTitle(t); if (t) setTitleError(''); }}
          error={titleError}
        />

        <CustomInput
          label="Descrição"
          placeholder="Descreva a tarefa..."
          value={description}
          onChangeText={setDescription}
          multiline
          style={{ height: 80 }}
          containerStyle={{ marginBottom: 16 }}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Status</Text>
        <View style={styles.chipRow}>
          {STATUSES.map((s) => (
            <TouchableOpacity
              key={s.value}
              onPress={() => setStatus(s.value)}
              style={[styles.chip, { backgroundColor: status === s.value ? colors.primary : colors.surfaceAlt, borderColor: status === s.value ? colors.primary : colors.border }]}
            >
              <Text style={{ color: status === s.value ? '#FFF' : colors.text, fontSize: 13, fontWeight: '600' }}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Prioridade</Text>
        <View style={styles.chipRow}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p.value}
              onPress={() => setPriority(p.value)}
              style={[styles.chip, { backgroundColor: priority === p.value ? colors.primary : colors.surfaceAlt, borderColor: priority === p.value ? colors.primary : colors.border }]}
            >
              <Text style={{ color: priority === p.value ? '#FFF' : colors.text, fontSize: 13, fontWeight: '600' }}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Categoria</Text>
        {catLoading ? (
          <ActivityIndicator color={colors.primary} style={{ marginBottom: 16 }} />
        ) : (
          <View style={styles.chipRow}>
            {categories.slice(0, 10).map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => selectCategory(c)}
                style={[styles.chip, { backgroundColor: category === c ? colors.primary : colors.surfaceAlt, borderColor: category === c ? colors.primary : colors.border }]}
              >
                <Text style={{ color: category === c ? '#FFF' : colors.text, fontSize: 13, fontWeight: '600' }}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <CustomButton
          title={isEdit ? 'Salvar alterações' : 'Criar tarefa'}
          onPress={handleSave}
          loading={saving}
          style={{ marginTop: 8 }}
        />
        <CustomButton
          title="Cancelar"
          onPress={() => navigation.goBack()}
          variant="ghost"
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8, letterSpacing: 0.3 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
});
