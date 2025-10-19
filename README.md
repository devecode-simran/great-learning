# Great Learning - Activity Listing Application

A cross-platform (Web & Mobile) activity listing application built for Great Learning's online learning platform. This app allows learners to view, filter, and manage their learning activities including online classes, assignments, quizzes, and discussions.

## 🎯 Features

- **📱 Cross-Platform**: Single codebase runs on Web, iOS, and Android
- **📚 Activity Management**: View all learning activities (Online Classes, Assignments, Quizzes, Discussions)
- **🔍 Smart Filtering**: Filter activities by type with dynamic counts
- **🔎 Search**: Search activities by title, description, category, or instructor
- **📊 Analytics**: Track progress, completion rates, and earned points
- **🌓 Light/Dark Mode**: Automatic theme switching based on system preferences
- **📱 Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **⚡ Performance**: Optimized rendering with memoization and FlatList
- **🎨 Modern UI**: Beautiful, intuitive interface with smooth animations

## 🏗️ Tech Stack

### Core Technologies

- **React Native** (with Expo) - Cross-platform mobile framework
- **TypeScript** - Type-safe code
- **Expo Router** - File-based routing for navigation
- **React Native Web** - Web support from the same codebase

### Why These Choices?

#### Expo + React Native

- ✅ Single codebase for Web, iOS, and Android
- ✅ Fast development with hot reload
- ✅ Built-in components that work across platforms
- ✅ Easy to build and deploy
- ✅ Strong community and ecosystem

#### TypeScript

- ✅ Type safety reduces runtime errors
- ✅ Better IDE support and autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring and maintenance

#### Expo Router

- ✅ File-based routing (similar to Next.js)
- ✅ Supports deep linking out of the box
- ✅ Type-safe navigation
- ✅ Works on web and native

### Tradeoffs

| Aspect           | Pros                                      | Cons                                            |
| ---------------- | ----------------------------------------- | ----------------------------------------------- |
| **Expo**         | Quick setup, easy deployment, OTA updates | Larger app size than bare React Native          |
| **React Native** | Learn once, write anywhere                | Some platform-specific code still needed        |
| **Mock Data**    | No backend dependency, fast development   | Need to integrate with real API later           |
| **Single Repo**  | Code sharing, easier maintenance          | Web and native may need different optimizations |

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

**That's it!** No additional setup needed for web.

### For Mobile Testing (Optional)

**Easiest Method** (Recommended):

- **Expo Go App** - Free app for testing on your actual phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))
  - No Android Studio or Xcode required!
  - Scan QR code and app runs on your phone instantly

**Advanced Native Development** (Not Required):

- **iOS**: macOS with Xcode installed (for iOS Simulator)
- **Android**: Android Studio with Android SDK (for Android Emulator)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd great-learning-activity-listing
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run on Web

```bash
npm run web
# or
yarn web
```

The application will open in your default browser at `http://localhost:8081`

### 4. Run on Mobile (Easiest - No Setup Required) ⭐

The quickest way to test on mobile is using **Expo Go**:

1. Install **Expo Go** app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:

```bash
npm start
# or
yarn start
```

3. Scan the QR code with:
   - **iOS**: Camera app (opens in Expo Go)
   - **Android**: Expo Go app (built-in scanner)

4. App loads instantly on your phone! ✅

**See [MOBILE_TESTING.md](MOBILE_TESTING.md) for detailed mobile testing guide.**

### 5. Run on iOS Simulator (Mac + Xcode Required)

```bash
npm run ios
# or
yarn ios
```

**Note**: Requires macOS with Xcode installed.

### 6. Run on Android Emulator (Android Studio Required)

First, ensure you have Android Studio installed with Android SDK and an emulator set up.

```bash
npm run android
# or
yarn android
```

**Note**: If you get "adb not found" error, you need to install Android Studio first. **Use Expo Go app instead** (no setup required)!

1. Install **Expo Go** app on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:

```bash
npm start
# or
yarn start
```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## 🏗️ Building for Production

### Build for Web

```bash
npm run build:web
# or
npx expo export --platform web
```

The optimized build will be in the `dist` folder, ready to deploy to any static hosting service (Vercel, Netlify, etc.).

### Build for Android (APK)

```bash
# Using EAS Build (recommended)
npm install -g eas-cli
eas build --platform android --profile preview

# Or local build
npx expo run:android --variant release
```

### Build for iOS (IPA)

```bash
# Using EAS Build (recommended)
npm install -g eas-cli
eas build --platform ios --profile preview

# Or local build (requires Mac + Xcode)
npx expo run:ios --configuration Release
```

## 📁 Project Structure

```
great-learning-activity-listing/
├── app/                      # App screens (Expo Router)
│   ├── (tabs)/              # Tab-based navigation
│   │   ├── index.tsx        # Activities listing screen
│   │   └── explore.tsx      # Analytics screen
│   ├── _layout.tsx          # Root layout
│   └── modal.tsx            # Modal screen
├── components/              # Reusable components
│   ├── activity-card.tsx    # Activity card component
│   ├── activity-filters.tsx # Filter chips component
│   └── ui/                  # UI primitives
├── types/                   # TypeScript type definitions
│   └── activity.ts          # Activity data types
├── data/                    # Mock data
│   └── mockActivities.ts    # Sample activities
├── constants/               # App constants
│   └── theme.ts            # Theme colors
├── hooks/                   # Custom React hooks
│   └── use-color-scheme.ts # Theme hook
├── assets/                  # Images and fonts
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── README.md              # This file
```

