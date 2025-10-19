import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { ResolvedColorScheme } from '../types';

export function useSystemTheme(): ResolvedColorScheme {
  const getSystemScheme = (): ResolvedColorScheme => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const [systemScheme, setSystemScheme] = useState<ResolvedColorScheme>(getSystemScheme);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemScheme(event.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return systemScheme;
}
