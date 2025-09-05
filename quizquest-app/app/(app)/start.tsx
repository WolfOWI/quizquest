import { View, Text, SafeAreaView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import Heading from '@/components/typography/Heading';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { useAppStore } from '@/lib/state/appStore';

const StartScreen = () => {
  const { userDoc, logout, authUser, authStatus } = useAppStore();

  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!userDoc) {
    // TODO: Add proper loading screen
    return (
      <View className="flex-1 items-center justify-center bg-slate-200">
        <Text className="text-lg font-semibold">Loading Start...</Text>
      </View>
    );
  }

  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar title="Start" titleCenter />
      <View className="flex-1 items-center justify-center bg-slate-200">
        <Text className="mb-4 text-xl">Hello {userDoc?.username}!</Text>
        <PrimaryBtn label="Logout" variant="stone" onPress={handleLogout} />
      </View>
    </StandardSafeLayout>
  );
};

export default StartScreen;
