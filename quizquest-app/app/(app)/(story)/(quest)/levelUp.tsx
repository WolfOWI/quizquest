import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { useLocalSearchParams } from 'expo-router';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { UserChapterProgress } from '@/lib/types/user/User';
import { Chapter } from '@/lib/types/curriculum/Curriculum';
import Heading from '@/components/typography/Heading';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';
import { useAppStore } from '@/lib/state/appStore';

const LevelUpScreen = () => {
  const { userDoc } = useAppStore();
  const { spriteRef } = useSpriteAnimation();
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const params = useLocalSearchParams();
  const chapterAndProgress = JSON.parse(params.chapterAndProgress as string) as Chapter &
    UserChapterProgress;

  const handleContinue = () => {
    // TODO: Continue either to replaying quest or back to story (based on choice on questVictory)
    router.dismissTo({
      pathname: '/(app)/(tabs)/library',
      params: { chapterAndProgress: JSON.stringify(chapterAndProgress) },
    } as any);
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4}>
      <View className="flex-1 justify-between">
        <View className="mt-8 items-center gap-2">
          <PlayerSprite
            variantId={userDoc?.equipped?.characterId ?? 'heavyKnight_green'}
            defaultAnimation="jump"
            autoPlay={true}
            spriteRef={spriteRef}
          />
          <Heading size="large" className="mt-2">
            Level Up!
          </Heading>
          <Text className="mt-2 text-center font-kenney text-base text-white/70">
            Congrats! You have reached level 123!
          </Text>
          <View className="mt-8 w-full flex-col items-center gap-2">
            <Text className="mt-2 text-center font-kenney text-2xl text-white/70">Level 123</Text>
            <View className="h-4 w-full rounded-full bg-neutral-900">
              <View className="h-full w-1/2 rounded-full bg-cyan-600" />
            </View>
            <View className="w-full flex-row items-center justify-between">
              <Text className="font-kenney text-base text-white/70">123 XP</Text>
              <Text className="font-kenney text-base text-white/70">456 XP</Text>
            </View>
          </View>
        </View>

        <View className="gap-3">
          <PrimaryBtn onPress={handleContinue} label="Continue" />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default LevelUpScreen;
