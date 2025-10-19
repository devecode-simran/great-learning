# Deployment Guide

This guide covers deploying the Great Learning Activity Listing app to various platforms.

## Table of Contents

- [Web Deployment](#web-deployment)
- [Android Deployment](#android-deployment)
- [iOS Deployment](#ios-deployment)

---

## Web Deployment

The web version can be deployed to any static hosting service.

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Build the app**

```bash
npx expo export --platform web
```

3. **Deploy**

```bash
cd dist
vercel
```

4. **Follow prompts** to deploy

**Alternative**: Connect your GitHub repo to Vercel for automatic deployments.

### Option 2: Netlify

1. **Build the app**

```bash
npx expo export --platform web
```

2. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

3. **Deploy**

```bash
cd dist
netlify deploy --prod
```

### Option 3: GitHub Pages

1. **Add to package.json**

```json
{
  "homepage": "https://yourusername.github.io/repo-name"
}
```

2. **Install gh-pages**

```bash
npm install --save-dev gh-pages
```

3. **Add deploy script to package.json**

```json
{
  "scripts": {
    "predeploy": "npx expo export --platform web",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy**

```bash
npm run deploy
```

### Option 4: AWS S3 + CloudFront

1. **Build the app**

```bash
npx expo export --platform web
```

2. **Upload to S3**
   - Create S3 bucket
   - Enable static website hosting
   - Upload `dist` folder contents

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure SSL certificate

---

## Android Deployment

### Using EAS Build (Easiest)

1. **Install EAS CLI**

```bash
npm install -g eas-cli
```

2. **Login to Expo**

```bash
eas login
```

3. **Configure EAS**

```bash
eas build:configure
```

4. **Build APK for testing**

```bash
eas build --platform android --profile preview
```

5. **Build for Play Store**

```bash
eas build --platform android --profile production
```

6. **Download and distribute**
   - Download APK from build URL
   - Share for testing or upload to Play Store

### Submitting to Google Play Store

1. **Create a Google Play Developer account** ($25 one-time fee)

2. **Prepare assets**
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 PNG)
   - Screenshots (at least 2)
   - App description

3. **Build production APK/AAB**

```bash
eas build --platform android --profile production
```

4. **Upload to Play Console**
   - Create new app in Play Console
   - Upload AAB file
   - Fill in app details
   - Submit for review

### Local Build (Advanced)

```bash
npx expo run:android --variant release
```

This creates an APK in `android/app/build/outputs/apk/release/`

---

## iOS Deployment

### Using EAS Build (Easiest)

1. **Install EAS CLI**

```bash
npm install -g eas-cli
```

2. **Login to Expo**

```bash
eas login
```

3. **Configure EAS**

```bash
eas build:configure
```

4. **Build for TestFlight**

```bash
eas build --platform ios --profile preview
```

5. **Build for App Store**

```bash
eas build --platform ios --profile production
```

### Submitting to App Store

1. **Apple Developer account required** ($99/year)

2. **Prepare assets**
   - App icon (1024x1024 PNG)
   - Screenshots for different device sizes
   - App description
   - Privacy policy URL

3. **Build for production**

```bash
eas build --platform ios --profile production
```

4. **Upload to App Store Connect**
   - EAS will automatically upload if configured
   - Or download IPA and upload manually

5. **Submit for review**
   - Fill in app information
   - Answer compliance questions
   - Submit for review

### Local Build (Mac required)

```bash
npx expo run:ios --configuration Release
```

This requires Xcode and proper certificates configured.

---

## Environment Variables

For production, use environment variables for sensitive data:

1. **Create `.env` files**

```
.env.development
.env.production
```

2. **Add to .gitignore**

```
.env*
```

3. **Use in code**

```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL;
```

4. **Configure in EAS**

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_API_URL": "https://api.production.com"
      }
    }
  }
}
```

---

## OTA Updates with EAS Update

Deploy updates without app store review:

1. **Setup EAS Update**

```bash
eas update:configure
```

2. **Publish update**

```bash
eas update --branch production --message "Bug fixes"
```

3. **Users get updates automatically** on next app launch

---

## CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx expo export --platform web
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist

  mobile:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm install -g eas-cli
      - run: eas build --platform all --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

---

## Performance Optimization

Before deploying:

1. **Enable production mode**

```bash
NODE_ENV=production npx expo export
```

2. **Optimize images**
   - Use WebP format
   - Compress images
   - Use appropriate sizes

3. **Enable code splitting** (web)

```typescript
const Component = lazy(() => import('./Component'));
```

4. **Analyze bundle size**

```bash
npx expo export --dump-sourcemap
```

---

## Monitoring & Analytics

### Expo Analytics

- Built into Expo dashboard
- Track crashes and errors

### Sentry Integration

```bash
npm install @sentry/react-native
```

### Google Analytics

```bash
npm install @react-native-firebase/analytics
```

---

## Checklist Before Deployment

- [ ] Test on multiple devices/browsers
- [ ] Check all features work
- [ ] Test light and dark modes
- [ ] Verify responsive design
- [ ] Update version number in app.json
- [ ] Test production build locally
- [ ] Set up error tracking
- [ ] Configure analytics
- [ ] Prepare store assets
- [ ] Write release notes
- [ ] Create privacy policy
- [ ] Test offline behavior
- [ ] Check performance metrics
- [ ] Remove console.logs
- [ ] Update README with deployment URLs

---

## Support & Resources

- **Expo Documentation**: https://docs.expo.dev/
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **EAS Submit**: https://docs.expo.dev/submit/introduction/
- **EAS Update**: https://docs.expo.dev/eas-update/introduction/

---

**Note**: Deployment steps may vary based on your specific requirements and infrastructure. Always test thoroughly before deploying to production.
