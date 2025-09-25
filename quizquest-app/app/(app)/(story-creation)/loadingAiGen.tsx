import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/general/General';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useAppStore } from '@/lib/state/appStore';
import { capitaliseWord } from '@/lib/utils/textUtils';
import Heading from '@/components/typography/Heading';

const LoadingAiGenScreen = () => {
  const backgroundTexture = require('@/assets/textures/chainmail_grey.png');
  const { userDoc } = useAppStore();
  const params = useLocalSearchParams();
  const subject = params.subject as string;
  const level = params.level as AudienceLevel;
  const selectedTitle = params.selectedTitle as string;
  const selectedSlug = params.selectedSlug as string;
  const selectedDescription = params.selectedDescription as string;

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = useMemo(
    () => [
      'Crafting your educational tale',
      'Summoning quiz questions from the void',
      'Weaving knowledge into adventure',
      'Consulting ancient scrolls of wisdom',
      'Polishing your story to perfection',
      'Ensuring every question teaches something new',
    ],
    []
  );

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        return (prev + 1) % loadingMessages.length;
      });
    }, 3000); // 3 seconds per message

    // TODO: Setup real content generation
    // Simulate content generation process
    const generationTimeout = setTimeout(() => {
      clearInterval(messageInterval);

      router.replace({
        pathname: '/(app)/(story-creation)/storyCreateSuccess' as any,
        params: {
          subject,
          level,
          selectedTitle,
          selectedSlug,
          selectedDescription,
        },
      });
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(generationTimeout);
    };
  }, [subject, level, selectedTitle, selectedSlug, selectedDescription, loadingMessages]);

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
          <Heading>Crafting Your Story</Heading>
          <Text className="text-center font-pixelify text-lg text-gray-300">
            {selectedTitle} • {capitaliseWord(level)} Level
          </Text>
        </View>

        <View className="h-32 items-center">
          <View className="flex-row items-center rounded-lg bg-zinc-800/50 p-4">
            <Text className="text-center font-pixelify text-lg text-white">
              {loadingMessages[currentMessageIndex]}
            </Text>
          </View>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default LoadingAiGenScreen;
