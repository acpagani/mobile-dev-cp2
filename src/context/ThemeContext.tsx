import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryText: string;
  danger: string;
  success: string;
  warning: string;
  info: string;
  card: string;
  tabBar: string;
  header: string;
  headerText: string;
  inputBackground: string;
  placeholder: string;
  shadow: string;
}

const lightColors: ThemeColors = {
  background: '#F8F9FB',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F2F5',
  text: '#1A1D23',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  primary: '#4F46E5',
  primaryText: '#FFFFFF',
  danger: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  card: '#FFFFFF',
  tabBar: '#FFFFFF',
  header: '#FFFFFF',
  headerText: '#1A1D23',
  inputBackground: '#F3F4F6',
  placeholder: '#9CA3AF',
  shadow: 'rgba(0,0,0,0.08)',
};

const darkColors: ThemeColors = {
  background: '#0F1117',
  surface: '#1A1D27',
  surfaceAlt: '#252836',
  text: '#F1F2F6',
  textSecondary: '#9CA3AF',
  border: '#2D3148',
  primary: '#6366F1',
  primaryText: '#FFFFFF',
  danger: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  info: '#60A5FA',
  card: '#1A1D27',
  tabBar: '#1A1D27',
  header: '#1A1D27',
  headerText: '#F1F2F6',
  inputBackground: '#252836',
  placeholder: '#6B7280',
  shadow: 'rgba(0,0,0,0.3)',
};

interface ThemeContextData {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const THEME_KEY = '@taskflow:theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((saved) => {
      if (saved === 'dark' || saved === 'light') setTheme(saved);
    });
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    AsyncStorage.setItem(THEME_KEY, next);
  }

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
