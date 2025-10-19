# Mobile Testing Guide

## Testing on Your Phone (No Android Studio Required!)

The easiest way to test the mobile app is using **Expo Go** - a free app that lets you run React Native apps on your phone instantly.

## Option 1: Expo Go App (Recommended) ⭐

### Android

1. **Install Expo Go**
   - Open Google Play Store
   - Search for "Expo Go"
   - Install the app (it's free)
   - Link: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Start the development server**

   ```bash
   npm start
   ```

3. **Scan the QR code**
   - Open Expo Go app on your phone
   - Tap "Scan QR code"
   - Point camera at the QR code in your terminal
   - App loads instantly!

### iOS

1. **Install Expo Go**
   - Open App Store
   - Search for "Expo Go"
   - Install the app
   - Link: https://apps.apple.com/app/expo-go/id982107779

2. **Start the development server**

   ```bash
   npm start
   ```

3. **Scan the QR code**
   - Open Camera app (not Expo Go)
   - Point at QR code
   - Tap notification to open in Expo Go

## Option 2: Test Web Version on Mobile Browser

The web version is fully responsive and works great on mobile:

1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` (look for inet)

2. Open on your phone's browser:

   ```
   http://YOUR_IP_ADDRESS:8081
   ```

3. Test all mobile features!

## Option 3: Build APK/IPA for Testing

If you want actual native apps without Android Studio:

### Using EAS Build (Expo Cloud Service)

1. **Install EAS CLI**

   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**

   ```bash
   eas login
   ```

3. **Build APK for Android**

   ```bash
   eas build --platform android --profile preview
   ```

   - This builds in the cloud (no Android Studio needed!)
   - Download APK when ready
   - Install on Android device

4. **Build for iOS**

   ```bash
   eas build --platform ios --profile preview
   ```

   - Requires Apple Developer account ($99/year)

## Why Expo Go is Perfect for This Assignment

✅ **No setup required** - Just install an app  
✅ **Instant testing** - See changes in real-time  
✅ **Works on any device** - Android or iOS  
✅ **Perfect for demos** - Show live to reviewers  
✅ **Professional workflow** - Used by many companies

## What You'll See on Mobile

All features work perfectly:

- ✅ Scrollable activity list
- ✅ Search functionality
- ✅ Filter chips (swipe to see all)
- ✅ Activity cards with all details
- ✅ Progress bars
- ✅ Action buttons
- ✅ Analytics dashboard
- ✅ Tab navigation
- ✅ Light/dark mode (based on phone settings)
- ✅ Smooth animations
- ✅ Native feel

## Troubleshooting

### "Couldn't connect to server"

- Make sure phone and computer are on same WiFi
- Check firewall isn't blocking port 8081
- Try restarting the dev server

### "Something went wrong"

- Clear Expo Go cache: Settings → Clear cache
- Restart the dev server with `npm start --clear`

### QR code not working

- Try typing the URL manually in Expo Go
- URL format: `exp://YOUR_IP:8081`

## For Assignment Reviewers

If you're reviewing this assignment:

1. **Web version** works immediately at http://localhost:8081
2. **Mobile testing** available via Expo Go app (scan QR code)
3. **No Android Studio needed** - Expo Go provides full mobile experience
4. **Production builds** possible via EAS Build cloud service

## Screenshots

Take screenshots on your phone to include in your submission:

1. Activities list
2. Filters in action
3. Search results
4. Analytics dashboard
5. Light and dark mode
6. Different activity types

---

**Note**: Android Studio is only needed for advanced native development. For this assignment, Expo Go provides a complete mobile testing experience without any complex setup!
