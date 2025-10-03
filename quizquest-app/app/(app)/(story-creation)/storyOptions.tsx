import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { AudienceLevel } from '@/lib/types/general/General';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { getDifficultyIcon } from '@/lib/constants/uiIcons';
import { ValidationResponse } from '@/lib/ai/subjectValidation';
import { getDomain } from '@/lib/content';
import { unslugify } from '@/lib/utils/textUtils';

const StoryOptionsScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_smallplanks.png');

  // Params from loadingAiValidate
  const params = useLocalSearchParams();
  const userInputtedSubject = params.subject as string;
  const userInputtedLevel = params.level as AudienceLevel;
  const aiResponse = JSON.parse(params.aiResponse as string) as ValidationResponse;

  // AI Response details
  const isSubjectValid = aiResponse.isValid;
  const validityReason = aiResponse.validityReason;
  const subjectOptions: ValidationResponse['subjectOptions'] = aiResponse.subjectOptions;

  const [selectedOption, setSelectedOption] = useState<
    NonNullable<ValidationResponse['subjectOptions']>[0] | null
  >(null);

  const handleContinue = () => {
    if (!selectedOption) {
      return; // Do nothing
    }

    console.log('Selected Option:', selectedOption);
    // TODO: Implement story generation
    router.push({
      pathname: '/(app)/(story-creation)/loadingAiGen' as any,
      params: {
        selectedSubject: selectedOption.toString(),
        selectedLevel: userInputtedLevel,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <TopAppBar
        title="Choose Your Story"
        rightButtonIcon="close"
        rightButtonPress={() => router.back()}
        buttonVariant="wood"
      />

      <View className="flex-1 gap-8">
        {/* Top Text Section */}
        <View className="mb-6">
          {!subjectOptions ? (
            <>
              {/* Error State */}
              <Text className="mb-2 font-kenney text-2xl font-bold text-red-400">
                Something Went Wrong
              </Text>
              <Text className="font-pixelify text-base text-gray-300">
                No story options available. Please try again.
              </Text>
            </>
          ) : isSubjectValid === true ? (
            <>
              {/* Valid Subject Matter */}
              <Text className="mb-2 font-kenney text-2xl font-bold text-white">
                A Noble Choice!
              </Text>
              <Text className="font-pixelify text-base text-gray-300">
                The guild has prepared three scrolls of "{userInputtedSubject}" at{' '}
                {userInputtedLevel} rank. Choose wisely, for only one shall be thine.
              </Text>
              {/* TODO: Just temp for AI testing */}
              {validityReason && (
                <Text className="mt-2 font-pixelify text-sm text-green-300">{validityReason}</Text>
              )}
            </>
          ) : (
            <>
              {/* Invalid Subject Matter */}
              <Text className="mb-2 font-kenney text-2xl font-bold text-white">
                Unworthy Subject
              </Text>
              <Text className="font-pixelify text-base text-gray-300">
                "{userInputtedSubject}"? A strange jest indeed. The guild refuses to waste ink...
                Try one of these {userInputtedLevel} quests instead.
              </Text>
              {/* TODO: Just temp for AI testing */}
              {validityReason && (
                <Text className="mt-2 font-pixelify text-sm text-yellow-300">{validityReason}</Text>
              )}
            </>
          )}
        </View>

        {/* Subject Options Section */}
        {subjectOptions ? (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="gap-2">
              {subjectOptions.map((option) => (
                <Pressable
                  key={option.slug}
                  onPress={() => setSelectedOption(option)}
                  className={`rounded-lg border-2 p-4 ${
                    selectedOption?.slug === option.slug
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-transparent bg-white/5'
                  }`}>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="font-pixelifySemibold text-lg text-white">
                        {unslugify(option.slug)}
                      </Text>
                      <Text className="font-pixelify text-sm text-gray-300">
                        {getDomain(option.domainId).title}
                      </Text>
                      <Text className="font-pixelify text-sm text-gray-300">
                        {option.description}
                      </Text>
                    </View>
                    <View
                      className={`h-8 w-8 items-center justify-center rounded-full ${
                        selectedOption?.slug === option.slug && 'bg-zinc-900/70'
                      }`}>
                      <Image
                        source={getDifficultyIcon(userInputtedLevel)}
                        className={`${
                          selectedOption?.slug === option.slug
                            ? 'h-8 w-8 opacity-100'
                            : 'h-6 w-6 opacity-25'
                        }`}
                      />
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        ) : (
          <>
            {/* TODO: Just temp for AI testing */}
            <Text className="mt-2 font-pixelify text-sm text-red-300">
              No subject options available. Please try again.
            </Text>
          </>
        )}

        {/* TODO: Add cost in gems / currency - for generating a story */}

        {/* Bottom Buttons Section */}
        <View className="mt-auto gap-2">
          <PrimaryBtn onPress={handleBack} label="Back" />
          <PrimaryBtn
            onPress={handleContinue}
            label={selectedOption ? 'Create Story' : 'Select an Option'}
            disabled={!selectedOption}
          />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default StoryOptionsScreen;
