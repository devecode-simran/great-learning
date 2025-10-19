import { Colors } from '@/constants/theme';
import { LucideIcon } from 'lucide-react-native';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FilterType } from '../types';

interface FilterOption {
  label: string;
  value: FilterType;
  icon: LucideIcon;
}

interface ActivityFiltersPresentationalProps {
  filterOptions: readonly FilterOption[];
  selectedFilter: FilterType;
  counts: Record<FilterType, number>;
  isDark: boolean;
  onFilterPress: (filter: FilterType) => void;
}

interface FilterButtonProps {
  option: FilterOption;
  isSelected: boolean;
  colorScheme: 'light' | 'dark';
  onPress: () => void;
}

const FilterButton = ({ option, isSelected, colorScheme, onPress }: FilterButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBackgroundColor = () => {
    if (isSelected) {
      return Colors[colorScheme].accentBlue;
    }
    if (isHovered) {
      return colorScheme === 'dark' ? '#424242' : '#E0E0E0';
    }
    return Colors[colorScheme].cardBackground;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.filterButton,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: isSelected
            ? Colors[colorScheme].accentBlue
            : Colors[colorScheme].borderColor,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={`Filter by ${option.label}`}
      accessibilityState={{ selected: isSelected }}
    >
      <Text
        style={[
          styles.filterLabel,
          {
            color: isSelected ? Colors[colorScheme].onPrimary : Colors[colorScheme].text,
            fontWeight: isSelected ? '700' : '600',
          },
        ]}
      >
        {option.label}
      </Text>
    </Pressable>
  );
};

const ActivityFiltersPresentational = ({
  filterOptions,
  selectedFilter,
  counts: _counts,
  isDark,
  onFilterPress,
}: ActivityFiltersPresentationalProps) => {
  const colorScheme = isDark ? 'dark' : 'light';

  // Responsive margins - Initialize with current window width to prevent flicker
  const [screenWidth, setScreenWidth] = useState(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return Dimensions.get('window').width;
  });

  const isMobile = screenWidth < 768;
  const horizontalMargin = isMobile ? 16 : 150;

  useEffect(() => {
    const updateDimensions = () => {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        setScreenWidth(window.innerWidth);
      } else {
        setScreenWidth(Dimensions.get('window').width);
      }
    };

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    } else {
      const subscription = Dimensions.addEventListener('change', updateDimensions);
      return () => subscription?.remove();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalMargin }]}
      >
        {filterOptions.map((option) => {
          const isSelected = selectedFilter === option.value;

          return (
            <FilterButton
              key={option.value}
              option={option}
              isSelected={isSelected}
              colorScheme={colorScheme}
              onPress={() => onFilterPress(option.value)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export const ActivityFiltersComponent = memo(ActivityFiltersPresentational);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    gap: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      },
    }),
  },
  filterLabel: {
    fontSize: 14,
  },
});
