import React, { useState } from 'react';
import { View, ScrollView, Pressable, Text, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { UserStoryProgress, UserChapterProgress } from '@/lib/types/user/User';
import { Story, Chapter } from '@/lib/types/curriculum/Curriculum';
import { Timestamp } from 'firebase/firestore';
import CurrencyDisplay from '@/components/counters/CurrencyDisplay';
import { useAppStore } from '@/lib/state/appStore';
import QuestListItem from '@/components/cards/QuestListItem';
import QuestPreviewModal from '@/components/modals/QuestPreviewModal';

const StoryDetailScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const { userDoc } = useAppStore();

  // Modal state
  const [selectedQuest, setSelectedQuest] = useState<(Chapter & UserChapterProgress) | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!userDoc) {
    return null;
  }

  // TODO: Fake data here
  // For now, using mock data
  const story: Story = {
    storyId: 'gen:animals:snakes__novice__gen_v1',
    subjectId: 'gen:animals:snakes',
    subjectTitle: 'Snakes on a plane',
    subjectDescription: 'Snakes on a plane is very scary',
    level: 'novice',
    source: 'generated',
    authorUid: '123',
    chapterCount: 3,
    questionCount: 60,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  // Generate fake quests (chapters) with user progress data
  const quests: (Chapter & UserChapterProgress)[] = [
    {
      chapterId: `${story.storyId}__ch1`,
      storyId: 'gen:animals:snakes__novice__gen_v1',
      title: 'Basics & traits of snakes',
      description: 'Learn about snake characteristics and features',
      seq: 1,
      environmentId: 'desert-oasis',
      questionCount: 10,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      runs: {
        total: 3,
        won: 2,
      },
      battles: {
        total: 2,
        won: 2,
      },
      questions: {
        total: 10,
        correct: 8,
      },
    },
    {
      chapterId: `${story.storyId}__ch2`,
      storyId: 'gen:animals:snakes__novice__gen_v1',
      title: 'Habitat & range',
      description: 'Explore where snakes live and their distribution',
      seq: 2,
      environmentId: 'desert-oasis',
      questionCount: 10,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      runs: {
        total: 0,
        won: 0,
      },
      battles: {
        total: 0,
        won: 0,
      },
      questions: {
        total: 10,
        correct: 0,
      },
    },
    {
      chapterId: `${story.storyId}__ch3`,
      storyId: 'gen:animals:snakes__novice__gen_v1',
      title: 'Food & nutrition',
      description: 'Learn about what snakes eat and how they survive',
      seq: 3,
      environmentId: 'desert-oasis',
      questionCount: 5,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      runs: {
        total: 0,
        won: 0,
      },
      battles: {
        total: 0,
        won: 0,
      },
      questions: {
        total: 5,
        correct: 0,
      },
    },
  ];

  const handleQuestPress = (quest: Chapter & UserChapterProgress) => {
    setSelectedQuest(quest);
    setIsModalVisible(true);
  };

  const handleStartQuest = () => {
    if (selectedQuest) {
      setIsModalVisible(false);
      router.push({
        pathname: '/(app)/(story)/(quest)/questRun',
        params: {
          chapterId: selectedQuest.chapterId,
        },
      } as any);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleModalHide = () => {
    setSelectedQuest(null);
  };

  const handleBackPress = () => {
    router.dismissTo('/(app)/(tabs)/library' as any);
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mx-4">
        {/* <CurrencyDisplay gemCount={userDoc.economy.gems} goldCount={userDoc.economy.gold} /> */}
        <TopAppBar leftButtonIcon="back" leftButtonPress={handleBackPress} buttonVariant="wood" />

        {/* Subject Header */}
        <View className="mb-6 mt-2 rounded-lg bg-white/10 p-4">
          <Text className="text-center font-jacquard text-4xl text-white">
            {story.subjectTitle}
          </Text>
          <Text className="text-center font-pixelify text-sm capitalize text-white/70">
            {story.level} Level
          </Text>
        </View>
      </View>

      {/* Quests List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {quests.map((quest) => (
          <QuestListItem
            key={quest.chapterId}
            chapterAndProgress={quest}
            onPress={() => handleQuestPress(quest)}
          />
        ))}
      </ScrollView>

      {/* Quest Preview Modal */}
      {selectedQuest && (
        <QuestPreviewModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          onModalHide={handleModalHide}
          onStartQuest={handleStartQuest}
          chapterAndProgress={selectedQuest}
        />
      )}
    </StandardSafeLayout>
  );
};

export default StoryDetailScreen;
