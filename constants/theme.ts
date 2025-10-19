/**
 * Material Design 3 inspired color system
 * Based on modern design principles with comprehensive light and dark mode support
 */

import { Platform } from 'react-native';

const tintColorLight = '#0054d6';
const tintColorDark = '#b3c5ff';

export const Colors = {
  light: {
    // Primary colors
    primary: '#0054d6',
    onPrimary: '#ffffff',
    primaryContainer: '#dae1ff',
    onPrimaryContainer: '#001849',

    // Secondary colors
    secondary: '#3a3bff',
    onSecondary: '#ffffff',
    secondaryContainer: '#e1e0ff',
    onSecondaryContainer: '#05006d',

    // Tertiary colors
    tertiary: '#8b00e8',
    onTertiary: '#ffffff',
    tertiaryContainer: '#f1dbff',
    onTertiaryContainer: '#2d0050',

    // Error colors
    error: '#ba1a17',
    onError: '#ffffff',
    errorContainer: '#ffdad5',
    onErrorContainer: '#410001',

    // Background & Surface
    background: '#fdfbff',
    onBackground: '#1a1b1e',
    surface: '#faf9fd',
    onSurface: '#1a1b1e',
    surfaceVariant: '#e2e2ec',
    onSurfaceVariant: '#45464f',

    // Surface containers
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f4f3f7',
    surfaceContainer: '#efedf1',
    surfaceContainerHigh: '#e9e7ec',
    surfaceContainerHighest: '#e3e2e6',
    surfaceBright: '#faf9fd',
    surfaceDim: '#dbd9dd',

    // Inverse
    inverseSurface: '#2f3033',
    inverseOnSurface: '#f1f0f4',
    inversePrimary: '#b3c5ff',

    // Outline
    outline: '#757680',
    outlineVariant: '#ebebef',

    // Other
    shadow: '#000000',
    scrim: '#000000',
    surfaceTint: '#0054d6',

    // Legacy/convenience colors for backward compatibility
    text: '#1a1b1e',
    tint: tintColorLight,
    icon: '#45464f',
    tabIconDefault: '#757680',
    tabIconSelected: tintColorLight,
    cardBackground: '#ffffff',
    borderColor: '#e2e2ec',
    secondaryText: '#45464f',
    accentBlue: '#0054d6',
    lightBlue: '#dae1ff',
    success: '#006d3c',
    warning: '#8d4f00',
  },
  dark: {
    // Primary colors
    primary: '#b3c5ff',
    onPrimary: '#002b75',
    primaryContainer: '#003fa4',
    onPrimaryContainer: '#dae1ff',

    // Secondary colors
    secondary: '#c0c1ff',
    onSecondary: '#0c00aa',
    secondaryContainer: '#1600ec',
    onSecondaryContainer: '#e1e0ff',

    // Tertiary colors
    tertiary: '#deb7ff',
    onTertiary: '#4a007f',
    tertiaryContainer: '#6900b2',
    onTertiaryContainer: '#f1dbff',

    // Error colors
    error: '#ffb4aa',
    onError: '#690003',
    errorContainer: '#2d171a',
    onErrorContainer: '#ffdad5',

    // Background & Surface
    background: '#1a1b1e',
    onBackground: '#e3e2e6',
    surface: '#121316',
    onSurface: '#c7c6ca',
    surfaceVariant: '#45464f',
    onSurfaceVariant: '#c5c6d0',

    // Surface containers
    surfaceContainerLowest: '#0d0e11',
    surfaceContainerLow: '#1a1b1e',
    surfaceContainer: '#1e1f23',
    surfaceContainerHigh: '#292a2d',
    surfaceContainerHighest: '#343538',
    surfaceBright: '#38393c',
    surfaceDim: '#121316',

    // Inverse
    inverseSurface: '#e3e2e6',
    inverseOnSurface: '#1a1b1e',
    inversePrimary: '#0054d6',

    // Outline
    outline: '#8f909a',
    outlineVariant: '#45464f',

    // Other
    shadow: '#000000',
    scrim: '#000000',
    surfaceTint: '#b3c5ff',

    // Legacy/convenience colors for backward compatibility
    text: '#e3e2e6',
    tint: tintColorDark,
    icon: '#c5c6d0',
    tabIconDefault: '#8f909a',
    tabIconSelected: tintColorDark,
    cardBackground: '#1e1f23',
    borderColor: '#45464f',
    secondaryText: '#c5c6d0',
    accentBlue: '#b3c5ff',
    lightBlue: '#003fa4',
    success: '#51df8e',
    warning: '#ffb875',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
