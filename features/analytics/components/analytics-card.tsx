import { Colors } from '@/constants/theme';
import React, { memo } from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

interface AnalyticsCardProps {
  isDark: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const AnalyticsCardComponent = ({ isDark, children, style }: AnalyticsCardProps) => {
  const colorScheme = isDark ? 'dark' : 'light';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors[colorScheme].cardBackground,
          borderColor: Colors[colorScheme].borderColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const AnalyticsCard = memo(AnalyticsCardComponent);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
});
