import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import Heading from '@/components/typography/Heading';
import Subheading from '@/components/typography/Subheading';
import { AudienceLevel } from '@/lib/types/general/General';
import { capitaliseWord } from '@/lib/utils/textUtils';
import { getDifficultyIcon, UI_ICONS } from '@/lib/constants/uiIcons';
import { Story, Subject } from '@/lib/types/curriculum/Curriculum';
import TopAppBar from '@/components/navigation/TopAppBar';
import BuySingleStoryModal from '@/components/modals/BuySingleStoryModal';

const SubjectLevelsExistsScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');

  // Params from loadingAiValidate
  const params = useLocalSearchParams();
  const requestedLevel = params.level as AudienceLevel;
  const matchedSubject = JSON.parse(params.matchedSubject as string) as Subject;
  const existingStories = JSON.parse(params.existingStories as string) as Story[];

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // TODO: Replace with actual user currency
  const userGems = 16;
  const userGold = 1004;

  const handleCreateNewLevel = () => {
    router.replace({
      pathname: '/(app)/(story-creation)/loadingAiGen' as any,
      params: {
        selectedSubject: JSON.stringify(matchedSubject),
        selectedLevel: requestedLevel,
      },
    });
  };

  const handleTryDifferentSubject = () => {
    router.back();
  };

  const handleBuyStory = (story: Story) => {
    setSelectedStory(story);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedStory(null);
  };

  const handleConfirmBuy = () => {
    if (selectedStory) {
      // TODO: Add actual purchase validation and currency checking
      router.push({
        pathname: '/(app)/(story-creation)/loadingStoryAdd' as any,
        params: { storyToAdd: JSON.stringify(selectedStory) },
      });
    }
  };

  // Get pricing for a story level
  const getStoryPricing = (level: string) => {
    const pricing = {
      novice: { gems: 1, gold: 3000 },
      apprentice: { gems: 2, gold: 4000 },
      master: { gems: 3, gold: 5000 },
    };
    return pricing[level as keyof typeof pricing] || pricing.novice;
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <View className="flex-1">
        {/* Header */}
        <View className="items-center gap-2">
          <TopAppBar
            title="Other Levels Found"
            rightButtonIcon="close"
            rightButtonPress={() => router.back()}
            buttonVariant="wood"
          />
        </View>

        {/* Info Text */}
        <View className="mb-6">
          <Text className="mb-1 text-center font-pixelify text-base text-white">
            We've discovered already generated levels available for the "{matchedSubject.title}" at
            a cheaper cost.
          </Text>
        </View>

        {/* Level Options */}
        <View className="flex-1">
          <View className="gap-3">
            {existingStories.map((story) => {
              const pricing = getStoryPricing(story.level);
              return (
                <View
                  key={story.storyId}
                  className="flex-row items-center justify-between rounded-lg bg-white/10 p-4">
                  <View className="flex-1">
                    <View className="mb-2 flex-row items-center gap-2">
                      <Image source={getDifficultyIcon(story.level)} className="h-10 w-10" />
                      <Text className="font-pixelify text-xl text-white">
                        {capitaliseWord(story.level)} Level
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <View className="flex-row items-center gap-1">
                        <Image source={UI_ICONS.currency.gem} className="h-8 w-8" />
                        <Text className="font-kenney text-lg text-white">{pricing.gems}</Text>
                      </View>
                      <Text className="font-pixelify text-lg text-white">or</Text>
                      <View className="flex-row items-center gap-1">
                        <Image source={UI_ICONS.currency.gold} className="h-8 w-8" />
                        <Text className="font-kenney text-lg text-white">
                          {pricing.gold >= 1000 ? `${pricing.gold / 1000}K` : pricing.gold}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <SquareBtn icon="plus" onPress={() => handleBuyStory(story)} variant="wood" />
                </View>
              );
            })}
          </View>
        </View>

        {/* Craft Story Section */}
        <View className="pb-6">
          <Text className="mb-4 text-center font-pixelify text-base text-white">
            If you'd rather craft your story at {requestedLevel} level, tap the button below.
          </Text>
          <PrimaryBtn onPress={handleCreateNewLevel} label="Craft Story" variant="wood" />
        </View>

        {/* Buy Story Modal */}
        <BuySingleStoryModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onModalHide={handleCloseModal}
          onBuyStory={handleConfirmBuy}
          story={selectedStory}
          userGems={userGems}
          userGold={userGold}
        />
      </View>
    </StandardSafeLayout>
  );
};

export default SubjectLevelsExistsScreen;
