import { Colors } from '@/constants/theme';
import {
  Activity,
  ActivityCard,
  ActivityFilters,
  FilterType,
  mockActivities,
  useActivityActions,
  useActivityFilters,
  useActivityStats,
  useFilterCounts,
} from '@/features/activities';
import { ThemeToggle, useColorScheme } from '@/features/theme';
import { Search, SearchX, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export function ActivitiesScreen() {
  const colorScheme = useColorScheme();

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const { filteredActivities } = useActivityFilters({
    activities: mockActivities,
    filterType: selectedFilter,
    searchQuery,
  });
  const filterCounts = useFilterCounts(mockActivities);
  const stats = useActivityStats(mockActivities);
  const { handleActivityPress } = useActivityActions();

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <View style={[styles.titleRow, { paddingHorizontal: horizontalMargin }]}>
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: Colors[colorScheme].text }]}>My Activities</Text>
            <Text style={[styles.subtitle, { color: Colors[colorScheme].secondaryText }]}>
              {mockActivities.length} total activities
            </Text>
          </View>
          <ThemeToggle />
        </View>

        <View style={[styles.statsContainer, { paddingHorizontal: horizontalMargin }]}>
          {stats.overdue > 0 && (
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: Colors[colorScheme].cardBackground,
                  borderColor: Colors[colorScheme].error + '20',
                },
              ]}
            >
              <Text style={[styles.statNumber, { color: Colors[colorScheme].error }]}>
                {stats.overdue}
              </Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme].error }]}>Overdue</Text>
            </View>
          )}
          {stats.inProgress > 0 && (
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: Colors[colorScheme].cardBackground,
                  borderColor: Colors[colorScheme].warning + '20',
                },
              ]}
            >
              <Text style={[styles.statNumber, { color: Colors[colorScheme].warning }]}>
                {stats.inProgress}
              </Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme].warning }]}>
                In Progress
              </Text>
            </View>
          )}
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: Colors[colorScheme].cardBackground,
                borderColor: Colors[colorScheme].success + '20',
              },
            ]}
          >
            <Text style={[styles.statNumber, { color: Colors[colorScheme].success }]}>
              {stats.completed}
            </Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme].success }]}>
              Completed
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: Colors[colorScheme].cardBackground,
              borderColor: Colors[colorScheme].borderColor,
              marginHorizontal: horizontalMargin,
            },
          ]}
        >
          <Search size={18} color={Colors[colorScheme].secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: Colors[colorScheme].text }]}
            placeholder="Search activities..."
            placeholderTextColor={Colors[colorScheme].secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color={Colors[colorScheme].secondaryText} />
            </Pressable>
          )}
        </View>

        <ActivityFilters
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          counts={filterCounts}
        />

        {(searchQuery || selectedFilter !== 'all') && (
          <View style={[styles.resultsHeader, { paddingHorizontal: horizontalMargin }]}>
            <Text style={[styles.resultsText, { color: Colors[colorScheme].secondaryText }]}>
              {filteredActivities.length}{' '}
              {filteredActivities.length === 1 ? 'activity' : 'activities'} found
            </Text>
          </View>
        )}
      </View>
    );
  }, [
    colorScheme,
    stats,
    searchQuery,
    selectedFilter,
    filterCounts,
    filteredActivities.length,
    clearSearch,
    horizontalMargin,
  ]);

  const renderEmptyState = useCallback(() => {
    return (
      <View style={styles.emptyState}>
        <SearchX size={64} color={Colors[colorScheme].secondaryText} />
        <Text style={[styles.emptyTitle, { color: Colors[colorScheme].text }]}>
          No activities found
        </Text>
        <Text style={[styles.emptyText, { color: Colors[colorScheme].secondaryText }]}>
          Try adjusting your search or filters
        </Text>
      </View>
    );
  }, [colorScheme]);

  const renderItem = useCallback(
    ({ item }: { item: Activity }) => {
      return <ActivityCard activity={item} onPress={handleActivityPress} />;
    },
    [handleActivityPress]
  );

  return (
    <FlatList
      data={filteredActivities}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyState}
      contentContainerStyle={styles.listContent}
      style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 120,
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.15)',
        },
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 36,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    borderRadius: 12,
    borderWidth: 1,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },
  clearButton: {
    padding: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  resultsHeader: {
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
