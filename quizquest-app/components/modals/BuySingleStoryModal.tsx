import React from 'react';
import { View, Text, Pressable, Image, ImageBackground, Modal, Dimensions } from 'react-native';
import { Story } from '@/lib/types/curriculum/Curriculum';
import { PrimaryBtn } from '../buttons/standard/PrimaryBtn';
import { SquareBtn } from '../buttons/square/SquareBtn';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import { getDifficultyIcon } from '@/lib/constants/uiIcons';
import { capitaliseWord } from '@/lib/utils/textUtils';
import { formatFirebaseTimestamp, DATE_FORMATS } from '@/lib/utils/dateUtils';
import Heading from '../typography/Heading';
import CurrencyDisplay from '../counters/CurrencyDisplay';

interface BuySingleStoryModalProps {
  visible: boolean;
  onClose: () => void;
  onModalHide: () => void;
  onBuyStory: () => void;
  story: Story | null;
  userGems: number;
  userGold: number;
}

const BuySingleStoryModal = ({
  visible,
  onClose,
  onModalHide,
  onBuyStory,
  story,
  userGems,
  userGold,
}: BuySingleStoryModalProps) => {
  const paperTexture = require('@/assets/textures/paper_scroll.png');
  const screenHeight = Dimensions.get('window').height;

  if (!story) return null;

  // Get pricing from balance.json structure
  const getStoryPricing = (level: string) => {
    const pricing = {
      novice: { gems: 1, gold: 3000 },
      apprentice: { gems: 2, gold: 4000 },
      master: { gems: 3, gold: 5000 },
    };
    return pricing[level as keyof typeof pricing] || pricing.novice;
  };

  const pricing = getStoryPricing(story.level);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      onDismiss={onModalHide}>
      <View className="flex-1 justify-center bg-black/50">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="mx-4 overflow-hidden rounded-2xl" style={{ height: screenHeight * 0.7 }}>
          <ImageBackground source={paperTexture} className="flex-1">
            <View className="absolute inset-0" />

            {/* Header */}
            <View className="flex-row items-center justify-between p-4">
              <Heading size="large" color="text-amber-900">
                Buy Story
              </Heading>
              <SquareBtn icon="close" onPress={onClose} variant="wood" />
            </View>

            {/* Story Info */}
            <View className="px-4 pb-4">
              <Text className="mb-2 font-kenney text-2xl text-amber-900">{story.subjectTitle}</Text>

              <Text className="mb-3 font-pixelify text-sm text-amber-800">{story.description}</Text>

              {/* Level Indicator */}

              <Text className="mb-4 font-kenney text-sm text-amber-900">
                Created {formatFirebaseTimestamp(story.createdAt, DATE_FORMATS.MONTH_YEAR)}
              </Text>

              {/* Story Details Box */}
              <View className="mb-4 rounded-lg bg-amber-200/60 p-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Image source={UI_ICONS.curriculum.quest} className="h-8 w-8" />
                    <Text className="font-pixelify text-base text-amber-900">
                      {story.chapterCount} Quests
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="font-pixelify text-sm text-amber-800">
                      {capitaliseWord(story.level)}
                    </Text>
                    <Image source={getDifficultyIcon(story.level)} className="h-8 w-8" />
                  </View>
                </View>
              </View>

              {/* Purchase Options */}
              <View className="mb-4">
                <Text className="mb-2 font-pixelify text-base text-amber-900">Buy for</Text>
                <View className="flex-row items-center justify-center gap-4">
                  <View className="flex-row items-center gap-1">
                    <Image source={UI_ICONS.currency.gem} className="h-6 w-6" />
                    <Text className="font-kenney text-lg text-amber-900">{pricing.gems}</Text>
                  </View>
                  <Text className="font-pixelify text-base text-amber-800">or</Text>
                  <View className="flex-row items-center gap-1">
                    <Image source={UI_ICONS.currency.gold} className="h-6 w-6" />
                    <Text className="font-kenney text-lg text-amber-900">
                      {pricing.gold >= 1000 ? `${pricing.gold / 1000}K` : pricing.gold}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Buy Button */}
              <PrimaryBtn onPress={onBuyStory} label="Buy Story" variant="wood" />

              <View className="mt-4 w-full items-center">
                <CurrencyDisplay gemCount={userGems} goldCount={userGold} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default BuySingleStoryModal;
