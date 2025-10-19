import { Activity } from '@/features/activities';
import { useMemo } from 'react';

export interface CategoryStats {
  [category: string]: number;
}

export interface TypeStats {
  [type: string]: number;
}

export interface AnalyticsData {
  byCategory: CategoryStats;
  byType: TypeStats;
  totalPoints: number;
  earnedPoints: number;
  completionRate: number;
}

export function useAnalyticsData(activities: readonly Activity[]): AnalyticsData {
  return useMemo(() => {
    const byCategory = activities.reduce<CategoryStats>((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + 1;
      return acc;
    }, {});

    const byType = activities.reduce<TypeStats>((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {});

    const totalPoints = activities
      .filter((a) => a.points)
      .reduce((sum, a) => sum + (a.points || 0), 0);

    const earnedPoints = activities
      .filter((a) => a.status === 'completed' && a.points)
      .reduce((sum, a) => sum + (a.points || 0), 0);

    const completionRate = Math.round(
      (activities.filter((a) => a.status === 'completed').length / activities.length) * 100
    );

    return { byCategory, byType, totalPoints, earnedPoints, completionRate };
  }, [activities]);
}
