import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAuthListener } from '@/lib/hooks/useAuthListener';
import { useAppStore } from '@/lib/state/appStore';
import { useRouter, useSegments } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const { authStatus, authUser, userDoc } = useAppStore();

  useAuthListener();

  // Routing Logic
  useEffect(() => {
    if (authStatus === 'loading') return;

    const inAuth = segments[0] === '(auth)';
    const inApp = segments[0] === '(app)';
    const isIndex = !segments[0]; // if no segment, on the index page

    if (authStatus === 'loggedIn') {
      if (inAuth || isIndex) {
        console.log('Auth: Redirecting to app');
        router.replace('/(app)/start'); // send to app
      }
    } else if (authStatus === 'loggedOut') {
      if (inApp || isIndex) {
        console.log('Auth: Redirecting to login');
        router.replace('/(auth)/welcome');
      }
    }
  }, [authStatus, segments, router, authUser, userDoc]);

  const [loaded] = useFonts({
    'Kenney Mini': require('@/assets/fonts/Kenney Mini.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  );
}
