import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/Header';
import { TreatmentPreference } from '../../types/user';

const TREATMENTS: TreatmentPreference[] = ['', 'Sr.', 'Sra.', 'Srta.'];

export function SettingsScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const { user, treatment, setTreatment, logout } = useAuth();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header title="Configurações" />
      <ScrollView contentContainerStyle={styles.content}>

        {/* Profile */}
        <Text style={[styles.section, { color: colors.textSecondary }]}>Perfil</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={styles.profileIcon}>👤</Text>
          <View>
            <Text style={[styles.profileName, { color: colors.text }]}>{user?.name}</Text>
            <Text style={[styles.profileRole, { color: colors.primary }]}>
              {user?.role === 'admin' ? '⚡ Administrador' : '👤 Usuário comum'}
            </Text>
          </View>
        </View>

        {/* Treatment */}
        <Text style={[styles.section, { color: colors.textSecondary }]}>Preferência de tratamento</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, flexDirection: 'row', gap: 10 }]}>
          {TREATMENTS.map((t) => (
            <TouchableOpacity
              key={t || 'none'}
              onPress={() => setTreatment(t)}
              style={[
                styles.treatChip,
                { backgroundColor: treatment === t ? colors.primary : colors.surfaceAlt, borderColor: treatment === t ? colors.primary : colors.border },
              ]}
            >
              <Text style={{ color: treatment === t ? '#FFF' : colors.text, fontWeight: '600', fontSize: 13 }}>
                {t || 'Nenhum'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme */}
        <Text style={[styles.section, { color: colors.textSecondary }]}>Aparência</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.themeRow}>
            <Text style={styles.themeIcon}>{theme === 'dark' ? '🌙' : '☀️'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.themeLabel, { color: colors.text }]}>
                Modo {theme === 'dark' ? 'escuro' : 'claro'}
              </Text>
              <Text style={[styles.themeDesc, { color: colors.textSecondary }]}>
                Salvo automaticamente
              </Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutCard, { borderColor: colors.danger + '55' }]}
          onPress={logout}
          activeOpacity={0.75}
        >
          <Text style={[styles.logoutText, { color: colors.danger }]}>🚪 Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 20 },
  section: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, marginTop: 8 },
  card: { borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileIcon: { fontSize: 40 },
  profileName: { fontSize: 17, fontWeight: '700' },
  profileRole: { fontSize: 13, marginTop: 2 },
  treatChip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5 },
  themeRow: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  themeIcon: { fontSize: 28 },
  themeLabel: { fontSize: 15, fontWeight: '600' },
  themeDesc: { fontSize: 12, marginTop: 2 },
  logoutCard: { borderRadius: 16, borderWidth: 2, padding: 16, alignItems: 'center', marginTop: 8 },
  logoutText: { fontSize: 15, fontWeight: '700' },
});
