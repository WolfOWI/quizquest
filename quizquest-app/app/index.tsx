import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    // Loading Screen
    <View className="flex-1 items-center justify-center">
      <Text>Loading...</Text>
    </View>
  );
}
