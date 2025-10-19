export type ActivityType = 'online-class' | 'assignment' | 'quiz' | 'discussion';
export type ActivityStatus = 'not-started' | 'in-progress' | 'completed' | 'overdue';
export type FilterType = 'all' | ActivityType;

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  status: ActivityStatus;
  description: string;
  category: string;
  dueDate?: string;
  duration?: number;
  progress?: number;
  points?: number;
  topic?: string;
  instructor?: string;
  startDate?: string;
  attempts?: number;
  maxAttempts?: number;
  isLocked?: boolean;
}

export interface FilterOption {
  label: string;
  value: FilterType;
  icon: string;
}

export interface ActivityStats {
  overdue: number;
  inProgress: number;
  completed: number;
  total: number;
}

export interface FilterCounts {
  all: number;
  'online-class': number;
  assignment: number;
  quiz: number;
  discussion: number;
}
