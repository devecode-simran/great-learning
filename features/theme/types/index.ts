export type ColorScheme = 'light' | 'dark' | 'auto';
export type ResolvedColorScheme = 'light' | 'dark';

export interface ThemeState {
  colorScheme: ColorScheme;
  resolvedColorScheme: ResolvedColorScheme;
  systemScheme: ResolvedColorScheme;
}

export type ThemeAction =
  | { type: 'SET_COLOR_SCHEME'; payload: ColorScheme }
  | { type: 'SET_SYSTEM_SCHEME'; payload: ResolvedColorScheme }
  | { type: 'TOGGLE_THEME' };

export interface ThemeContextValue {
  colorScheme: ColorScheme;
  resolvedColorScheme: ResolvedColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}
