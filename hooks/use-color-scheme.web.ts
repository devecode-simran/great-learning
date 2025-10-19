import { useColorScheme as useColorSchemeFeature } from '@/features/theme';

/**
 * Hook to get the current color scheme for web platform
 * Uses the theme context which respects user preference over system preference
 */
export function useColorScheme() {
  return useColorSchemeFeature();
}
