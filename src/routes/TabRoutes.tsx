import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TaskStackRoutes } from './TaskStackRoutes';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { TabParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabRoutes() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName={user?.role === 'admin' ? 'SettingsTab' : 'HomeTab'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '🏠' : '🏡'}</Text>,
        }}
      />
      <Tab.Screen
        name="TasksTab"
        component={TaskStackRoutes}
        options={{
          tabBarLabel: 'Tarefas',
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '✅' : '☑️'}</Text>,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Config.',
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20 }}>{focused ? '⚙️' : '🔧'}</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
