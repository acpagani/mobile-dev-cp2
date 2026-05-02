import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TaskStatus } from '../types/task';
import { useTheme } from '../context/ThemeContext';

type FilterValue = TaskStatus | 'todas';

interface FilterBarProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Pendentes', value: 'pendente' },
  { label: 'Em andamento', value: 'em_andamento' },
  { label: 'Concluídas', value: 'concluida' },
];

export function FilterBar({ active, onChange }: FilterBarProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      style={{ flexGrow: 0 }}
    >
      {FILTERS.map((f) => {
        const isActive = active === f.value;
        return (
          <TouchableOpacity
            key={f.value}
            onPress={() => onChange(f.value)}
            style={[
              styles.chip,
              { backgroundColor: isActive ? colors.primary : colors.surfaceAlt },
              { borderColor: isActive ? colors.primary : colors.border },
            ]}
            activeOpacity={0.75}
          >
            <Text style={[styles.chipText, { color: isActive ? '#FFFFFF' : colors.textSecondary }]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    gap: 8, 
    flexDirection: 'row',
    alignItems: 'center'
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipText: { fontSize: 13, fontWeight: '600' },
});
