import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { useLocalSearchParams } from 'expo-router';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import BannerFolded from '@/components/banner/BannerFolded';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import IconStat from '@/components/counters/IconStat';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import Heading from '@/components/typography/Heading';
import { Chapter } from '@/lib/types/curriculum/Curriculum';
import { UserChapterProgress } from '@/lib/types/user/User';

const QuestDefeatScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const params = useLocalSearchParams();
  const chapterAndProgress = JSON.parse(params.chapterAndProgress as string) as Chapter &
    UserChapterProgress;

  const handleBackToStory = () => {
    // TODO: Open modal to confirm back to story
    router.dismissTo({
      pathname: '/(app)/(tabs)/library',
      params: { chapterAndProgress: JSON.stringify(chapterAndProgress) },
    } as any);
  };

  const handleRetryQuest = () => {
    // TODO: Retry quest (refresh the quest)
    router.dismissTo({
      pathname: '/(app)/(story)/(quest)/questRun',
      params: { chapterAndProgress: JSON.stringify(chapterAndProgress) },
    } as any);
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mt-4 items-center">
        <Image source={UI_ICONS.result.defeat} className="h-24 w-24" />
        <Heading size="large" className="mt-2">
          You Died
        </Heading>
      </View>
      <View className="flex-1 px-4">
        {/* Quest performance rating */}
        <View className="flex-row items-center justify-center gap-2">
          <Image source={UI_ICONS.stats.star_grey} className="h-12 w-12" />
          <Image source={UI_ICONS.stats.star_grey} className="h-12 w-12" />
          <Image source={UI_ICONS.stats.star_grey} className="h-12 w-12" />
        </View>
        <View className="mt-4 items-center px-2">
          <Text className="text-center font-kenney text-base text-white/70">
            Don't give up! Try again to improve your knowledge and skills.
          </Text>
        </View>

        <View className="mt-4 flex-row justify-between rounded-xl bg-white/20 p-4">
          <IconStat uiIcon={UI_ICONS.stats.slain} numStat={0} label="Slain" className="w-1/3" />
          <IconStat strStat={'--:--'} label="Duration" className="w-1/3" />
          <IconStat
            uiIcon={UI_ICONS.stats.deaths}
            numStat={0}
            label="Dmg Dealt"
            className="w-1/3"
          />
        </View>

        <View className="mt-4 flex-col gap-3">
          <View className="flex-row items-center justify-center">
            <Text className="font-kenney text-2xl text-white">+0</Text>
            <Image source={UI_ICONS.currency.gold} className="h-12 w-12" />
            <Text className="font-kenney text-2xl text-white"> Coins</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <Text className="font-kenney text-2xl text-white">+0</Text>
            <Image source={UI_ICONS.currency.xp} className="h-12 w-12" />
            <Text className="font-kenney text-2xl text-white"> XP</Text>
          </View>
        </View>

        <View className="mt-4 flex-col items-center gap-3">
          <PrimaryBtn onPress={handleRetryQuest} label="Retry" />
          <PrimaryBtn onPress={handleBackToStory} label="Back to Story" />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default QuestDefeatScreen;
