import { useColorScheme } from '@/features/theme';
import React, { memo, useCallback } from 'react';
import { Activity } from '../types';
import { ActivityCardComponent } from './activity-card.presentational';

interface ActivityCardProps {
  activity: Activity;
  onPress: (activity: Activity) => void;
}

const ActivityCardContainer = ({ activity, onPress }: ActivityCardProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = useCallback(() => {
    onPress(activity);
  }, [activity, onPress]);

  return <ActivityCardComponent activity={activity} isDark={isDark} onPress={handlePress} />;
};

export const ActivityCard = memo(ActivityCardContainer);
