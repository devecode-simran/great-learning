import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { Activity } from '../types';

export interface ActivityActions {
  handleActivityPress: (activity: Activity) => void;
}

export function useActivityActions(): ActivityActions {
  const handleActivityPress = useCallback((activity: Activity) => {
    if (Platform.OS === 'web') {
      alert(`Opening: ${activity.title}`);
    } else {
      Alert.alert(activity.title, `This would open the ${activity.type} activity.`, [
        { text: 'OK' },
      ]);
    }
  }, []);

  return { handleActivityPress };
}
