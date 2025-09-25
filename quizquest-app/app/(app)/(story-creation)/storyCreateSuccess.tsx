import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/general/General';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import BannerFolded from '@/components/banner/BannerFolded';
import OwnedStoryBook from '@/components/cards/OwnedStoryBook';
import { Timestamp } from 'firebase/firestore';

const StoryCreateSuccessScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');

  // Params
  const params = useLocalSearchParams();
  const subject = params.subject as string;
  const level = params.level as AudienceLevel;
  const selectedTitle = params.selectedTitle as string;
  const selectedSlug = params.selectedSlug as string;
  const selectedDescription = params.selectedDescription as string;

  const handleStartStory = () => {
    // TODO: Navigate to the story content (actual story/quiz screen)
    // For now, navigate back to library tab
    router.dismissAll();
    router.push('/(app)/(tabs)/library' as any);
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
                subjectTitle: selectedTitle,
                subjectId: subject,
                level,
                acquiredAt: Timestamp.now(),
                domainId: 'animal',
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
