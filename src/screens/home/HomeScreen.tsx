import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Header } from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../hooks/useTasks';
import { fetchMotivationalQuote, Quote } from '../../services/api';
import { TabParamList } from '../../types/navigation';

type HomeNavProp = BottomTabNavigationProp<TabParamList, 'HomeTab'>;

export function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { tasks } = useTasks();
  const navigation = useNavigation<HomeNavProp>();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState('');

  useEffect(() => {
    fetchMotivationalQuote()
      .then(setQuote)
      .catch(() => setQuoteError('Não foi possível carregar a frase.'))
      .finally(() => setQuoteLoading(false));
  }, []);

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'pendente').length;
  const inProgress = tasks.filter((t) => t.status === 'em_andamento').length;
  const done = tasks.filter((t) => t.status === 'concluida').length;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Stats */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Resumo</Text>
        <View style={styles.statsRow}>
          <StatCard label="Total" value={total} color={colors.primary} bg={colors.primary + '18'} />
          <StatCard label="Pendentes" value={pending} color={colors.warning} bg={colors.warning + '18'} />
          <StatCard label="Em andamento" value={inProgress} color={colors.info} bg={colors.info + '18'} />
          <StatCard label="Concluídas" value={done} color={colors.success} bg={colors.success + '18'} />
        </View>

        {/* Motivational quote */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary, marginTop: 24 }]}>
          Frase do dia
        </Text>
        <View style={[styles.quoteCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {quoteLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : quoteError ? (
            <Text style={[styles.quoteError, { color: colors.textSecondary }]}>{quoteError}</Text>
          ) : (
            <>
              <Text style={[styles.quoteText, { color: colors.text }]}>"{quote?.q}"</Text>
              <Text style={[styles.quoteAuthor, { color: colors.primary }]}>— {quote?.a}</Text>
            </>
          )}
        </View>

        {/* Quick access */}
        <TouchableOpacity
          style={[styles.quickBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('TasksTab')}
          activeOpacity={0.8}
        >
          <Text style={styles.quickBtnText}>➕ Nova tarefa</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function StatCard({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.statCard, { backgroundColor: bg }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, borderRadius: 14, padding: 12, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 10, fontWeight: '600', marginTop: 2, textAlign: 'center' },
  quoteCard: { borderRadius: 16, padding: 20, borderWidth: 1 },
  quoteText: { fontSize: 15, fontStyle: 'italic', lineHeight: 22, marginBottom: 10 },
  quoteAuthor: { fontSize: 13, fontWeight: '700' },
  quoteError: { fontSize: 14 },
  quickBtn: { marginTop: 24, borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center' },
  quickBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
