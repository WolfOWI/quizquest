import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { useLocalSearchParams } from 'expo-router';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';

const QuestResultScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const { subjectSlug, subtopicSlug } = useLocalSearchParams<{
    subjectSlug: string;
    subtopicSlug: string;
  }>();

  const handleBackToStory = () => {
    router.dismissTo({
      pathname: '/(app)/(story)/storyDetail',
      params: { subjectSlug },
    } as any);
  };

  const handleRetryQuest = () => {
    router.dismissTo({
      pathname: '/(app)/(story)/(quest)/questRun',
      params: { subjectSlug, subtopicSlug },
    } as any);
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mx-4">
        <TopAppBar title="Quest Result" titleSize="large" buttonVariant="wood" />
      </View>

      <View className="flex-1 px-4">
        <View className="mb-6 rounded-lg bg-white/10 p-6">
          <Text className="text-center font-pixelify text-xl text-white">Quest Complete!</Text>
          <Text className="mt-2 text-center font-pixelify text-sm text-white/70">
            Subject: {subjectSlug}
          </Text>
          <Text className="text-center font-pixelify text-sm text-white/70">
            Quest: {subtopicSlug}
          </Text>
        </View>

        <View className="gap-3">
          <PrimaryBtn onPress={handleRetryQuest} label="Retry Quest" />
          <PrimaryBtn onPress={handleBackToStory} label="Back to Story" />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default QuestResultScreen;
