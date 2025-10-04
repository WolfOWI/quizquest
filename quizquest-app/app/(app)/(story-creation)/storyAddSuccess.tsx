import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/general/General';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import BannerFolded from '@/components/banner/BannerFolded';
import OwnedStoryBook from '@/components/cards/OwnedStoryBook';
import { capitaliseWord } from '@/lib/utils/textUtils';
import { getDifficultyIcon } from '@/lib/constants/uiIcons';
import { Story } from '@/lib/types/curriculum/Curriculum';
import { Timestamp } from 'firebase/firestore';

const StoryAddSuccessScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');

  // Params from loadingStoryAdd screen
  const params = useLocalSearchParams();
  const storyToAdd = JSON.parse(params.storyToAdd as string) as Story;

  const handleStartStory = () => {
    if (storyToAdd.storyId) {
      // Navigate to the story content
      router.dismissAll();
      router.push(`/(app)/(story)/storyQuests?storyId=${storyToAdd.storyId}` as any);
    } else {
      // Fallback to library if no storyId
      router.dismissAll();
      router.push('/(app)/(tabs)/library' as any);
    }
  };

  const handleBackToLibrary = () => {
    router.dismissAll();
    router.push('/(app)/(tabs)/library' as any);
  };

  const handleCreateMoreStories = () => {
    router.dismissAll();
    router.push('/(app)/(story-creation)/subjectInput' as any);
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="flex-1 gap-8">
        {/* Success Header */}
        <View className="items-center gap-2">
          <BannerFolded text="Story Added" textBottomMargin={24} />
          <Text className="mx-8 text-center font-pixelify text-lg text-gray-300">
            Your new story has been added to your collection!
          </Text>
        </View>

        <View className="mx-4 flex-1 justify-between">
          {/* Story Details */}
          <View className="items-center gap-4 rounded-2xl bg-zinc-900/40 px-4 pb-6 pt-4">
            <OwnedStoryBook
              story={{
                subjectTitle: storyToAdd.subjectTitle,
                subjectId: storyToAdd.subjectId,
                level: storyToAdd.level,
                acquiredAt: Timestamp.now(),
                domainId: storyToAdd.subjectId.split(':')[0], // Extract domain from subjectId
              }}
            />
            <Text className="text-center font-pixelify text-sm text-gray-300">
              {storyToAdd.description}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-4">
            <PrimaryBtn onPress={handleStartStory} label="Start Your Story" />

            <Pressable onPress={handleBackToLibrary} className="py-3">
              <Text className="text-center font-kenney text-xl text-gray-300">Back to Library</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default StoryAddSuccessScreen;
