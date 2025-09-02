import { View, Text, Pressable, ImageBackground, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import Heading from '@/components/typography/Heading';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';

const WelcomeScreen = () => {
  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');
  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <Heading>Welcome</Heading>
      <PrimaryBtn onPress={() => router.push('/(auth)/signup')} label="Join" variant="stone" />
      <PrimaryBtn onPress={() => router.push('/(auth)/login')} label="Log In" variant="stone" />
    </StandardSafeLayout>
  );
};

export default WelcomeScreen;
