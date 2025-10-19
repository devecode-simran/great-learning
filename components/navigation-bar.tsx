import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/features/theme';
import { BarChart3, BookOpen, Crown, GraduationCap, Home, LucideIcon, Menu, Search, User, X } from 'lucide-react-native';
import React, { memo, useEffect, useState } from 'react';
import { Dimensions, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface NavigationBarProps {
  activeTab?:
    | 'activities'
    | 'analytics'
    | 'dashboard'
    | 'browse-courses'
    | 'university-programs'
    | 'academy-pro';
  onTabPress?: (tab: string) => void;
  onSearchPress?: () => void;
  onProfilePress?: () => void;
}

interface NavItemProps {
  item: { id: string; label: string; icon: LucideIcon };
  isActive: boolean;
  colorScheme: 'light' | 'dark';
  onPress: () => void;
}

const NavItem = ({ item, isActive, colorScheme, onPress }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = item.icon;

  const getBackgroundColor = () => {
    if (isHovered) {
      return colorScheme === 'dark' ? '#424242' : '#F5F5F5'; // Grey hover state
    }
    return 'transparent';
  };

  const getBorderColor = () => {
    return 'transparent';
  };

  const getTextColor = () => {
    if (isActive) {
      return '#1E88E5'; // Blue text for active state
    }
    return Colors[colorScheme].text;
  };

  const getIconColor = () => {
    if (isActive) {
      return '#1E88E5'; // Blue icon for active state
    }
    return Colors[colorScheme].text;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.navItem,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: 0,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: isActive }}
    >
      <IconComponent size={20} color={getIconColor()} />
      <Text
        style={[
          styles.navLabel,
          {
            color: getTextColor(),
            fontWeight: isActive ? '600' : '400',
          },
        ]}
      >
        {item.label}
      </Text>
    </Pressable>
  );
};

const NavigationBarComponent = ({
  activeTab = 'activities',
  onTabPress,
  onSearchPress,
  onProfilePress,
}: NavigationBarProps) => {
  const colorScheme = useColorScheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize with current window width to prevent flicker
  const [screenWidth, setScreenWidth] = useState(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return Dimensions.get('window').width;
  });
  
  const isMobile = screenWidth < 768;

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

  const primaryNavItems = [
    {
      id: 'activities',
      label: 'Activities',
      icon: BookOpen,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
  ];

  const secondaryNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'browse-courses',
      label: 'Browse Courses',
      icon: BookOpen,
    },
    {
      id: 'university-programs',
      label: 'University Programs',
      icon: GraduationCap,
    },
    {
      id: 'academy-pro',
      label: 'Academy Pro+',
      icon: Crown,
    },
  ];

  const handleTabPress = (tabId: string) => {
    onTabPress?.(tabId);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderNavItem = (item: { id: string; label: string; icon: LucideIcon }, isActive: boolean) => {
    return (
      <NavItem
        key={item.id}
        item={item}
        isActive={isActive}
        colorScheme={colorScheme}
        onPress={() => handleTabPress(item.id)}
      />
    );
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors[colorScheme].background,
            borderBottomColor: Colors[colorScheme].borderColor,
          },
        ]}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={[styles.logoIcon, { backgroundColor: '#1E88E5' }]}>
              <Text style={styles.logoText}>G</Text>
            </View>
            {!isMobile && (
              <View style={styles.logoTextContainer}>
                <Text style={[styles.logoTextMain, { color: '#1565C0' }]}>Great</Text>
                <Text style={[styles.logoTextSub, { color: '#1E88E5' }]}>Learning</Text>
              </View>
            )}
          </View>
        </View>

        {/* Desktop Navigation */}
        {!isMobile && (
          <View style={styles.navSection}>
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return renderNavItem(item, isActive);
            })}
            {secondaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return renderNavItem(item, isActive);
            })}
          </View>
        )}

        {/* Mobile Navigation - Hidden tabs, only hamburger menu */}

        {/* Right Section */}
        <View style={styles.rightSection}>
          {/* Search Bar - Hidden on mobile */}
          {!isMobile && (
            <Pressable
              style={({ pressed }) => [
                styles.searchContainer,
                {
                  backgroundColor: Colors[colorScheme].cardBackground,
                  borderColor: Colors[colorScheme].borderColor,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={onSearchPress}
              accessibilityRole="button"
              accessibilityLabel="Search courses"
            >
              <TextInput
                style={[styles.searchInput, { color: Colors[colorScheme].text }]}
                placeholder="Search Courses"
                placeholderTextColor={Colors[colorScheme].secondaryText}
                editable={false}
                pointerEvents="none"
              />
              <Search size={16} color={Colors[colorScheme].secondaryText} />
            </Pressable>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Pressable
              style={({ pressed }) => [
                styles.mobileMenuButton,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              accessibilityRole="button"
              accessibilityLabel="Open menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} color={Colors[colorScheme].text} />
              ) : (
                <Menu size={24} color={Colors[colorScheme].text} />
              )}
            </Pressable>
          )}

          {/* Profile Icon */}
          <Pressable
            style={({ pressed }) => [
              styles.profileContainer,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={onProfilePress}
            accessibilityRole="button"
            accessibilityLabel="User profile"
          >
            <User size={24} color={Colors[colorScheme].secondaryText} />
          </Pressable>
        </View>
      </View>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <View
          style={[
            styles.mobileMenuOverlay,
            {
              backgroundColor: Colors[colorScheme].background,
              borderBottomColor: Colors[colorScheme].borderColor,
            },
          ]}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mobileMenuScroll}>
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return renderNavItem(item, isActive);
            })}
            {secondaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return renderNavItem(item, isActive);
            })}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export const NavigationBar = memo(NavigationBarComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    minHeight: 60,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  logoSection: {
    marginRight: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  logoTextContainer: {
    flexDirection: 'column',
  },
  logoTextMain: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
  },
  logoTextSub: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
  },
  navSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 200,
    maxWidth: 300,
    gap: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },
  mobileMenuButton: {
    padding: 8,
    borderRadius: 6,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  profileContainer: {
    padding: 8,
    borderRadius: 6,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  mobileMenuOverlay: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  mobileMenuScroll: {
    flexDirection: 'row',
  },
});
