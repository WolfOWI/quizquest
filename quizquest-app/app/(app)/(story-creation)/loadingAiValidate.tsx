import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { AudienceLevel } from '@/lib/types/general/General';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useAppStore } from '@/lib/state/appStore';
import { capitaliseWord } from '@/lib/utils/textUtils';
import Heading from '@/components/typography/Heading';
import { validateSubject } from '@/services/aiValidateService';
import { getContentRegistry } from '@/lib/content';
import { getSubjectById, getSubjectsDocIds } from '@/services/curriculumServices';
import { Subject } from '@/lib/types/curriculum/Curriculum';

const LoadingAiValidateScreen = () => {
  const backgroundTexture = require('@/assets/textures/chainmail_grey.png');
  const { userDoc } = useAppStore();
  const params = useLocalSearchParams();
  const subject = params.subject as string;
  const level = params.level as AudienceLevel;

  const [isValidating, setIsValidating] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const loadingMessages = useMemo(
    () => [
      'Deciphering the runes of your subject',
      'Judging if this lore is fit for challenge',
      'Checking the ancient archives',
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

    const performValidation = async () => {
      try {
        const aiRes = await validateSubject(subject, level);
        console.log('AI Validation Response:', aiRes);

        clearInterval(messageInterval);
        setIsValidating(false);

        // Matched subject (storyExists or subjectLevelsExists screens)
        if (aiRes.subjectMatches) {
          console.log(`AI detected ${aiRes.matchedSubjectId} as a matched subject`);
          try {
            // Verify if the matched subject actually exists
            const matchedSubject: Subject = await getSubjectById(aiRes.matchedSubjectId as string);
            console.log('Matched Subject:', matchedSubject);

            // Does the matched subject have any levels available?
            if (matchedSubject.levelsAvailable.length > 0) {
              if (matchedSubject.levelsAvailable.includes(level)) {
                console.log(
                  `The matched subject already has a story at the requested level: ${level}`
                );
                router.replace({
                  pathname: '/(app)/(story-creation)/storyExists' as any,
                  params: { subject, level, matchedSubject: JSON.stringify(matchedSubject) },
                });
              } else {
                console.log(
                  `The matched subject has ${matchedSubject.levelsAvailable.length} level(s) available, but the requested level: ${level} is not one of them`
                );
                router.replace({
                  pathname: '/(app)/(story-creation)/subjectLevelsExists' as any,
                  params: { subject, level, matchedSubject: JSON.stringify(matchedSubject) },
                });
              }
            }
          } catch (error) {
            console.error("Couldn't find the matched subject according to AI response:", error);
            // TODO: Navigate to error state
            router.replace({
              pathname: '/(app)/(story-creation)/subjectInput' as any,
            });
          }
        } else if (aiRes.subjectOptions) {
          // AI didn't match a subject, so it returned subject options
          router.replace({
            pathname: '/(app)/(story-creation)/storyOptions' as any,
            params: { subject, level, aiResponse: JSON.stringify(aiRes) },
          });
        } else {
          console.log(
            "Something went wrong with AI validation, as it didn't return a matched subject or subject options"
          );
        }
      } catch (error) {
        console.error('AI: Error validating subject:', error);
        clearInterval(messageInterval);
        setIsValidating(false);

        // TODO: Navigate to error state
        router.replace({
          pathname: '/(app)/(story-creation)/subjectInput' as any,
        });
      }
    };

    // Start validation after a short delay
    const validationTimeout = setTimeout(performValidation, 500);

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
            key={userDoc?.equipped?.characterId}
            variantId={userDoc?.equipped?.characterId ?? 'heavyKnight_blue'}
            defaultAnimation="rest"
            autoPlay={true}
            size={250}
            styles={{
              marginBottom: 16,
            }}
          />
          <Heading>Reviewing Thy Request</Heading>
          <Text className="text-center font-pixelify text-lg text-gray-300">
            {subject} • {capitaliseWord(level)} Level
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

export default LoadingAiValidateScreen;
