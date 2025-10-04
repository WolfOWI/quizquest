import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import Heading from '@/components/typography/Heading';
import Subheading from '@/components/typography/Subheading';
import { AudienceLevel } from '@/lib/types/general/General';
import { capitaliseWord } from '@/lib/utils/textUtils';
import { shortenNumber } from '@/lib/utils/numberUtils';
import { getDifficultyIcon, UI_ICONS } from '@/lib/constants/uiIcons';
import { Story, Subject } from '@/lib/types/curriculum/Curriculum';
import TopAppBar from '@/components/navigation/TopAppBar';
import BuySingleStoryModal from '@/components/modals/BuySingleStoryModal';
import { getStoryPrice } from '@/lib/content';

const SubjectLevelsExistsScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');

  // Params from loadingAiValidate
  const params = useLocalSearchParams();
  const requestedLevel = params.level as AudienceLevel;
  const matchedSubject = JSON.parse(params.matchedSubject as string) as Subject;
  const existingStories = JSON.parse(params.existingStories as string) as Story[];
  const ownedStoryIds = JSON.parse(params.ownedStoryIds as string) as string[];

  // Modal state
  const [buyModalVisible, setBuyModalVisible] = useState(false);
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

  const handleStoryPress = (story: Story) => {
    if (ownedStoryIds.includes(story.storyId as string)) {
      // Show alert for owned stories
      Alert.alert(
        'Go to Story',
        `You already own "${story.subjectTitle}" at ${capitaliseWord(story.level)} level. Do you want to quit story crafting and go to this story?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Go to Story',
            onPress: () => {
              router.push({
                pathname: '/(app)/(story)/storyQuests' as any,
                params: { storyId: story.storyId },
              });
            },
          },
        ]
      );
    } else {
      // Show buy modal for unowned stories
      setSelectedStory(story);
      setBuyModalVisible(true);
    }
  };

  const handleCloseBuyModal = () => {
    setBuyModalVisible(false);
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

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <View className="flex-1">
        {/* Header */}
        <View className="items-center gap-2">
          <TopAppBar
            title="Other Levels"
            titleCenter
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
          {ownedStoryIds.length > 0 && (
            <Text className="mt-2 text-center font-pixelify text-sm text-green-300">
              You already own {ownedStoryIds.length} of these stories! Tap the play button to view
              them.
            </Text>
          )}
        </View>

        {/* Level Options */}
        <View className="flex-1">
          <View className="gap-3">
            {existingStories.map((story) => {
              const storyPricing = getStoryPrice(story.level);
              const isOwned = ownedStoryIds.includes(story.storyId as string);

              return (
                <View
                  key={story.storyId}
                  className={`flex-row items-center justify-between rounded-lg p-4 ${
                    isOwned ? 'border border-green-500/50 bg-green-900/30' : 'bg-white/10'
                  }`}>
                  <View className="flex-1">
                    <View className="mb-2 flex-col gap-2">
                      <View className="flex-row items-center gap-1">
                        <Image source={getDifficultyIcon(story.level)} className="h-8 w-8" />
                        <Text className="font-pixelify text-xl text-white">
                          {capitaliseWord(story.level)} Level
                        </Text>
                      </View>

                      {isOwned && (
                        <View className="flex-row items-center gap-1">
                          <Image source={UI_ICONS.general.checkmark} className="h-4 w-4" />
                          <Text className="font-pixelify text-xs text-white">In Library</Text>
                        </View>
                      )}
                    </View>
                    {!isOwned && (
                      <View className="flex-row items-center gap-2">
                        <View className="flex-row items-center gap-1">
                          <Image source={UI_ICONS.currency.gem} className="h-8 w-8" />
                          <Text className="font-kenney text-lg text-white">
                            {storyPricing.gems}
                          </Text>
                        </View>
                        <Text className="font-pixelify text-lg text-white">or</Text>
                        <View className="flex-row items-center gap-1">
                          <Image source={UI_ICONS.currency.gold} className="h-8 w-8" />
                          <Text className="font-kenney text-lg text-white">
                            {shortenNumber(storyPricing.gold ?? 0)}
                          </Text>
                        </View>
                      </View>
                    )}
                    {isOwned && (
                      <Text className="font-pixelify text-sm text-green-300">
                        Tap to view your story
                      </Text>
                    )}
                  </View>
                  <SquareBtn
                    icon={isOwned ? 'play' : 'plus'}
                    onPress={() => handleStoryPress(story)}
                    variant="wood"
                  />
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
          visible={buyModalVisible}
          onClose={handleCloseBuyModal}
          onModalHide={handleCloseBuyModal}
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
