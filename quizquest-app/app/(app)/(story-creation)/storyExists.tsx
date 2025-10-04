import React, { useEffect } from 'react';
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

const StoryExistsScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_smallplanks.png');

  // Params from loadingAiValidate
  const params = useLocalSearchParams();
  const requestedLevel = params.level as AudienceLevel;
  const matchedSubject = JSON.parse(params.matchedSubject as string) as Subject;
  const existingStory = JSON.parse(params.existingStory as string) as Story;

  const handleBuyStory = () => {
    // TODO: Add actual purchase validation and currency checking
    // For now, just navigate to loading screen
    router.push({
      pathname: '/(app)/(story-creation)/loadingStoryAdd' as any,
      params: { storyToAdd: JSON.stringify(existingStory) },
    });
  };

  // useEffect(() => {
  //   console.log('Requested Level:', requestedLevel);
  //   console.log('Matched Subject:', matchedSubject);
  //   console.log('Existing Story:', existingStory);
  // }, [requestedLevel, matchedSubject, existingStory]);

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <View className="flex-1">
        <TopAppBar
          title="Story Found"
          titleSize="large"
          rightButtonIcon="close"
          rightButtonPress={() => router.back()}
          buttonVariant="wood"
        />
        <Text className="mx-4 mt-2 text-center font-pixelify text-lg text-gray-300">
          A story about "{matchedSubject.title}" already exists at {requestedLevel} level.
        </Text>

        <View className="mt-8 flex-1 justify-between">
          <View className="gap-2">
            {/* Story Info Card */}
            <View className="gap-2 rounded-2xl bg-zinc-900/40 p-6">
              <View className="flex-row items-center gap-2">
                <Image source={UI_ICONS.curriculum.subjectBook} className="h-16 w-16" />
                <View>
                  <Text className="text-center font-kenney text-2xl font-bold text-yellow-400">
                    {existingStory.subjectTitle}
                  </Text>
                  <Text className="font-pixelify text-lg text-gray-300">
                    {capitaliseWord(existingStory.level)} Level
                  </Text>
                </View>
              </View>

              <Text className="font-pixelify text-sm text-gray-300">
                {existingStory.description}
              </Text>

              <View className="flex-row items-center gap-2">
                <Text className="font-pixelify text-base text-gray-300">
                  {existingStory.chapterCount} Chapters
                </Text>
                <Text className="font-pixelify text-base text-gray-300">•</Text>
                <Text className="font-pixelify text-base text-gray-300">
                  {existingStory.questionCount} Questions
                </Text>
              </View>
            </View>
            <PrimaryBtn onPress={handleBuyStory} label="Buy Story" />
          </View>

          <View className="mb-6">
            <Text className="text-center font-pixelify text-base text-gray-300">
              Not what you're looking for? Phrase your subject a bit differently and try again.
            </Text>
          </View>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default StoryExistsScreen;
