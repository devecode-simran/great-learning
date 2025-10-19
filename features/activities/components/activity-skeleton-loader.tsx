import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/features/theme';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';

export function ActivitySkeletonLoader() {
  const colorScheme = useColorScheme();
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [shimmerAnimation]);

  const opacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const skeletonColor = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)';
  const shimmerColor = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: Colors[colorScheme].cardBackground,
          borderColor: Colors[colorScheme].borderColor,
          opacity,
        },
      ]}
    >
      {/* Header section */}
      <View style={styles.cardHeader}>
        <View style={[styles.iconSkeleton, { backgroundColor: skeletonColor }]} />
        <View style={styles.headerRight}>
          <View style={[styles.badgeSkeleton, { backgroundColor: skeletonColor }]} />
          <View style={[styles.statusSkeleton, { backgroundColor: skeletonColor }]} />
        </View>
      </View>

      {/* Title */}
      <View style={[styles.titleSkeleton, { backgroundColor: shimmerColor }]} />
      <View style={[styles.titleSkeletonShort, { backgroundColor: shimmerColor }]} />

      {/* Description */}
      <View style={[styles.descriptionSkeleton, { backgroundColor: skeletonColor }]} />
      <View style={[styles.descriptionSkeletonShort, { backgroundColor: skeletonColor }]} />

      {/* Meta info */}
      <View style={styles.metaContainer}>
        <View style={[styles.metaSkeleton, { backgroundColor: skeletonColor }]} />
        <View style={[styles.metaSkeleton, { backgroundColor: skeletonColor }]} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={[styles.footerItemSkeleton, { backgroundColor: skeletonColor }]} />
        <View style={[styles.footerItemSkeleton, { backgroundColor: skeletonColor }]} />
      </View>
    </Animated.View>
  );
}

export function SkeletonLoadingScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {/* Header skeleton */}
      <View style={styles.headerContainer}>
        <View style={styles.titleSection}>
          <View
            style={[
              styles.headerTitleSkeleton,
              {
                backgroundColor:
                  colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
              },
            ]}
          />
          <View
            style={[
              styles.headerSubtitleSkeleton,
              {
                backgroundColor:
                  colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
          />
        </View>

        {/* Stats cards skeleton */}
        <View style={styles.statsContainer}>
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.statCardSkeleton,
                {
                  backgroundColor: Colors[colorScheme].cardBackground,
                  borderColor: Colors[colorScheme].borderColor,
                },
              ]}
            >
              <View
                style={[
                  styles.statNumberSkeleton,
                  {
                    backgroundColor:
                      colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                  },
                ]}
              />
              <View
                style={[
                  styles.statLabelSkeleton,
                  {
                    backgroundColor:
                      colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Search bar skeleton */}
        <View
          style={[
            styles.searchSkeleton,
            {
              backgroundColor: Colors[colorScheme].cardBackground,
              borderColor: Colors[colorScheme].borderColor,
            },
          ]}
        />

        {/* Filter buttons skeleton */}
        <View style={styles.filterContainer}>
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[
                styles.filterButtonSkeleton,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Activity cards skeleton */}
      <View style={styles.cardsContainer}>
        <ActivitySkeletonLoader />
        <ActivitySkeletonLoader />
        <ActivitySkeletonLoader />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  headerTitleSkeleton: {
    width: 180,
    height: 28,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerSubtitleSkeleton: {
    width: 120,
    height: 16,
    borderRadius: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statCardSkeleton: {
    flex: 1,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    minHeight: 120,
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
  statNumberSkeleton: {
    width: 50,
    height: 36,
    borderRadius: 8,
    marginBottom: 8,
  },
  statLabelSkeleton: {
    width: 80,
    height: 16,
    borderRadius: 6,
  },
  searchSkeleton: {
    height: 48,
    borderRadius: 12,
    marginBottom: 16,
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButtonSkeleton: {
    width: 80,
    height: 36,
    borderRadius: 20,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeSkeleton: {
    width: 70,
    height: 24,
    borderRadius: 12,
  },
  statusSkeleton: {
    width: 80,
    height: 24,
    borderRadius: 12,
  },
  titleSkeleton: {
    height: 20,
    borderRadius: 6,
    marginBottom: 8,
    width: '80%',
  },
  titleSkeletonShort: {
    height: 20,
    borderRadius: 6,
    marginBottom: 12,
    width: '50%',
  },
  descriptionSkeleton: {
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
    width: '100%',
  },
  descriptionSkeletonShort: {
    height: 14,
    borderRadius: 4,
    marginBottom: 12,
    width: '70%',
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaSkeleton: {
    width: 100,
    height: 16,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.1)',
    paddingTop: 12,
  },
  footerItemSkeleton: {
    width: 80,
    height: 16,
    borderRadius: 4,
  },
});
