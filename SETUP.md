# Quick Setup Guide

This is a quick reference guide to get the Great Learning Activity Listing app running on your machine.

## Prerequisites

- **Node.js** (v18+): Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

#### Web (Recommended for quick testing)

```bash
npm run web
```

Opens in browser at `http://localhost:8081`

#### iOS (Mac only)

```bash
npm run ios
```

Requires Xcode installed

#### Android

```bash
npm run android
```

Requires Android Studio + emulator or physical device

#### Physical Device (Easy Testing)

```bash
npm start
```

Then scan QR code with:

- iOS: Camera app
- Android: Expo Go app

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Building for Production

### Web Build

```bash
npx expo export --platform web
```

Output: `dist/` folder

### Android APK

```bash
npx expo build:android
```

### iOS IPA

```bash
npx expo build:ios
```

## Project Structure

```
app/(tabs)/
  ├── index.tsx        # Activities listing screen
  └── explore.tsx      # Analytics screen
components/
  ├── activity-card.tsx    # Activity card component
  └── activity-filters.tsx # Filter chips
types/
  └── activity.ts      # TypeScript types
data/
  └── mockActivities.ts # Mock data
```

## Common Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm start`       | Start development server |
| `npm run web`     | Run on web               |
| `npm run ios`     | Run on iOS               |
| `npm run android` | Run on Android           |
| `npm test`        | Run tests                |
| `npm run lint`    | Lint code                |

## Troubleshooting

### Port Already in Use

```bash
npx expo start --clear
```

### Cache Issues

```bash
npx expo start -c
```

### Metro Bundler Issues

```bash
npx expo start --reset-cache
```

### Module Not Found

```bash
rm -rf node_modules
npm install
```

## Features Implemented

✅ Cross-platform (Web, iOS, Android)
✅ Activity listing with search and filters
✅ Light/dark mode support
✅ Responsive design
✅ Analytics dashboard
✅ TypeScript
✅ Basic tests
✅ Mock data

## Next Steps

1. Run `npm install` to install dependencies
2. Run `npm run web` to see the app in your browser
3. Explore the code in `app/(tabs)/index.tsx`
4. Customize mock data in `data/mockActivities.ts`
5. Deploy to production when ready

## Need Help?

- Check the full README.md for detailed documentation
- Review the code comments
- Check Expo documentation: https://docs.expo.dev/

---

**Note**: This is a demonstration project using mock data. For production, integrate with a real API backend.
