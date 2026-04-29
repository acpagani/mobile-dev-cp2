import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';

export function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    setError('');
    const success = await login(username.trim(), password);
    setLoading(false);
    if (!success) setError('Usuário ou senha inválidos.');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logoArea}>
          <Text style={styles.logo}>✅</Text>
          <Text style={[styles.appName, { color: colors.text }]}>TaskFlow</Text>
          <Text style={[styles.tagline, { color: colors.textSecondary }]}>
            Gerencie suas tarefas com eficiência
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.formTitle, { color: colors.text }]}>Entrar</Text>

          <CustomInput
            label="Usuário"
            placeholder="Digite seu usuário"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureToggle
          />

          {error ? (
            <View style={[styles.errorBox, { backgroundColor: colors.danger + '18' }]}>
              <Text style={[styles.errorText, { color: colors.danger }]}>⚠️ {error}</Text>
            </View>
          ) : null}

          <CustomButton
            title={loading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: 8 }}
          />

          <Text style={[styles.hint, { color: colors.placeholder }]}>
            admin / 123 · user / 123
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoArea: { alignItems: 'center', marginBottom: 32 },
  logo: { fontSize: 64, marginBottom: 12 },
  appName: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
  tagline: { fontSize: 14, marginTop: 4 },
  card: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
  },
  formTitle: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  errorBox: { padding: 12, borderRadius: 10, marginBottom: 12 },
  errorText: { fontSize: 13, fontWeight: '600' },
  hint: { textAlign: 'center', fontSize: 12, marginTop: 16 },
});
