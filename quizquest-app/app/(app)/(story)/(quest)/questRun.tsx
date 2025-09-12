import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { useLocalSearchParams } from 'expo-router';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';

const QuestRunScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const { subjectSlug, subtopicSlug } = useLocalSearchParams<{
    subjectSlug: string;
    subtopicSlug: string;
  }>();

  const handleCompleteQuest = () => {
    router.push({
      pathname: '/(app)/(story)/(quest)/questResult',
      params: { subjectSlug, subtopicSlug },
    } as any);
  };

  const handleQuitQuest = () => {
    router.back();
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mx-4">
        <TopAppBar
          rightButtonIcon="close"
          rightButtonPress={handleQuitQuest}
          title="Quest Run"
          titleSize="large"
          buttonVariant="wood"
        />
      </View>

      <View className="flex-1 px-4">
        <View className="mb-6 rounded-lg bg-white/10 p-6">
          <Text className="text-center font-pixelify text-xl text-white">Quest Run Screen</Text>
          <Text className="mt-2 text-center font-pixelify text-sm text-white/70">
            Subject: {subjectSlug}
          </Text>
          <Text className="text-center font-pixelify text-sm text-white/70">
            Quest: {subtopicSlug}
          </Text>
        </View>

        <PrimaryBtn onPress={handleCompleteQuest} label="Complete Quest" />
      </View>
    </StandardSafeLayout>
  );
};

export default QuestRunScreen;
