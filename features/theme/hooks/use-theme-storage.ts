import { useEffect } from 'react';
import { Platform } from 'react-native';
import { ColorScheme } from '../types';

const THEME_STORAGE_KEY = 'theme-preference';

export function useThemeStorage(colorScheme: ColorScheme): void {
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, colorScheme);
    }
  }, [colorScheme]);
}

export function getStoredTheme(): ColorScheme {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
      return stored;
    }
  }
  return 'light';
}
