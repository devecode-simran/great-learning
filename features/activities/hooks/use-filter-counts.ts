import { useMemo } from 'react';
import { Activity, FilterCounts } from '../types';

export function useFilterCounts(activities: readonly Activity[]): FilterCounts {
  return useMemo(() => {
    return {
      all: activities.length,
      'online-class': activities.filter((a) => a.type === 'online-class').length,
      assignment: activities.filter((a) => a.type === 'assignment').length,
      quiz: activities.filter((a) => a.type === 'quiz').length,
      discussion: activities.filter((a) => a.type === 'discussion').length,
    };
  }, [activities]);
}
