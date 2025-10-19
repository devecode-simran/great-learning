import { Colors } from '@/constants/theme';
import { Moon, Sun } from 'lucide-react-native';
import React, { memo } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/theme-context';

const ThemeToggleComponent = () => {
  const { resolvedColorScheme, toggleTheme } = useTheme();
  const isDark = resolvedColorScheme === 'dark';

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: isDark ? Colors.dark.surfaceContainer : Colors.light.surfaceContainer,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      accessibilityRole="button"
    >
      <View style={styles.iconContainer}>
        {isDark ? (
          <Moon size={18} color={isDark ? Colors.dark.text : Colors.light.text} />
        ) : (
          <Sun size={18} color={isDark ? Colors.dark.text : Colors.light.text} />
        )}
      </View>
      <Text style={[styles.text, { color: isDark ? Colors.dark.text : Colors.light.text }]}>
        {isDark ? 'Dark' : 'Light'}
      </Text>
    </Pressable>
  );
};

export const ThemeToggle = memo(ThemeToggleComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    }),
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
