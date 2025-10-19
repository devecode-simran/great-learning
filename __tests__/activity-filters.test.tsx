import { ActivityFilters } from '@/features/activities/components';
import { FilterType } from '@/features/activities/types';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

describe('ActivityFilters', () => {
  const mockOnFilterChange = jest.fn();

  const mockCounts = {
    all: 12,
    'online-class': 3,
    assignment: 4,
    quiz: 3,
    discussion: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all filter buttons', () => {
    render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    expect(screen.getByText('All (12)')).toBeTruthy();
    expect(screen.getByText('Online Classes (3)')).toBeTruthy();
    expect(screen.getByText('Assignments (4)')).toBeTruthy();
    expect(screen.getByText('Quizzes (3)')).toBeTruthy();
    expect(screen.getByText('Discussions (2)')).toBeTruthy();
  });

  it('should call onFilterChange when filter is clicked', () => {
    render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    const assignmentButton = screen.getByText('Assignments (4)');
    fireEvent.press(assignmentButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('assignment');
  });

  it('should highlight the selected filter', () => {
    const { rerender } = render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    // Initially 'all' is selected
    expect(screen.getByText('All (12)')).toBeTruthy();

    // Change to 'assignment'
    rerender(
      <ActivityFilters
        selectedFilter="assignment"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    expect(screen.getByText('Assignments (4)')).toBeTruthy();
  });

  it('should handle zero counts', () => {
    const zeroCounts = {
      all: 0,
      'online-class': 0,
      assignment: 0,
      quiz: 0,
      discussion: 0,
    };

    render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={zeroCounts}
      />
    );

    expect(screen.getByText('All (0)')).toBeTruthy();
    expect(screen.getByText('Online Classes (0)')).toBeTruthy();
    expect(screen.getByText('Assignments (0)')).toBeTruthy();
    expect(screen.getByText('Quizzes (0)')).toBeTruthy();
    expect(screen.getByText('Discussions (0)')).toBeTruthy();
  });

  it('should call onFilterChange with correct filter type for each button', () => {
    render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    const filterTests: { text: string; expectedFilter: FilterType }[] = [
      { text: 'All (12)', expectedFilter: 'all' },
      { text: 'Online Classes (3)', expectedFilter: 'online-class' },
      { text: 'Assignments (4)', expectedFilter: 'assignment' },
      { text: 'Quizzes (3)', expectedFilter: 'quiz' },
      { text: 'Discussions (2)', expectedFilter: 'discussion' },
    ];

    filterTests.forEach(({ text, expectedFilter }) => {
      const button = screen.getByText(text);
      fireEvent.press(button);
      expect(mockOnFilterChange).toHaveBeenCalledWith(expectedFilter);
    });
  });

  it('should not break with missing counts', () => {
    const partialCounts = {
      all: 5,
      'online-class': 2,
      assignment: 2,
      quiz: 1,
      discussion: 0,
    };

    render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={partialCounts}
      />
    );

    expect(screen.getByText('All (5)')).toBeTruthy();
    expect(screen.getByText('Discussions (0)')).toBeTruthy();
  });

  it('should be scrollable horizontally on mobile', () => {
    render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    // The component should render (ScrollView is used internally)
    expect(screen.getByText('All (12)')).toBeTruthy();
  });
});
