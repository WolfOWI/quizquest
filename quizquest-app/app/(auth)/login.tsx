import { View, Text, SafeAreaView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import Heading from '@/components/typography/Heading';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';

const LoginScreen = () => {
  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');
  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar
        title="Login"
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
        titleCenter
      />
    </StandardSafeLayout>
  );
};

export default LoginScreen;
