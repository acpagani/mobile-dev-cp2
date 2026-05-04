import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, TreatmentPreference } from '../types/user';

const USERS: User[] = [
  { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
  { id: 2, username: 'user', password: '123', role: 'user', name: 'Usuário Comum' },
];

const AUTH_KEY = '@taskflow:auth';
const TREATMENT_KEY = '@taskflow:treatment';

interface AuthContextData {
  user: User | null;
  treatment: TreatmentPreference;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setTreatment: (t: TreatmentPreference) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [treatment, setTreatmentState] = useState<TreatmentPreference>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      try {
        const [savedUser, savedTreatment] = await Promise.all([
          AsyncStorage.getItem(AUTH_KEY),
          AsyncStorage.getItem(TREATMENT_KEY),
        ]);
        if (savedUser) setUser(JSON.parse(savedUser) as User);
        if (savedTreatment) setTreatmentState(savedTreatment as TreatmentPreference);
      } finally {
        setIsLoading(false);
      }
    }
    restore();
  }, []);

  async function login(username: string, password: string): Promise<boolean> {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return false;
    setUser(found);
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(found));
    return true;
  }

  async function logout(): Promise<void> {
    setUser(null);
    setTreatmentState('');
    await AsyncStorage.multiRemove([AUTH_KEY, TREATMENT_KEY]);
  }

  async function setTreatment(t: TreatmentPreference): Promise<void> {
    setTreatmentState(t);
    await AsyncStorage.setItem(TREATMENT_KEY, t);
  }

  return (
    <AuthContext.Provider value={{ user, treatment, isLoading, login, logout, setTreatment }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
