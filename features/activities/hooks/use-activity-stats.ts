import { useMemo } from 'react';
import { Activity, ActivityStats } from '../types';

export function useActivityStats(activities: readonly Activity[]): ActivityStats {
  return useMemo(() => {
    const overdue = activities.filter((a) => a.status === 'overdue').length;
    const inProgress = activities.filter((a) => a.status === 'in-progress').length;
    const completed = activities.filter((a) => a.status === 'completed').length;
    const total = activities.length;

    return { overdue, inProgress, completed, total };
  }, [activities]);
}
