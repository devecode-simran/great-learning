import { useMemo } from 'react';
import { Activity, ActivityStatus, FilterType } from '../types';

interface UseActivityFiltersParams {
  activities: readonly Activity[];
  filterType: FilterType;
  searchQuery: string;
}

interface ActivityFilterResult {
  filteredActivities: Activity[];
}

const STATUS_PRIORITY: Record<ActivityStatus, number> = {
  overdue: 0,
  'in-progress': 1,
  'not-started': 2,
  completed: 3,
};

function matchesSearchQuery(activity: Activity, query: string): boolean {
  const lowerQuery = query.toLowerCase();
  return (
    activity.title.toLowerCase().includes(lowerQuery) ||
    activity.description.toLowerCase().includes(lowerQuery) ||
    activity.category.toLowerCase().includes(lowerQuery) ||
    (activity.instructor?.toLowerCase().includes(lowerQuery) ?? false)
  );
}

export function useActivityFilters({
  activities,
  filterType,
  searchQuery,
}: UseActivityFiltersParams): ActivityFilterResult {
  const filteredActivities = useMemo(() => {
    let result = [...activities];

    if (filterType !== 'all') {
      result = result.filter((activity) => activity.type === filterType);
    }

    if (searchQuery.trim()) {
      result = result.filter((activity) => matchesSearchQuery(activity, searchQuery));
    }

    result.sort((a, b) => STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status]);

    return result;
  }, [activities, filterType, searchQuery]);

  return { filteredActivities };
}
