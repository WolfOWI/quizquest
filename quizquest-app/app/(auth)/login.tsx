import { View, Text, SafeAreaView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import Heading from '@/components/typography/Heading';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';

const LoginScreen = () => {
  const backgroundTexture = require('@/assets/textures/texture-16.png');
  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar title="Login" pretitle="Login" titleCenter />
      <TopAppBar title="Login" />
      <TopAppBar title="Login" leftButtonIcon="back" pretitle="Create a" titleCenter />
      <TopAppBar title="Login" leftButtonIcon="back" />
      <TopAppBar title="Login" rightButtonIcon="close" pretitle="Login" titleCenter />
      <TopAppBar title="Login" rightButtonIcon="close" />
      <TopAppBar title="Login" leftButtonIcon="back" rightButtonIcon="close" />
    </StandardSafeLayout>
  );
};

export default LoginScreen;
