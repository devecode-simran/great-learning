import { useFetchActivities } from '@/features/activities/hooks/use-fetch-activities';
import { renderHook, waitFor } from '@testing-library/react-native';

// Mock fetch
global.fetch = jest.fn();

describe('useFetchActivities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch activities successfully', async () => {
    const mockActivities = [
      {
        id: '1',
        title: 'Test Activity',
        type: 'assignment',
        status: 'not-started',
        description: 'Test description',
        category: 'Testing',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockActivities,
    });

    const { result } = renderHook(() => useFetchActivities());

    expect(result.current.loading).toBe(true);
    expect(result.current.activities).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.activities).toEqual(mockActivities);
    expect(result.current.error).toBe(null);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://68f5104fb16eb6f468364608.mockapi.io/api/v1/activities'
    );
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useFetchActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.activities).toEqual([]);
    expect(result.current.error).toBe('HTTP error! status: 500');
  });

  it('should handle network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetchActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.activities).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });

  it('should refetch activities when refetch is called', async () => {
    const mockActivities1 = [
      {
        id: '1',
        title: 'Activity 1',
        type: 'quiz',
        status: 'completed',
        description: 'Test',
        category: 'Test',
      },
    ];
    const mockActivities2 = [
      {
        id: '2',
        title: 'Activity 2',
        type: 'assignment',
        status: 'in-progress',
        description: 'Test 2',
        category: 'Test',
      },
    ];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockActivities1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockActivities2,
      });

    const { result } = renderHook(() => useFetchActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.activities).toEqual(mockActivities1);

    // Refetch
    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.activities).toEqual(mockActivities2);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should handle empty response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useFetchActivities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.activities).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
