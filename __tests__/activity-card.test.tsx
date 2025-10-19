import { Activity, ActivityCard } from '@/features/activities';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('ActivityCard', () => {
  const mockActivity: Activity = {
    id: '1',
    title: 'Test Activity',
    type: 'assignment',
    status: 'not-started',
    description: 'This is a test activity description',
    dueDate: '2025-10-22T23:59:00Z',
    points: 100,
    category: 'AI & Machine Learning',
  };

  const mockOnPress = jest.fn();

  it('renders activity title correctly', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} onPress={mockOnPress} />);
    expect(getByText('Test Activity')).toBeTruthy();
  });

  it('renders activity description correctly', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} onPress={mockOnPress} />);
    expect(getByText('This is a test activity description')).toBeTruthy();
  });

  it('displays correct activity type badge', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} onPress={mockOnPress} />);
    expect(getByText('Assignment')).toBeTruthy();
  });

  it('displays points when available', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} onPress={mockOnPress} />);
    expect(getByText(/100 pts/)).toBeTruthy();
  });

  it('displays correct action button for not-started status', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} onPress={mockOnPress} />);
    expect(getByText('Start')).toBeTruthy();
  });

  it('displays correct action button for in-progress status', () => {
    const inProgressActivity: Activity = {
      ...mockActivity,
      status: 'in-progress',
      progress: 50,
    };
    const { getByText } = render(
      <ActivityCard activity={inProgressActivity} onPress={mockOnPress} />
    );
    expect(getByText('Continue')).toBeTruthy();
  });

  it('displays correct action button for completed status', () => {
    const completedActivity: Activity = {
      ...mockActivity,
      status: 'completed',
    };
    const { getByText } = render(
      <ActivityCard activity={completedActivity} onPress={mockOnPress} />
    );
    expect(getByText('Review')).toBeTruthy();
  });

  it('displays overdue badge for overdue activities', () => {
    const overdueActivity: Activity = {
      ...mockActivity,
      status: 'overdue',
    };
    const { getByText } = render(<ActivityCard activity={overdueActivity} onPress={mockOnPress} />);
    expect(getByText('Overdue')).toBeTruthy();
    expect(getByText('Submit Now')).toBeTruthy();
  });

  it('displays completed badge for completed activities', () => {
    const completedActivity: Activity = {
      ...mockActivity,
      status: 'completed',
    };
    const { getByText } = render(
      <ActivityCard activity={completedActivity} onPress={mockOnPress} />
    );
    expect(getByText('✓ Completed')).toBeTruthy();
  });

  it('displays instructor name for online classes', () => {
    const classActivity: Activity = {
      ...mockActivity,
      type: 'online-class',
      instructor: 'Dr. John Doe',
      startDate: '2025-10-20T14:00:00Z',
    };
    const { getByText } = render(<ActivityCard activity={classActivity} onPress={mockOnPress} />);
    expect(getByText(/Dr. John Doe/)).toBeTruthy();
  });

  it('displays progress bar for in-progress activities', () => {
    const inProgressActivity: Activity = {
      ...mockActivity,
      status: 'in-progress',
      progress: 65,
    };
    const { getByText } = render(
      <ActivityCard activity={inProgressActivity} onPress={mockOnPress} />
    );
    expect(getByText('65%')).toBeTruthy();
  });

  it('displays attempt information when available', () => {
    const activityWithAttempts: Activity = {
      ...mockActivity,
      attempts: 1,
      maxAttempts: 3,
    };
    const { getByText } = render(
      <ActivityCard activity={activityWithAttempts} onPress={mockOnPress} />
    );
    expect(getByText(/Attempts: 1\/3/)).toBeTruthy();
  });

  it('displays category information', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} onPress={mockOnPress} />);
    expect(getByText('AI & Machine Learning')).toBeTruthy();
  });

  it('displays duration for timed activities', () => {
    const timedActivity: Activity = {
      ...mockActivity,
      duration: 120,
    };
    const { getByText } = render(<ActivityCard activity={timedActivity} onPress={mockOnPress} />);
    expect(getByText(/120 min/)).toBeTruthy();
  });
});
