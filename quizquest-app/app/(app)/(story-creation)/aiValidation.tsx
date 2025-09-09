import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/curriculum/Curriculum';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useAppStore } from '@/lib/state/appStore';
import { capitaliseWord } from '@/lib/utils/textUtils';
import Heading from '@/components/typography/Heading';

const AIValidationScreen = () => {
  const backgroundTexture = require('@/assets/textures/chainmail_grey.png');
  const { userDoc } = useAppStore();
  const params = useLocalSearchParams();
  const subject = params.subject as string;
  const level = params.level as AudienceLevel;

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = useMemo(
    () => [
      'Deciphering the runes of your subject',
      'Judging if this lore is fit for challenge',
      'Dusting off old scrolls',
      'Convincing a dragon to fact-check',
      'Arguing with a very stubborn wizard',
      'Ensuring no goblins tampered with your lore',
    ],
    []
  );

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        return (prev + 1) % loadingMessages.length;
      });
    }, 3000); // 3 seconds per message

    // TODO: Setup real AI validation
    // Simulate AI validation process
    const validationTimeout = setTimeout(() => {
      clearInterval(messageInterval);

      // TODO: Add a time out screen
      // Navigate to topic options screen
      router.replace({
        pathname: '/(app)/(story-creation)/topicOptions' as any,
        params: {
          subject,
          level,
          // Fake Options
          options: JSON.stringify([
            {
              title: `${subject} #1`,
              description: `Learn the fundamentals of ${subject} with beginner-friendly questions`,
              slug: `${subject.toLowerCase().replace(/\s+/g, '-')}-#1`,
            },
            {
              title: `${subject} #2`,
              description: `Dive deeper into ${subject} with more challenging content`,
              slug: `${subject.toLowerCase().replace(/\s+/g, '-')}-#2`,
            },
            {
              title: `${subject} #3`,
              description: `Explore how ${subject} applies to everyday situations`,
              slug: `${subject.toLowerCase().replace(/\s+/g, '-')}-#3`,
            },
          ]),
        },
      });
    }, 4000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(validationTimeout);
    };
  }, [subject, level, loadingMessages]);

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <View className="flex-1 items-center justify-center">
        <View className="mb-8 items-center">
          <PlayerSprite
            key={userDoc?.selections.characterId}
            characterId={userDoc?.selections.characterId ?? 'heavyKnight_blue'}
            defaultAnimation="rest"
            autoPlay={true}
            size={250}
            styles={{
              marginBottom: 16,
            }}
          />
          <Heading>Reviewing Thy Request</Heading>
          <Text className="font-pixelify text-center text-lg text-gray-300">
            {subject} • {capitaliseWord(level)} Level
          </Text>
        </View>

        <View className="h-32 items-center">
          <View className="flex-row items-center rounded-lg bg-zinc-800/50 p-4">
            <Text className="font-pixelify text-center text-lg text-white">
              {loadingMessages[currentMessageIndex]}
            </Text>
          </View>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default AIValidationScreen;
