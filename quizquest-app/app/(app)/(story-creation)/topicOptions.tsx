import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { AudienceLevel } from '@/lib/types/curriculum/Curriculum';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { getDifficultyIcon } from '@/lib/utils/iconUtils';

interface TopicOption {
  title: string;
  description: string;
  slug: string;
}

const TopicOptionsScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_smallplanks.png');
  const params = useLocalSearchParams();
  const subject = params.subject as string;
  const level = params.level as AudienceLevel;
  const isValid = params.isValid as string;
  const optionsParam = params.options as string;

  const [selectedOption, setSelectedOption] = useState<TopicOption | null>(null);

  const options: TopicOption[] = optionsParam ? JSON.parse(optionsParam) : [];

  const handleContinue = () => {
    if (!selectedOption) {
      return;
    }

    router.push({
      pathname: '/(app)/(story-creation)/contentGeneration' as any,
      params: {
        subject,
        level,
        selectedTitle: selectedOption.title,
        selectedSlug: selectedOption.slug,
        selectedDescription: selectedOption.description,
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
        <View className="mb-6">
          {isValid == 'true' ? (
            <>
              {/* Valid Topic */}
              <Text className="mb-2 font-kenney text-2xl font-bold text-white">
                A Noble Choice!
              </Text>
              <Text className="font-pixelify text-base text-gray-300">
                The guild has prepared three scrolls of "{subject}" at {level} rank. Choose wisely,
                for only one shall be thine.
              </Text>
            </>
          ) : (
            <>
              {/* Invalid Topic */}
              <Text className="mb-2 font-kenney text-2xl font-bold text-white">
                Unworthy Subject
              </Text>
              <Text className="font-pixelify text-base text-gray-300">
                "{subject}"? A strange jest indeed. The guild refuses to waste ink... Try one of
                these {level} quests instead.
              </Text>
            </>
          )}
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-2">
            {options.map((option, index) => (
              <TouchableOpacity
                key={option.slug}
                onPress={() => setSelectedOption(option)}
                className={`rounded-lg border-2 p-4 ${
                  selectedOption?.slug === option.slug
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-transparent bg-white/5'
                }`}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="font-pixelifySemibold text-lg text-white">{option.title}</Text>
                    <Text className="font-pixelify text-sm text-gray-300">
                      {option.description}
                    </Text>
                  </View>
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-full ${
                      selectedOption?.slug === option.slug && 'bg-zinc-900/70'
                    }`}>
                    <Image
                      source={getDifficultyIcon(level)}
                      className={`${
                        selectedOption?.slug === option.slug
                          ? 'h-8 w-8 opacity-100'
                          : 'h-6 w-6 opacity-25'
                      }`}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

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

export default TopicOptionsScreen;
