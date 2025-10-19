import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useSystemTheme } from '../hooks/use-system-theme';
import { getStoredTheme, useThemeStorage } from '../hooks/use-theme-storage';
import { ColorScheme, ThemeContextValue } from '../types';
import { themeReducer } from './theme-reducer';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useSystemTheme();
  const storedTheme = getStoredTheme();

  const [state, dispatch] = useReducer(themeReducer, {
    colorScheme: storedTheme,
    systemScheme,
    resolvedColorScheme: storedTheme === 'auto' ? systemScheme : storedTheme,
  });

  useEffect(() => {
    dispatch({ type: 'SET_SYSTEM_SCHEME', payload: systemScheme });
  }, [systemScheme]);

  useThemeStorage(state.colorScheme);

  const setColorScheme = useCallback((scheme: ColorScheme) => {
    dispatch({ type: 'SET_COLOR_SCHEME', payload: scheme });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const value: ThemeContextValue = {
    colorScheme: state.colorScheme,
    resolvedColorScheme: state.resolvedColorScheme,
    setColorScheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
