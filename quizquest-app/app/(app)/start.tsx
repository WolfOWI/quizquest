import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import Heading from '@/components/typography/Heading';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { useAppStore } from '@/lib/state/appStore';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';

const StartScreen = () => {
  const { userDoc, logout, authUser, authStatus } = useAppStore();
  const { spriteRef, playAnimation } = useSpriteAnimation();

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
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-semibold">Loading Start...</Text>
      </View>
    );
  }

  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar title="Start" titleCenter />
      <View className="flex-1 items-center justify-center">
        <Text className="mb-4 text-xl text-white">Hello {userDoc?.username}!</Text>
        <Text className="mb-4 text-lg text-white">
          Your character is {userDoc?.selections.characterId}
        </Text>

        {/* Character Display */}
        <View className="mb-6">
          <PlayerSprite
            characterId={userDoc?.selections.characterId ?? 'heavyKnight_red'}
            defaultAnimation="idle"
            autoPlay={true}
            spriteRef={spriteRef}
          />
        </View>

        {/* Test Button */}
        <PrimaryBtn
          label="Test Player Sprites"
          variant="wood"
          onPress={() => router.push('/(app)/playerSpriteTest')}
        />

        {/* Logout Button */}
        <PrimaryBtn label="Logout" variant="stone" onPress={handleLogout} />
      </View>
    </StandardSafeLayout>
  );
};

export default StartScreen;
