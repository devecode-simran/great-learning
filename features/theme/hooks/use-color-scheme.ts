import { useTheme } from '../context/theme-context';
import { ResolvedColorScheme } from '../types';

/**
 * Hook to get the current resolved color scheme (light or dark).
 * Respects user preference over system preference.
 */
export function useColorScheme(): ResolvedColorScheme {
  const { resolvedColorScheme } = useTheme();
  return resolvedColorScheme;
}
