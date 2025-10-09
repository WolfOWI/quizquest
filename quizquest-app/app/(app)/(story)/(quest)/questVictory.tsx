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
import { Chapter, Story } from '@/lib/types/curriculum/Curriculum';
import { UserChapterProgress } from '@/lib/types/user/User';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';

const QuestVictoryScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const params = useLocalSearchParams();
  const chapterAndProgress = JSON.parse(params.chapterAndProgress as string) as Chapter &
    UserChapterProgress;
  const story = JSON.parse(params.story as string) as Story;

  const handleBackToStory = () => {
    // TODO: Back to story (open modal)
    // For now, just go back to library

    router.dismissTo('/(app)/(tabs)/library' as any);

    // router.dismissTo({
    //   pathname: '/(app)/(story)/storyQuests',
    //   params: {  },
    // } as any);
  };

  const handleRetryQuest = () => {
    // TODO: Retry quest (refresh the quest)
    router.dismissTo({
      pathname: '/(app)/(story)/(quest)/questRun',
      params: {
        story: JSON.stringify(story),
        chapterAndProgress: JSON.stringify(chapterAndProgress),
      },
    } as any);
  };

  const handleLevelUp = () => {
    router.push({
      pathname: '/(app)/(story)/(quest)/levelUp',
      params: { chapterAndProgress: JSON.stringify(chapterAndProgress) },
    } as any);
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <BannerFolded text="Victory!" textBottomMargin={24} />
      <View className="flex-1 px-4">
        {/* TODO: Rating based on correct answer percentage */}
        <View className="flex-row items-center justify-center gap-2">
          <Image source={UI_ICONS.stats.star_gold} className="h-12 w-12" />
          <Image source={UI_ICONS.stats.star_gold} className="h-12 w-12" />
          <Image source={UI_ICONS.stats.star_grey} className="h-12 w-12" />
        </View>
        <Text className="text-center font-kenney text-base text-white">16 out of 20</Text>
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
            <Text className="font-kenney text-2xl text-white">+123</Text>
            <Image source={UI_ICONS.currency.gold} className="h-12 w-12" />
            <Text className="font-kenney text-2xl text-white"> Coins</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <Text className="font-kenney text-2xl text-white">+123</Text>
            <Image source={UI_ICONS.currency.xp} className="h-12 w-12" />
            <Text className="font-kenney text-2xl text-white"> XP</Text>
          </View>
        </View>

        <View className="mt-4 flex-col items-center gap-3">
          {/* TODO: Delete button later */}
          <PrimaryBtn onPress={handleLevelUp} label="Level Up (Temp)" />
          <SquareBtn icon="replay" onPress={handleRetryQuest} />
          <PrimaryBtn onPress={handleBackToStory} label="Back to Story" />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default QuestVictoryScreen;
