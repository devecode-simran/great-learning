import {
  getActivityTypeColor,
  getActivityTypeLabel,
  getStatusColor,
  getStatusLabel,
} from '@/features/activities/utils/activity-helpers';

describe('Activity Helper Functions', () => {
  describe('getActivityTypeLabel', () => {
    it('should return correct label for online-class', () => {
      expect(getActivityTypeLabel('online-class')).toBe('Online Class');
    });

    it('should return correct label for assignment', () => {
      expect(getActivityTypeLabel('assignment')).toBe('Assignment');
    });

    it('should return correct label for quiz', () => {
      expect(getActivityTypeLabel('quiz')).toBe('Quiz');
    });

    it('should return correct label for discussion', () => {
      expect(getActivityTypeLabel('discussion')).toBe('Discussion');
    });
  });

  describe('getActivityTypeColor', () => {
    it('should return correct color for online-class', () => {
      expect(getActivityTypeColor('online-class', false)).toBe('#1E88E5');
      expect(getActivityTypeColor('online-class', true)).toBe('#1E88E5');
    });

    it('should return correct color for assignment', () => {
      expect(getActivityTypeColor('assignment', false)).toBe('#8B5CF6');
      expect(getActivityTypeColor('assignment', true)).toBe('#8B5CF6');
    });

    it('should return correct color for quiz', () => {
      expect(getActivityTypeColor('quiz', false)).toBe('#EC4899');
      expect(getActivityTypeColor('quiz', true)).toBe('#EC4899');
    });

    it('should return different colors for discussion in light/dark mode', () => {
      expect(getActivityTypeColor('discussion', false)).toBe('#2E7D32');
      expect(getActivityTypeColor('discussion', true)).toBe('#4CAF50');
    });
  });

  describe('getStatusLabel', () => {
    it('should return "Start" for not-started status', () => {
      expect(getStatusLabel('not-started')).toBe('Start');
    });

    it('should return "Continue" for in-progress status', () => {
      expect(getStatusLabel('in-progress')).toBe('Continue');
    });

    it('should return "Review" for completed status', () => {
      expect(getStatusLabel('completed')).toBe('Review');
    });

    it('should return "Submit Now" for overdue status', () => {
      expect(getStatusLabel('overdue')).toBe('Submit Now');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct color for not-started', () => {
      expect(getStatusColor('not-started', false)).toBe('#1E88E5');
      expect(getStatusColor('not-started', true)).toBe('#1E88E5');
    });

    it('should return correct color for in-progress', () => {
      expect(getStatusColor('in-progress', false)).toBe('#FB8C00');
      expect(getStatusColor('in-progress', true)).toBe('#FB8C00');
    });

    it('should return different colors for completed in light/dark mode', () => {
      expect(getStatusColor('completed', false)).toBe('#2E7D32');
      expect(getStatusColor('completed', true)).toBe('#4CAF50');
    });

    it('should return correct color for overdue', () => {
      expect(getStatusColor('overdue', false)).toBe('#E53935');
      expect(getStatusColor('overdue', true)).toBe('#E53935');
    });
  });
});
