import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { Button } from '@/components/ui/button';
import { AudienceLevel } from '@/lib/types/curriculum/Curriculum';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import BannerFolded from '@/components/banner/BannerFolded';
import { capitaliseWord } from '@/lib/utils/textUtils';
import StoryBook from '@/components/cards/StoryBook';
import { Timestamp } from 'firebase/firestore';

const StorySuccessScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');

  // Params
  const params = useLocalSearchParams();
  const subject = params.subject as string;
  const level = params.level as AudienceLevel;
  const selectedTitle = params.selectedTitle as string;
  const selectedSlug = params.selectedSlug as string;
  const selectedDescription = params.selectedDescription as string;

  // TODO: Get actual values from the story
  // Fake values for now
  const subtopics = 3;
  const totalQuestions = 30;

  const handleStartStory = () => {
    // TODO: Navigate to the story content (actual story/quiz screen)
    // For now, navigate back to stories tab
    router.dismissAll();
    router.push('/(app)/(tabs)/stories');
  };

  const handleCreateAnother = () => {
    // Navigate back to the beginning of the flow
    router.dismissAll();
    router.push('/(app)/(story-creation)/topicInput' as any);
  };

  const handleBackToStories = () => {
    router.dismissAll();
    router.push('/(app)/(tabs)/stories');
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="flex-1 gap-8">
        {/* Success Header */}
        <View className="items-center gap-2">
          <BannerFolded text="Story Created" textBottomMargin={24} />
          <Text className="mx-8 text-center font-pixelify text-lg text-gray-300">
            Your personalised quiz story is ready to explore!
          </Text>
        </View>
        <View className="mx-4 flex-1 justify-between">
          {/* Story Details */}

          <View className="items-center gap-4 rounded-2xl bg-zinc-900/40 px-4 pb-6 pt-4">
            <StoryBook
              subject={{
                subjectTitle: selectedTitle,
                subjectSlug: selectedSlug,
                level,
                createdAt: Timestamp.now(),
                source: 'generated',
              }}
            />
            <Text className="text-center font-pixelify text-lg text-gray-300">
              {selectedDescription}
            </Text>
            {/* <Text className="mb-3 text-sm text-gray-300">{selectedDescription}</Text> */}
          </View>

          {/* Buttons */}
          <View className="gap-4">
            <PrimaryBtn onPress={handleStartStory} label="Start Your Story" />

            <Pressable onPress={handleBackToStories} className="py-3">
              <Text className="text-center font-kenney text-xl text-gray-300">Back to Stories</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default StorySuccessScreen;
