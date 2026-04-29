import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  multiline?: boolean;
  secureToggle?: boolean;
}

export function CustomInput({
  label,
  error,
  containerStyle,
  secureToggle = false,
  secureTextEntry,
  ...rest
}: CustomInputProps) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>}
      <View style={[
        styles.inputWrap,
        { backgroundColor: colors.inputBackground, borderColor: error ? colors.danger : colors.border },
      ]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureToggle ? !showPassword : secureTextEntry}
          {...rest}
        />
        {secureToggle && (
          <TouchableOpacity onPress={() => setShowPassword((p) => !p)} style={styles.eyeBtn}>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, letterSpacing: 0.3 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 48,
  },
  input: { flex: 1, fontSize: 15, height: '100%' },
  eyeBtn: { paddingLeft: 8 },
  error: { fontSize: 12, marginTop: 4 },
});
