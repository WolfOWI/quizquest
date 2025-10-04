import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import Heading from '@/components/typography/Heading';
import Subheading from '@/components/typography/Subheading';
import { AudienceLevel } from '@/lib/types/general/General';
import { capitaliseWord } from '@/lib/utils/textUtils';
import { getDifficultyIcon, UI_ICONS } from '@/lib/constants/uiIcons';
import { Story, Subject } from '@/lib/types/curriculum/Curriculum';
import TopAppBar from '@/components/navigation/TopAppBar';

const StoryAlreadyOwnedScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_smallplanks.png');

  // Params from loadingAiValidate
  const params = useLocalSearchParams();
  const requestedLevel = params.level as AudienceLevel;
  const matchedSubject = JSON.parse(params.matchedSubject as string) as Subject;
  const existingStory = JSON.parse(params.existingStory as string) as Story;

  const handleGoToStory = () => {
    // Navigate to the story quests screen
    router.push({
      pathname: '/(app)/(story)/storyQuests' as any,
      params: {
        storyId: existingStory.storyId,
      },
    });
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <View className="flex-1">
        <TopAppBar
          rightButtonIcon="close"
          rightButtonPress={() => router.back()}
          buttonVariant="wood"
        />

        <View className="flex-1 justify-center">
          <View className="mb-8 items-center">
            <Image source={UI_ICONS.curriculum.subjectBook} className="mb-4 h-24 w-24" />
            <Heading size="large" className="mb-2 text-center text-white">
              You Already Own This Story!
            </Heading>
            <Text className="mb-4 text-center font-pixelify text-lg text-gray-300">
              "{matchedSubject.title}" at {capitaliseWord(requestedLevel)} level is already in your
              library.
            </Text>
          </View>

          <PrimaryBtn onPress={handleGoToStory} label="View Story" variant="wood" />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default StoryAlreadyOwnedScreen;
