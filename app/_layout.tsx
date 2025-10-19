import { ThemeProvider, useColorScheme } from '@/features/theme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function RootNavigator() {
  const colorScheme = useColorScheme();
  
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
