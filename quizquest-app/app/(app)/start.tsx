import { View, Text, Pressable } from 'react-native';
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
      {/* Test Button */}
      <PrimaryBtn
        label="Sprite Tests"
        variant="stone"
        onPress={() => router.push('/(app)/spriteTests')}
      />
      <View className="h-32"></View>
      <View className="flex-1 items-center justify-end">
        {/* Character Display */}
        <View className="mb-6 items-center justify-center">
          <Text className="-mb-12 font-kenney text-2xl text-white">{userDoc?.username}</Text>
          <PlayerSprite
            variantId={userDoc?.equipped?.characterId ?? 'heavyKnight_green'}
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
          onPress={() => router.push('/(app)/(tabs)/library' as any)}
        />
        <View className="mt-4 flex flex-row gap-12">
          <Pressable onPress={() => router.push('/(app)/credits')}>
            <View className="items-center justify-center rounded-lg bg-black/30 px-4 py-2">
              <Text
                className="text-center font-kenney text-2xl text-white"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.8)',
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 4,
                }}>
                Credits
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={handleLogout}>
            <View className="items-center justify-center rounded-lg bg-black/30 px-4 py-2">
              <Text
                className="text-center font-kenney text-2xl text-white"
                style={{
                  textShadowColor: 'rgba(0, 0, 0, 0.8)',
                  textShadowOffset: { width: 2, height: 2 },
                  textShadowRadius: 4,
                }}>
                Log Out
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default StartScreen;
