import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/general/General';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import BannerFolded from '@/components/banner/BannerFolded';
import OwnedStoryBook from '@/components/cards/OwnedStoryBook';
import { Timestamp } from 'firebase/firestore';
import { Story, Subject } from '@/lib/types/curriculum/Curriculum';

const StoryCreateSuccessScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');

  // Params
  const params = useLocalSearchParams();
  const story = JSON.parse(params.story as string) as Story;
  const subject = JSON.parse(params.subject as string) as Subject;

  const handleStartStory = () => {
    if (story.storyId) {
      // Navigate to the story content
      router.dismissAll();
      router.push(`/(app)/(story)/storyQuests?storyId=${story.storyId}` as any);
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
            <OwnedStoryBook
              story={{
                subjectTitle: story.subjectTitle, // Story title (sam as subject title)
                subjectId: story.subjectId,
                level: story.level,
                acquiredAt: Timestamp.now(),
                domainId: subject.domainId,
              }}
            />
            <Text className="text-center font-pixelify text-sm text-gray-300">
              {story.description}
            </Text>
          </View>

          {/* Buttons */}
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

export default StoryCreateSuccessScreen;
