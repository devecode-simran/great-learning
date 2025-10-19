import { ActivityFilters } from '@/features/activities';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

describe('ActivityFilters', () => {
  const mockOnFilterChange = jest.fn();
  const mockCounts = {
    all: 12,
    'online-class': 4,
    assignment: 3,
    quiz: 3,
    discussion: 2,
  };

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter options', () => {
    const { getByText } = render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    expect(getByText('All')).toBeTruthy();
    expect(getByText('Classes')).toBeTruthy();
    expect(getByText('Assignments')).toBeTruthy();
    expect(getByText('Quizzes')).toBeTruthy();
    expect(getByText('Discussions')).toBeTruthy();
  });

  it('displays correct counts for each filter', () => {
    const { getByText } = render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    expect(getByText('12')).toBeTruthy(); // All
    expect(getByText('4')).toBeTruthy(); // Classes
    expect(getByText('3')).toBeTruthy(); // Assignments (also matches Quizzes)
    expect(getByText('2')).toBeTruthy(); // Discussions
  });

  it('calls onFilterChange when filter is pressed', () => {
    const { getByText } = render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    fireEvent.press(getByText('Assignments'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('assignment');
  });

  it('highlights selected filter', () => {
    const { getByText } = render(
      <ActivityFilters
        selectedFilter="assignment"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    const assignmentsButton = getByText('Assignments').parent?.parent;
    expect(assignmentsButton?.props.style).toBeDefined();
  });

  it('renders filter icons', () => {
    const { getByText } = render(
      <ActivityFilters
        selectedFilter="all"
        onFilterChange={mockOnFilterChange}
        counts={mockCounts}
      />
    );

    expect(getByText('📚')).toBeTruthy(); // All
    expect(getByText('🎓')).toBeTruthy(); // Classes
    expect(getByText('📝')).toBeTruthy(); // Assignments
    expect(getByText('✅')).toBeTruthy(); // Quizzes
    expect(getByText('💬')).toBeTruthy(); // Discussions
  });
});
