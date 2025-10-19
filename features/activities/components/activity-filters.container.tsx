import { useColorScheme } from '@/features/theme';
import { BookOpen, CheckSquare, FileText, GraduationCap, MessageCircle } from 'lucide-react-native';
import React, { memo, useCallback } from 'react';
import { FilterCounts, FilterType } from '../types';
import { ActivityFiltersComponent } from './activity-filters.presentational';

interface ActivityFiltersProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: FilterCounts;
}

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' as const, icon: BookOpen },
  { label: 'Classes', value: 'online-class' as const, icon: GraduationCap },
  { label: 'Assignments', value: 'assignment' as const, icon: FileText },
  { label: 'Quizzes', value: 'quiz' as const, icon: CheckSquare },
  { label: 'Discussions', value: 'discussion' as const, icon: MessageCircle },
] as const;

const ActivityFiltersContainer = ({
  selectedFilter,
  onFilterChange,
  counts,
}: ActivityFiltersProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleFilterPress = useCallback(
    (filter: FilterType) => {
      onFilterChange(filter);
    },
    [onFilterChange]
  );

  return (
    <ActivityFiltersComponent
      filterOptions={FILTER_OPTIONS}
      selectedFilter={selectedFilter}
      counts={counts}
      isDark={isDark}
      onFilterPress={handleFilterPress}
    />
  );
};

export const ActivityFilters = memo(ActivityFiltersContainer);
