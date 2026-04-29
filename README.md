# TaskFlow 📋

Aplicativo de gerenciamento de tarefas em React Native + Expo + TypeScript.

## Grupo
- Arthur Cotrick Pagani | RM554510
- Diogo Leles Franciulli | RM558487
- Felipe Sousa de Oliveira | RM559085
- Ryan Brito Pereira Ramos | RM554497
- Vitor Chaves RM557067 |

---

## Credenciais

| Usuário | Senha | Perfil | Vai para |
|---------|-------|--------|----------|
| admin   | 123   | Admin  | Settings |
| user    | 123   | User   | Home     |

---

## Estrutura do projeto

```
src/
  components/      → CustomButton, CustomInput, Header, TaskCard,
                     EmptyState, StatusBadge, FilterBar
  screens/
    LoginScreen.tsx
    home/          → HomeScreen
    tasks/         → TaskListScreen, TaskFormScreen, TaskDetailScreen
    settings/      → SettingsScreen
  routes/          → AppRoutes, TabRoutes, TaskStackRoutes
  context/         → AuthContext, TaskContext, ThemeContext
  hooks/           → useTasks
  services/        → api.ts, taskStorage.ts
  types/           → task.ts, user.ts, navigation.ts
  utils/           → formatDate.ts, generateId.ts
App.tsx
```

---

## Funcionalidades

- Login com 2 perfis (admin e user)
- Persistência com AsyncStorage
- Logout limpa sessão
- CRUD completo de tarefas
- Filtro por status (Todas / Pendente / Em andamento / Concluída)
- Categorias consumidas da API (DummyJSON)
- Frase motivacional da API (ZenQuotes)
- Tema dark/light persistível
- Preferência de tratamento (Sr./Sra./Srta.)
- Navegação Stack + Bottom Tabs
- TypeScript estrito (sem `any`)
- Context API: Auth, Task, Theme
- Hook customizado: `useTasks`

---

## Tecnologias

- React Native + Expo 52
- TypeScript (strict)
- React Navigation (Stack + Bottom Tabs)
- AsyncStorage
- Fetch API

---

## API utilizada

- **ZenQuotes** `https://zenquotes.io/api/random` → frase motivacional
- **DummyJSON** `https://dummyjson.com/products/categories` → categorias das tarefas
