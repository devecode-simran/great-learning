# Great Learning Activity Listing Application

A cross-platform activity management system for Great Learning's online learning platform. Built with React Native and Expo, this application provides learners with a unified interface to view and manage their learning activities across web and mobile devices.

## Features

- Cross-platform support (Web, iOS, Android)
- Activity management for online classes, assignments, quizzes, and discussions
- Real-time filtering and search functionality
- Progress tracking with analytics dashboard
- Responsive design optimized for all screen sizes
- Light and dark mode support
- API integration with MockAPI

## Technology Stack

Core Framework

- React Native with Expo for cross-platform development
- TypeScript for type safety
- Expo Router for file-based navigation

Key Libraries

- Lucide React Native for icons
- React Native Reanimated for animations

Development Tools

- ESLint and Prettier for code quality
- Jest and React Native Testing Library for testing
- Husky for pre-commit hooks

## Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn
- Git

For mobile development:

- Expo Go app (easiest option - no additional setup required)
- OR iOS Simulator (macOS with Xcode)
- OR Android Emulator (Android Studio with SDK)

## Getting Started

### Installation

```bash
git clone <repository-url>
cd great-learning-activity-listing
npm install
```

### Running the Application

Web Development

```bash
npm run web
```

Opens at `http://localhost:8081`

Mobile Development (Easiest Method)

1. Install Expo Go on your device
2. Run `npm start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

iOS Simulator (macOS only)

```bash
npm run ios
```

Android Emulator

```bash
npm run android
```

## Project Structure

```
great-learning-activity-listing/
├── app/                          # Application screens
│   ├── _activities-screen.tsx    # Main activities component
│   ├── index.tsx                 # Landing page
│   ├── modal.tsx                 # Modal screens
│   └── _layout.tsx               # Root layout
├── features/                     # Feature modules
│   ├── activities/               # Activity management
│   │   ├── components/           # UI components
│   │   ├── hooks/                # Custom hooks
│   │   ├── types/                # Type definitions
│   │   ├── utils/                # Helper functions
│   │   └── data/                 # Mock data
│   ├── analytics/                # Analytics feature
│   └── theme/                    # Theme management
├── components/                   # Shared components
├── constants/                    # App constants
└── hooks/                        # Global hooks
```

## Architecture

The application follows a feature-based architecture with clear separation of concerns:

Component Organization

- Container/Presentational pattern for complex components
- Feature modules are self-contained with their own components, hooks, and types
- Shared components live in the root `components` directory

State Management

- React hooks for local state
- Custom hooks for business logic
- Context API for theme management

Performance

- FlatList for efficient list rendering
- Memoization for expensive calculations
- Optimized re-renders with React.memo and useCallback

## API Integration

The application fetches data from MockAPI:

```
https://68f5104fb16eb6f468364608.mockapi.io/api/v1/activities
```

Key features:

- Automatic loading states with skeleton UI
- Error handling with retry functionality
- Type-safe API responses

## Available Scripts

```bash
npm start          # Start development server
npm run web        # Run on web
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm test           # Run test suite
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Testing

The project includes comprehensive tests for core functionality:

Test Coverage

- API Integration: Tests for `useFetchActivities` hook including success, error, and retry scenarios
- Components: Tests for `ActivityCard` and `ActivityFilters` components
- Utilities: Tests for activity helper functions (labels, colors, status)

Running Tests

```bash
npm test                  # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
```

Test Files

- `__tests__/use-fetch-activities.test.ts` - API hook tests
- `__tests__/activity-card.test.tsx` - Activity card component tests
- `__tests__/activity-filters.test.tsx` - Filter component tests
- `__tests__/activity-helpers.test.ts` - Utility function tests

## Building for Production

Web Build

```bash
npx expo export --platform web
```

Output in `dist/` folder, ready for deployment to Vercel, Netlify, or any static host.

Mobile Builds

Using EAS Build (recommended):

```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Activity Data Structure

```typescript
interface Activity {
  id: string;
  title: string;
  type: 'online-class' | 'assignment' | 'quiz' | 'discussion';
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  description: string;
  category: string;
  dueDate?: string;
  duration?: number;
  progress?: number;
  points?: number;
  topic?: string;
  instructor?: string;
  startDate?: string;
  attempts?: number;
  maxAttempts?: number;
}
```

## Known Limitations

- Authentication not implemented
- No offline data persistence
- Push notifications not available
- File upload functionality pending

## Future Improvements

- Backend API integration with authentication
- Offline mode with local caching
- Push notifications for due dates
- Assignment submission with file uploads
- Enhanced analytics with visualizations
- Calendar view for activities

## Development Notes

Node Version Compatibility

If you encounter pre-commit hook errors related to `string-width`, you're likely running Node.js v18. Upgrade to Node.js v20 or higher, or bypass hooks temporarily with:

```bash
git commit --no-verify
```

Common Issues

1. Metro bundler cache issues: `npx expo start -c`
2. iOS build issues: `cd ios && pod install`
3. Android gradle issues: `cd android && ./gradlew clean`

## Contributing

This is an assignment project for Great Learning's Full Stack Development Program.

## License

Created for educational purposes as part of Great Learning coursework.

---

For issues or questions, please refer to the project documentation or contact the development team.
