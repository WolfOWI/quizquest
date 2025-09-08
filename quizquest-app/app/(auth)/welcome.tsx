import { View, Text, Pressable, ImageBackground, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '@/components/typography/Heading';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';

const WelcomeScreen = () => {
  const backgroundTexture = require('@/assets/textures/bricks_castle.png');
  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4}>
      <View className="w-full flex-1 items-center justify-between">
        <Heading>Welcome</Heading>
        <View className="flex w-full flex-col gap-2">
          <PrimaryBtn onPress={() => router.push('/(auth)/signup')} label="Join" variant="stone" />
          <PrimaryBtn onPress={() => router.push('/(auth)/login')} label="Log In" variant="stone" />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default WelcomeScreen;
