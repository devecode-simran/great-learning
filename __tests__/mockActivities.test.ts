import { Activity, mockActivities } from '@/features/activities';

describe('Mock Activities Data', () => {
  it('should have activities', () => {
    expect(mockActivities.length).toBeGreaterThan(0);
  });

  it('all activities should have required fields', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.id).toBeDefined();
      expect(activity.title).toBeDefined();
      expect(activity.type).toBeDefined();
      expect(activity.status).toBeDefined();
      expect(activity.description).toBeDefined();
      expect(activity.category).toBeDefined();
    });
  });

  it('should have valid activity types', () => {
    const validTypes = ['online-class', 'assignment', 'quiz', 'discussion'];
    mockActivities.forEach((activity: Activity) => {
      expect(validTypes).toContain(activity.type);
    });
  });

  it('should have valid activity statuses', () => {
    const validStatuses = ['not-started', 'in-progress', 'completed', 'overdue'];
    mockActivities.forEach((activity: Activity) => {
      expect(validStatuses).toContain(activity.status);
    });
  });

  it('should have at least one activity of each type', () => {
    const types = mockActivities.map((a: Activity) => a.type);
    expect(types).toContain('online-class');
    expect(types).toContain('assignment');
    expect(types).toContain('quiz');
    expect(types).toContain('discussion');
  });

  it('should have at least one activity in each status', () => {
    const statuses = mockActivities.map((a: Activity) => a.status);
    expect(statuses).toContain('not-started');
    expect(statuses).toContain('in-progress');
    expect(statuses).toContain('completed');
    expect(statuses).toContain('overdue');
  });

  it('assessments should have points', () => {
    const assessments = mockActivities.filter(
      (a: Activity) => a.type === 'assignment' || a.type === 'quiz' || a.type === 'discussion'
    );
    assessments.forEach((activity: Activity) => {
      expect(activity.points).toBeDefined();
      expect(activity.points).toBeGreaterThan(0);
    });
  });

  it('online classes should have instructor and start date', () => {
    const classes = mockActivities.filter((a: Activity) => a.type === 'online-class');
    classes.forEach((activity: Activity) => {
      expect(activity.instructor).toBeDefined();
      expect(activity.startDate).toBeDefined();
    });
  });

  it('in-progress activities should have progress', () => {
    const inProgress = mockActivities.filter((a: Activity) => a.status === 'in-progress');
    inProgress.forEach((activity: Activity) => {
      expect(activity.progress).toBeDefined();
      expect(activity.progress).toBeGreaterThan(0);
      expect(activity.progress).toBeLessThan(100);
    });
  });

  it('completed activities should have 100% progress if progress is defined', () => {
    const completed = mockActivities.filter(
      (a: Activity) => a.status === 'completed' && a.progress !== undefined
    );
    completed.forEach((activity: Activity) => {
      expect(activity.progress).toBe(100);
    });
  });

  it('should have multiple categories', () => {
    const categories = [...new Set(mockActivities.map((a: Activity) => a.category))];
    expect(categories.length).toBeGreaterThan(1);
  });

  it('activities should have unique IDs', () => {
    const ids = mockActivities.map((a: Activity) => a.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});
