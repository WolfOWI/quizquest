import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAuthListener } from '@/lib/hooks/useAuthListener';
import { useAppStore } from '@/lib/state/appStore';
import { useRouter, useSegments } from 'expo-router';
import { Jacquard12_400Regular } from '@expo-google-fonts/jacquard-12';
import {
  PixelifySans_400Regular,
  PixelifySans_500Medium,
  PixelifySans_600SemiBold,
  PixelifySans_700Bold,
} from '@expo-google-fonts/pixelify-sans';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    Jacquard12_400Regular: Jacquard12_400Regular,
    PixelifySans_400Regular: PixelifySans_400Regular,
    PixelifySans_500Medium: PixelifySans_500Medium,
    PixelifySans_600SemiBold: PixelifySans_600SemiBold,
    PixelifySans_700Bold: PixelifySans_700Bold,
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
    <ThemeProvider value={NAV_THEME.dark}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </ThemeProvider>
  );
}
