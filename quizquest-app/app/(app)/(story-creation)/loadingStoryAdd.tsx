import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/general/General';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useAppStore } from '@/lib/state/appStore';
import { capitaliseWord } from '@/lib/utils/textUtils';
import Heading from '@/components/typography/Heading';
import { Story } from '@/lib/types/curriculum/Curriculum';
import { addStoryToUserOwnedStories, checkUserOwnsStory } from '@/services/userStoryServices';

const LoadingStoryAddScreen = () => {
  const backgroundTexture = require('@/assets/textures/chainmail_grey.png');
  const { userDoc } = useAppStore();

  // Parameters from subjectLevelsExists or storyExists screens
  const params = useLocalSearchParams();
  const storyToAdd = JSON.parse(params.storyToAdd as string) as Story;

  const [isAdding, setIsAdding] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = useMemo(
    () => [
      'Adding story to your collection',
      'Processing your purchase',
      'Unlocking new adventures',
      'Preparing your story library',
      'Almost ready to explore',
      'Finalising your new story',
    ],
    []
  );

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        return (prev + 1) % loadingMessages.length;
      });
    }, 3000); // 3 seconds per message

    const performStoryAdd = async () => {
      try {
        // If user isn't logged in
        if (!userDoc) {
          console.error('User not logged in');
          router.replace('/(app)/(auth)/welcome' as any);
          return;
        }

        // console.log('Adding story to user collection:', {
        //   storyId: storyToAdd.storyId,
        //   storyTitle: storyToAdd.subjectTitle,
        //   level: storyToAdd.level,
        //   subject: storyToAdd.subjectTitle,
        //   userId: userDoc.uid,
        // });

        // First check if user owns the story
        const userOwnsStory = await checkUserOwnsStory(userDoc.uid, storyToAdd.storyId as string);
        if (userOwnsStory) {
          console.log('User already owns story, skipping addition');
          return;
        }

        // Add the story to user's ownedStories
        await addStoryToUserOwnedStories(userDoc.uid, storyToAdd);

        // TODO: Update user's currency

        // Navigate to success screen
        router.replace({
          pathname: '/(app)/(story-creation)/storyAddSuccess' as any,
          params: {
            storyToAdd: JSON.stringify(storyToAdd),
          },
        });
      } catch (error) {
        console.error('Error adding story to collection:', error);
        // TODO: Handle error - maybe show error screen or retry option
        router.back();
      } finally {
        setIsAdding(false);
        clearInterval(messageInterval);
      }
    };

    performStoryAdd();

    return () => {
      clearInterval(messageInterval);
    };
  }, [storyToAdd, userDoc?.uid]);

  const handleTempNavigateToSuccess = () => {
    router.replace({
      pathname: '/(app)/(story-creation)/storyAddSuccess' as any,
      params: {
        storyToAdd: JSON.stringify(storyToAdd),
      },
    });
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <View className="flex-1 items-center justify-center">
        <View className="mb-8 items-center">
          <PlayerSprite
            key={userDoc?.equipped?.characterId}
            variantId={userDoc?.equipped?.characterId ?? 'heavyKnight_blue'}
            defaultAnimation="walk"
            autoPlay={true}
            size={250}
            styles={{
              marginBottom: 16,
            }}
          />
          <Heading>Adding Story</Heading>
          <Text className="text-center font-pixelify text-lg text-gray-300">
            {storyToAdd.subjectTitle} • {capitaliseWord(storyToAdd.level)} Level
          </Text>
        </View>

        <View className="h-32 items-center">
          <View className="flex-row items-center rounded-lg bg-zinc-800/50 p-4">
            <Text className="text-center font-pixelify text-lg text-white">
              {loadingMessages[currentMessageIndex]}
            </Text>
          </View>
        </View>

        {/* Temporary button for testing */}
        <View className="mt-8">
          <Pressable
            onPress={handleTempNavigateToSuccess}
            className="rounded-lg bg-yellow-400/20 px-6 py-3">
            <Text className="text-center font-pixelify text-lg text-yellow-400">
              Temp: Go to Success
            </Text>
          </Pressable>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default LoadingStoryAddScreen;