## 🎨 Design Decisions

### Component Architecture

- **Atomic Design**: Small, reusable components (ActivityCard, ActivityFilters)
- **Container/Presentation**: Logic separated from UI
- **Type Safety**: TypeScript interfaces for all data structures

### Performance Optimizations

- **FlatList**: Virtualized list for efficient rendering of large lists
- **useMemo**: Memoized filtered data and statistics calculations
- **Optimized Re-renders**: Component-level memoization where needed
- **Image Optimization**: Lazy loading and cached images

### Responsive Design

- **Flexible Layouts**: Flexbox-based responsive layouts
- **Platform-Specific Styles**: Different styles for web vs native where needed
- **Safe Areas**: Proper handling of notches and status bars
- **Keyboard Handling**: Automatic keyboard avoidance

### User Experience

- **Visual Hierarchy**: Clear information hierarchy with typography and spacing
- **Color Coding**: Activity types have distinct colors for quick recognition
- **Status Indicators**: Clear visual status (overdue, in-progress, completed)
- **Interactive Feedback**: Haptic feedback and press states
- **Empty States**: Helpful messaging when no results found

## 🧪 Testing

### Running Tests

```bash
npm test
# or
yarn test
```

### Test Coverage

The project includes:

- **Component Tests**: Testing individual components
- **Integration Tests**: Testing component interactions
- **Type Tests**: TypeScript ensures type safety

### Manual Testing Checklist

- [ ] Activities list loads correctly
- [ ] Filters work (all types)
- [ ] Search functionality works
- [ ] Activity cards display correct information
- [ ] Light/dark mode switches correctly
- [ ] Responsive on different screen sizes
- [ ] Works on web browser
- [ ] Works on iOS device/simulator
- [ ] Works on Android device/emulator
- [ ] Smooth scrolling performance
- [ ] Proper handling of empty states

## 🔄 Data Structure

Activities have the following structure:

```typescript
interface Activity {
  id: string;
  title: string;
  type: 'online-class' | 'assignment' | 'quiz' | 'discussion';
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  description: string;
  dueDate?: string; // ISO 8601 date string
  duration?: number; // in minutes
  progress?: number; // 0-100
  points?: number; // for assessments
  topic?: string;
  instructor?: string;
  startDate?: string; // for online classes
  attempts?: number;
  maxAttempts?: number;
  category: string; // e.g., "AI & Machine Learning"
}
```

## 🚧 Limitations & Known Issues

1. **Mock Data**: Currently using static mock data. Needs API integration.
2. **Authentication**: No user authentication implemented yet.
3. **Offline Support**: No offline mode or data persistence.
4. **Notifications**: Push notifications not implemented.
5. **Real-time Updates**: No WebSocket connection for real-time activity updates.
6. **Video Streaming**: Online class video streaming not implemented.
7. **File Uploads**: Assignment submission with file uploads not implemented.
8. **Accessibility**: Limited accessibility features (needs ARIA labels, screen reader support).

## 🔮 Future Enhancements

### High Priority

- [ ] **API Integration**: Connect to real backend API
- [ ] **Authentication**: User login/signup with JWT
- [ ] **Push Notifications**: Notify users about due dates and new activities
- [ ] **Offline Mode**: Cache data and sync when online
- [ ] **Assignment Submission**: Upload files and submit assignments
- [ ] **Video Player**: Integrated video player for online classes

### Medium Priority

- [ ] **Calendar View**: Calendar-based view of activities
- [ ] **Sorting Options**: Sort by due date, title, progress, etc.
- [ ] **Advanced Filters**: Multiple filter combinations, date ranges
- [ ] **Activity Details**: Dedicated detail page for each activity
- [ ] **Progress Tracking**: Visual progress tracking with charts
- [ ] **Bookmarks/Favorites**: Mark activities as favorites

### Nice to Have

- [ ] **Social Features**: Share progress, collaborate with peers
- [ ] **Gamification**: Badges, streaks, leaderboards
- [ ] **Dark Mode Toggle**: Manual dark mode toggle
- [ ] **Accessibility**: Full WCAG 2.1 compliance
- [ ] **Internationalization**: Multi-language support
- [ ] **Analytics Dashboard**: Detailed learning analytics with charts
- [ ] **Export Data**: Export progress reports as PDF

## 📱 Screenshots

### Activities Screen

- Displays all learning activities with status badges
- Search bar for quick filtering
- Filter chips for activity types
- Statistics cards showing overdue, in-progress, and completed counts

### Analytics Screen

- Completion rate and points overview
- Activity breakdown by category
- Activity breakdown by type
- Learning tips for students

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for Great Learning assignment submission.

## 👤 Author

Created for Great Learning Full Stack Development Program

## 🙏 Acknowledgments

- Great Learning for the opportunity
- React Native & Expo teams for amazing tools
- Open source community

---

**Note**: This is a demonstration project for Great Learning's assignment. The data is mocked locally for development purposes.

For questions or issues, please open an issue in the GitHub repository.
