import { Colors } from '@/constants/theme';
import { AlertCircle, Calendar, CheckCircle, Clock, Star, User } from 'lucide-react-native';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Activity } from '../types';
import {
  getActivityTypeColor,
  getActivityTypeLabel,
  getStatusColor,
  getStatusLabel,
} from '../utils/activity-helpers';
import { formatDateTime, formatDueDate } from '../utils/date-formatter';

interface ActivityCardPresentationalProps {
  activity: Activity;
  isDark: boolean;
  onPress: () => void;
}

const ActivityCardPresentational = ({
  activity,
  isDark,
  onPress,
}: ActivityCardPresentationalProps) => {
  const colorScheme = isDark ? 'dark' : 'light';
  const typeColor = getActivityTypeColor(activity.type, isDark);
  const statusColor = getStatusColor(activity.status, isDark);

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
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: Colors[colorScheme].cardBackground,
          borderColor: Colors[colorScheme].borderColor,
          opacity: pressed ? 0.7 : 1,
          transform: pressed && Platform.OS === 'web' ? [{ scale: 0.98 }] : [],
          marginHorizontal: horizontalMargin,
        },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${activity.title}`}
    >
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: `${typeColor}20` }]}>
          <Text style={[styles.typeText, { color: typeColor }]}>
            {getActivityTypeLabel(activity.type)}
          </Text>
        </View>
        {activity.status === 'overdue' && (
          <View style={[styles.statusBadge, { backgroundColor: Colors[colorScheme].lightBlue }]}>
            <AlertCircle size={12} color={Colors[colorScheme].error} />
            <Text style={[styles.statusBadgeText, { color: Colors[colorScheme].error }]}>
              Overdue
            </Text>
          </View>
        )}
        {activity.status === 'completed' && (
          <View style={[styles.statusBadge, { backgroundColor: Colors[colorScheme].lightBlue }]}>
            <CheckCircle size={12} color={Colors[colorScheme].success} />
            <Text style={[styles.statusBadgeText, { color: Colors[colorScheme].success }]}>
              Completed
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>{activity.title}</Text>

      <Text
        style={[styles.description, { color: Colors[colorScheme].secondaryText }]}
        numberOfLines={2}
      >
        {activity.description}
      </Text>

      <View style={styles.metadata}>
        {activity.type === 'online-class' && activity.startDate && (
          <View style={styles.metaItem}>
            <Calendar size={14} color={Colors[colorScheme].secondaryText} />
            <Text style={[styles.metaText, { color: Colors[colorScheme].secondaryText }]}>
              {formatDateTime(activity.startDate)}
            </Text>
          </View>
        )}
        {activity.dueDate && activity.type !== 'online-class' && (
          <View style={styles.metaItem}>
            <Clock
              size={14}
              color={
                activity.status === 'overdue'
                  ? Colors[colorScheme].error
                  : Colors[colorScheme].secondaryText
              }
            />
            <Text
              style={[
                styles.metaText,
                {
                  color:
                    activity.status === 'overdue'
                      ? Colors[colorScheme].error
                      : Colors[colorScheme].secondaryText,
                },
              ]}
            >
              {formatDueDate(activity.dueDate)}
            </Text>
          </View>
        )}
        {activity.duration && (
          <View style={styles.metaItem}>
            <Clock size={14} color={Colors[colorScheme].secondaryText} />
            <Text style={[styles.metaText, { color: Colors[colorScheme].secondaryText }]}>
              {activity.duration} min
            </Text>
          </View>
        )}
        {activity.points && (
          <View style={styles.metaItem}>
            <Star size={14} color={Colors[colorScheme].secondaryText} />
            <Text style={[styles.metaText, { color: Colors[colorScheme].secondaryText }]}>
              {activity.points} pts
            </Text>
          </View>
        )}
      </View>

      {activity.instructor && (
        <View style={styles.instructorContainer}>
          <User size={14} color={Colors[colorScheme].secondaryText} />
          <Text style={[styles.instructor, { color: Colors[colorScheme].secondaryText }]}>
            {activity.instructor}
          </Text>
        </View>
      )}

      {activity.progress !== undefined && activity.progress > 0 && activity.progress < 100 && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: Colors[colorScheme].borderColor }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${activity.progress}%`,
                  backgroundColor: typeColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: Colors[colorScheme].secondaryText }]}>
            {activity.progress}%
          </Text>
        </View>
      )}

      {activity.attempts !== undefined && activity.maxAttempts && (
        <Text style={[styles.attempts, { color: Colors[colorScheme].secondaryText }]}>
          Attempts: {activity.attempts}/{activity.maxAttempts}
        </Text>
      )}

      <View style={styles.actionContainer}>
        <View style={[styles.actionButton, { backgroundColor: statusColor }]}>
          <Text style={styles.actionText}>{getStatusLabel(activity.status)}</Text>
        </View>
        <Text style={[styles.category, { color: Colors[colorScheme].secondaryText }]}>
          {activity.category}
        </Text>
      </View>
    </Pressable>
  );
};

export const ActivityCardComponent = memo(ActivityCardPresentational);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.2s',
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500',
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  instructor: {
    fontSize: 13,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 35,
  },
  attempts: {
    fontSize: 13,
    marginBottom: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  category: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
