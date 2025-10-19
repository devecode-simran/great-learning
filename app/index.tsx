import { NavigationBar } from '@/components/navigation-bar';
import { Colors } from '@/constants/theme';
import { mockActivities } from '@/features/activities';
import { AnalyticsCard, useAnalyticsData } from '@/features/analytics';
import { useColorScheme } from '@/features/theme';
import {
  BarChart3,
  BookOpen,
  CheckSquare,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageCircle,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivitiesScreen } from './activities-screen';

const ACTIVITY_TYPE_ICONS = {
  'online-class': GraduationCap,
  assignment: FileText,
  quiz: CheckSquare,
  discussion: MessageCircle,
} as const;

const ACTIVITY_TYPE_LABELS = {
  'online-class': 'Online Classes',
  assignment: 'Assignments',
  quiz: 'Quizzes',
  discussion: 'Discussions',
} as const;

export default function MainScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<'activities' | 'analytics'>('activities');
  const analytics = useAnalyticsData(mockActivities);

  // Responsive margins - Initialize with current window width to prevent flicker
  const [screenWidth, setScreenWidth] = useState(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return Dimensions.get('window').width;
  });

  const isMobile = screenWidth < 768;
  const horizontalPadding = isMobile ? 16 : 150;

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

  const handleTabPress = (tab: string) => {
    if (tab === 'activities' || tab === 'analytics') {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    if (activeTab === 'activities') {
      return <ActivitiesScreen />;
    }

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Analytics</Text>
            <Text style={[styles.subtitle, { color: Colors[colorScheme].secondaryText }]}>
              Track your learning progress
            </Text>
          </View>

          <AnalyticsCard isDark={isDark}>
            <View style={styles.cardTitleContainer}>
              <BarChart3 size={18} color={Colors[colorScheme].text} />
              <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]}>
                Progress Overview
              </Text>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressItem}>
                <Text style={[styles.progressLabel, { color: Colors[colorScheme].secondaryText }]}>
                  Completion Rate
                </Text>
                <Text style={[styles.progressValue, { color: Colors[colorScheme].success }]}>
                  {analytics.completionRate}%
                </Text>
              </View>

              <View style={styles.progressItem}>
                <Text style={[styles.progressLabel, { color: Colors[colorScheme].secondaryText }]}>
                  Points Earned
                </Text>
                <Text style={[styles.progressValue, { color: Colors[colorScheme].warning }]}>
                  {analytics.earnedPoints}/{analytics.totalPoints}
                </Text>
              </View>
            </View>
          </AnalyticsCard>

          <AnalyticsCard isDark={isDark}>
            <View style={styles.cardTitleContainer}>
              <BookOpen size={18} color={Colors[colorScheme].text} />
              <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]}>
                By Category
              </Text>
            </View>
            {Object.entries(analytics.byCategory).map(([category, count]) => (
              <View key={category} style={styles.statRow}>
                <Text style={[styles.statLabel, { color: Colors[colorScheme].text }]}>
                  {category}
                </Text>
                <View
                  style={[styles.statBadge, { backgroundColor: Colors[colorScheme].borderColor }]}
                >
                  <Text style={[styles.statValue, { color: Colors[colorScheme].secondaryText }]}>
                    {count}
                  </Text>
                </View>
              </View>
            ))}
          </AnalyticsCard>

          <AnalyticsCard isDark={isDark}>
            <View style={styles.cardTitleContainer}>
              <BarChart3 size={18} color={Colors[colorScheme].text} />
              <Text style={[styles.cardTitle, { color: Colors[colorScheme].text }]}>
                By Activity Type
              </Text>
            </View>

            {Object.entries(analytics.byType).map(([type, count]) => {
              const activityType = type as keyof typeof ACTIVITY_TYPE_ICONS;
              const IconComponent = ACTIVITY_TYPE_ICONS[activityType];
              return (
                <View key={type} style={styles.statRow}>
                  <View style={styles.statLabelContainer}>
                    <IconComponent size={20} color={Colors[colorScheme].text} />
                    <Text style={[styles.statLabel, { color: Colors[colorScheme].text }]}>
                      {ACTIVITY_TYPE_LABELS[activityType]}
                    </Text>
                  </View>
                  <View
                    style={[styles.statBadge, { backgroundColor: Colors[colorScheme].borderColor }]}
                  >
                    <Text style={[styles.statValue, { color: Colors[colorScheme].secondaryText }]}>
                      {count}
                    </Text>
                  </View>
                </View>
              );
            })}
          </AnalyticsCard>

          <AnalyticsCard
            isDark={isDark}
            style={{
              backgroundColor: Colors[colorScheme].lightBlue,
              borderColor: Colors[colorScheme].accentBlue,
            }}
          >
            <View style={styles.cardTitleContainer}>
              <Lightbulb size={18} color={Colors[colorScheme].accentBlue} />
              <Text style={[styles.cardTitle, { color: Colors[colorScheme].accentBlue }]}>
                Learning Tips
              </Text>
            </View>
            <Text style={[styles.tipText, { color: Colors[colorScheme].accentBlue }]}>
              • Complete activities before the due date to avoid penalties
            </Text>
            <Text style={[styles.tipText, { color: Colors[colorScheme].accentBlue }]}>
              • Focus on overdue and in-progress activities first
            </Text>
            <Text style={[styles.tipText, { color: Colors[colorScheme].accentBlue }]}>
              • Join discussions to engage with peers and instructors
            </Text>
            <Text style={[styles.tipText, { color: Colors[colorScheme].accentBlue }]}>
              • Review completed materials to reinforce learning
            </Text>
          </AnalyticsCard>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}
      edges={['top']}
    >
      <NavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressSection: {
    gap: 16,
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressValue: {
    fontSize: 32,
    fontWeight: '800',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  statBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 4,
  },
});
