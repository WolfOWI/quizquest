import { View, Text } from 'react-native';
import React from 'react';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { router } from 'expo-router';
import TopAppBar from '@/components/navigation/TopAppBar';

const SignupScreen = () => {
  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');
  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar
        title="Signup"
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
        titleCenter
      />
    </StandardSafeLayout>
  );
};

export default SignupScreen;
