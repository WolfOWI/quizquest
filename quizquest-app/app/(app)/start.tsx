import { View, Text } from 'react-native';
import React from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { useAppStore } from '@/lib/state/appStore';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';

const StartScreen = () => {
  const { userDoc, logout, authUser, authStatus } = useAppStore();
  const { spriteRef, playAnimation } = useSpriteAnimation();

  const backgroundImage = require('@/assets/images/backgrounds/start.png');

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
    <StandardSafeLayout bgImage={backgroundImage}>
      <View className="h-32"></View>
      <View className="flex-1 items-center justify-end">
        {/* Character Display */}
        <View className="mb-6 items-center justify-center">
          <Text className="-mb-12 font-kenney text-2xl text-white">{userDoc?.username}</Text>
          <PlayerSprite
            characterId={userDoc?.selections.characterId ?? 'heavyKnight_red'}
            defaultAnimation="idle"
            autoPlay={true}
            spriteRef={spriteRef}
            size={250}
          />
        </View>

        {/* Main Navigation Button */}
        <PrimaryBtn
          label="Start"
          variant="wood"
          onPress={() => router.push('/(app)/(tabs)/stories')}
        />

        {/* Test Button */}
        <PrimaryBtn
          label="Sprite Tests"
          variant="stone"
          onPress={() => router.push('/(app)/spriteTests')}
        />

        {/* Logout Button */}
        <PrimaryBtn label="Logout" variant="stone" onPress={handleLogout} />
      </View>
    </StandardSafeLayout>
  );
};

export default StartScreen;
