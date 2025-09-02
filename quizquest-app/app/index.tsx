import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Link, router, Stack, useRouter } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Image, type ImageStyle, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Loading...</Text>
    </View>
  );
}
