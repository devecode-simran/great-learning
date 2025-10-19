import { ActivityStatus, ActivityType } from '../types';

export function getActivityTypeColor(type: ActivityType, isDark: boolean): string {
  const colors = {
    'online-class': '#1E88E5',
    assignment: '#8B5CF6',
    quiz: '#EC4899',
    discussion: isDark ? '#4CAF50' : '#2E7D32',
  };
  return colors[type];
}

export function getActivityTypeLabel(type: ActivityType): string {
  const labels: Record<ActivityType, string> = {
    'online-class': 'Online Class',
    assignment: 'Assignment',
    quiz: 'Quiz',
    discussion: 'Discussion',
  };
  return labels[type];
}

export function getStatusLabel(status: ActivityStatus): string {
  const labels: Record<ActivityStatus, string> = {
    'not-started': 'Start',
    'in-progress': 'Continue',
    completed: 'Review',
    overdue: 'Submit Now',
  };
  return labels[status];
}

export function getStatusColor(status: ActivityStatus, isDark: boolean): string {
  const colors = {
    'not-started': '#1E88E5',
    'in-progress': '#FB8C00',
    completed: isDark ? '#4CAF50' : '#2E7D32',
    overdue: '#E53935',
  };
  return colors[status];
}
