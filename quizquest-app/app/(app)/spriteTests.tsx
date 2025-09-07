import { View } from 'react-native';
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
  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');

  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar
        title="Sprite Tests"
        titleCenter
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
      />
      <View className="flex-1 items-center justify-center">
        {/* Test Button */}
        <PrimaryBtn
          label="Test Player Sprites"
          variant="wood"
          onPress={() => router.push('/(app)/playerSpriteTest')}
        />

        <PrimaryBtn
          label="Test Enemy Sprites"
          variant="wood"
          onPress={() => router.push('/(app)/enemySpriteTest' as any)}
        />
      </View>
    </StandardSafeLayout>
  );
};

export default StartScreen;
