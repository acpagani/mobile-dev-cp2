import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user, logout, treatment } = useAuth();
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.header, borderBottomColor: colors.border }]}>
      <View style={styles.left}>
        {title ? (
          <Text style={[styles.title, { color: colors.headerText }]}>{title}</Text>
        ) : (
          <>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Olá,</Text>
            <Text style={[styles.name, { color: colors.headerText }]}>
              {treatment ? `${treatment} ` : ''}{user?.name}
            </Text>
          </>
        )}
      </View>
      <View style={styles.right}>
        <View style={[styles.badge, { backgroundColor: user?.role === 'admin' ? colors.primary + '22' : colors.success + '22' }]}>
          <Text style={[styles.badgeText, { color: user?.role === 'admin' ? colors.primary : colors.success }]}>
            {user?.role === 'admin' ? '⚡ Administrador' : '👤 Usuário'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          style={[styles.logoutBtn, { borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.logoutText, { color: colors.danger }]}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  left: { flex: 1 },
  greeting: { fontSize: 12 },
  name: { fontSize: 16, fontWeight: '700' },
  title: { fontSize: 18, fontWeight: '700' },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  logoutBtn: { borderWidth: 1.5, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  logoutText: { fontSize: 13, fontWeight: '600' },
});
