# Developer Guide - Refactored Codebase

## 🚀 Quick Start

### Running the Application

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check
```

### Pre-commit Hooks

The project now uses Husky with lint-staged. Every commit will automatically:

- Run ESLint and fix issues
- Format code with Prettier
- Ensure type safety

## 📁 Feature-Based Architecture

### Understanding the Structure

Each feature is self-contained with its own:

- **components/** - UI components (container + presentational)
- **hooks/** - Custom business logic hooks
- **types/** - TypeScript interfaces
- **utils/** - Helper functions
- **index.ts** - Public API exports

### Example: Adding a New Feature

```typescript
// features/my-feature/
// ├── components/
// │   ├── my-component.container.tsx    // Logic
// │   └── my-component.presentational.tsx  // UI
// ├── hooks/
// │   └── use-my-feature.ts
// ├── types/
// │   └── index.ts
// └── index.ts  // Export everything
```

## 🎯 Component Patterns

### Container Component

```typescript
import React, { memo, useCallback } from 'react';
import { useColorScheme } from '@/features/theme';
import { MyComponentUI } from './my-component.presentational';

interface MyComponentProps {
  id: string;
  onAction: (id: string) => void;
}

const MyComponentContainer = ({ id, onAction }: MyComponentProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = useCallback(() => {
    onAction(id);
  }, [id, onAction]);

  return <MyComponentUI isDark={isDark} onPress={handlePress} />;
};

export const MyComponent = memo(MyComponentContainer);
```

### Presentational Component

```typescript
import React, { memo } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface MyComponentUIProps {
  isDark: boolean;
  onPress: () => void;
}

const MyComponentUI = ({ isDark, onPress }: MyComponentUIProps) => {
  const colorScheme = isDark ? 'dark' : 'light';

  return (
    <Pressable
      style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
        Press me
      </Text>
    </Pressable>
  );
};

export const MyComponentPresentation = memo(MyComponentUI);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
});
```

## 🪝 Custom Hooks Pattern

```typescript
import { useMemo } from 'react';

export interface MyData {
  items: Item[];
  total: number;
}

export function useMyFeature(items: Item[]): MyData {
  return useMemo(() => {
    const total = items.length;
    return { items, total };
  }, [items]);
}
```

## 🎨 Styling Guidelines

### Use the Colors constant

```typescript
import { Colors } from '@/constants/theme';

// Always reference theme colors
backgroundColor: Colors[colorScheme].background;
color: Colors[colorScheme].text;
```

### Platform-specific styles

```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
    }),
  },
});
```

## 🔧 TypeScript Best Practices

### Always Define Interfaces

```typescript
// ✅ Good
interface UserProps {
  id: string;
  name: string;
  onSelect: (id: string) => void;
}

// ❌ Bad
function MyComponent(props: any) { ... }
```

### Use Type Inference When Obvious

```typescript
// ✅ Good - type is inferred
const count = items.length;

// ❌ Unnecessary
const count: number = items.length;
```

### Export Types with Features

```typescript
// features/my-feature/index.ts
export type { MyFeatureData, MyFeatureConfig } from './types';
export { useMyFeature } from './hooks';
export { MyFeatureComponent } from './components';
```

## ⚡ Performance Tips

### Use useMemo for Expensive Calculations

```typescript
const filteredItems = useMemo(() => {
  return items.filter((item) => item.active).sort((a, b) => a.date - b.date);
}, [items]);
```

### Use useCallback for Event Handlers

```typescript
const handlePress = useCallback(
  (id: string) => {
    onItemSelect(id);
  },
  [onItemSelect]
);
```

### Memoize Components

```typescript
export const MyComponent = memo(MyComponentImpl);
```

## 🧪 Testing Patterns

### Test Business Logic (Hooks)

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useMyFeature } from '../use-my-feature';

test('calculates total correctly', () => {
  const { result } = renderHook(() => useMyFeature(mockItems));
  expect(result.current.total).toBe(5);
});
```

### Test Presentational Components

```typescript
import { render } from '@testing-library/react-native';
import { MyComponentUI } from '../my-component.presentational';

test('renders correctly in dark mode', () => {
  const { getByText } = render(<MyComponentUI isDark={true} onPress={jest.fn()} />);
  expect(getByText('Press me')).toBeTruthy();
});
```

## 📦 Import Guidelines

### Use Feature-Based Imports

```typescript
// ✅ Good - import from feature
import { ActivityCard, useActivityFilters } from '@/features/activities';
import { useColorScheme, ThemeToggle } from '@/features/theme';

// ❌ Bad - deep imports
import { ActivityCard } from '@/features/activities/components/activity-card';
```

### Import Order

```typescript
// 1. React and React Native
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';

// 3. Features (using @/ alias)
import { useColorScheme } from '@/features/theme';
import { Activity } from '@/features/activities';

// 4. Constants and utils
import { Colors } from '@/constants/theme';

// 5. Relative imports
import { formatDate } from './utils';
```

## 🔄 State Management

### Local State First

```typescript
// ✅ Good - use local state when possible
const [isOpen, setIsOpen] = useState(false);
```

### Context for Global UI State

```typescript
// ✅ Good - use Context for theme, language, etc.
const { colorScheme, toggleTheme } = useTheme();
```

### Avoid Context for Data

```typescript
// ❌ Bad - don't use Context for data fetching
// Use React Query, SWR, or prop drilling instead
```

## 📝 Code Review Checklist

Before submitting a PR, ensure:

- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Components are memoized where appropriate
- [ ] Custom hooks follow the `use*` naming convention
- [ ] Interfaces are properly defined
- [ ] No `any` types used
- [ ] Platform-specific code uses `Platform.select()`
- [ ] Theme colors used from `Colors[colorScheme]`
- [ ] Import paths use `@/` alias

## 🎓 Learning Resources

### React Best Practices

- [React Documentation](https://react.dev)
- [Container/Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### React Native

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)

## 🐛 Troubleshooting

### Type Errors

```bash
npm run type-check
```

### Linting Issues

```bash
npm run lint:fix
```

### Formatting Issues

```bash
npm run format
```

### Pre-commit Hook Failing

Make sure all files pass type checking and linting before committing.

## 💡 Tips

1. **Start with types** - Define your interfaces before implementing
2. **Extract early** - Move logic to custom hooks as soon as it gets complex
3. **Test in isolation** - Separate components and hooks are easier to test
4. **Follow patterns** - Consistency is key to maintainability
5. **Use the tools** - Let Prettier, ESLint, and TypeScript do the heavy lifting

## 🤝 Contributing

When adding new features:

1. Create a new feature folder
2. Follow the container/presentational pattern
3. Extract business logic to custom hooks
4. Define proper TypeScript interfaces
5. Export through the feature's index.ts
6. Update this guide if introducing new patterns

Happy coding! 🚀
