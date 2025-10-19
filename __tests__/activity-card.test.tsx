import { ActivityCard } from '@/features/activities/components';
import { Activity } from '@/features/activities/types';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

describe('ActivityCard', () => {
  const mockOnPress = jest.fn();

  const baseActivity: Activity = {
    id: '1',
    title: 'Test Activity',
    type: 'assignment',
    status: 'not-started',
    description: 'This is a test activity description',
    category: 'Testing',
    dueDate: '2025-12-31T23:59:00Z',
    points: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render activity card with basic information', () => {
    render(<ActivityCard activity={baseActivity} onPress={mockOnPress} />);

    expect(screen.getByText('Test Activity')).toBeTruthy();
    expect(screen.getByText('This is a test activity description')).toBeTruthy();
    expect(screen.getByText('Testing')).toBeTruthy();
  });

  it('should display correct type badge for assignment', () => {
    render(<ActivityCard activity={baseActivity} onPress={mockOnPress} />);
    expect(screen.getByText('Assignment')).toBeTruthy();
  });

  it('should display correct type badge for online class', () => {
    const activity: Activity = { ...baseActivity, type: 'online-class' };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Online Class')).toBeTruthy();
  });

  it('should display correct type badge for quiz', () => {
    const activity: Activity = { ...baseActivity, type: 'quiz' };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Quiz')).toBeTruthy();
  });

  it('should display correct type badge for discussion', () => {
    const activity: Activity = { ...baseActivity, type: 'discussion' };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Discussion')).toBeTruthy();
  });

  it('should display correct status label for not-started', () => {
    render(<ActivityCard activity={baseActivity} onPress={mockOnPress} />);
    expect(screen.getByText('Start')).toBeTruthy();
  });

  it('should display correct status label for in-progress', () => {
    const activity: Activity = { ...baseActivity, status: 'in-progress', progress: 50 };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Continue')).toBeTruthy();
  });

  it('should display correct status label for completed', () => {
    const activity: Activity = { ...baseActivity, status: 'completed', progress: 100 };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Review')).toBeTruthy();
  });

  it('should display correct status label for overdue', () => {
    const activity: Activity = { ...baseActivity, status: 'overdue' };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Submit Now')).toBeTruthy();
  });

  it('should display points when provided', () => {
    render(<ActivityCard activity={baseActivity} onPress={mockOnPress} />);
    expect(screen.getByText('100 pts')).toBeTruthy();
  });

  it('should display duration when provided', () => {
    const activity: Activity = { ...baseActivity, duration: 60 };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('60 min')).toBeTruthy();
  });

  it('should display instructor name when provided', () => {
    const activity: Activity = {
      ...baseActivity,
      type: 'online-class',
      instructor: 'Dr. John Smith',
    };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Dr. John Smith')).toBeTruthy();
  });

  it('should display progress bar for in-progress activities', () => {
    const activity: Activity = { ...baseActivity, status: 'in-progress', progress: 75 };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('75%')).toBeTruthy();
  });

  it('should display attempt information when provided', () => {
    const activity: Activity = {
      ...baseActivity,
      type: 'quiz',
      attempts: 1,
      maxAttempts: 3,
    };
    render(<ActivityCard activity={activity} onPress={mockOnPress} />);
    expect(screen.getByText('Attempts: 1/3')).toBeTruthy();
  });

  it('should call onPress when card is pressed', () => {
    render(<ActivityCard activity={baseActivity} onPress={mockOnPress} />);

    // The card should be pressable
    const card = screen.getByText('Test Activity').parent?.parent;
    if (card) {
      fireEvent.press(card);
      expect(mockOnPress).toHaveBeenCalledWith(baseActivity);
    }
  });

  it('should handle activity without optional fields', () => {
    const minimalActivity: Activity = {
      id: '1',
      title: 'Minimal Activity',
      type: 'discussion',
      status: 'not-started',
      description: 'Simple description',
      category: 'General',
    };

    render(<ActivityCard activity={minimalActivity} onPress={mockOnPress} />);
    expect(screen.getByText('Minimal Activity')).toBeTruthy();
    expect(screen.getByText('Simple description')).toBeTruthy();
  });
});
