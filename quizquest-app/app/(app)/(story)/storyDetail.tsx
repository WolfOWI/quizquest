import React, { useState } from 'react';
import { View, ScrollView, Pressable, Text, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { SubjectDoc, SubtopicDoc } from '@/lib/types/curriculum/Curriculum';
import { Timestamp } from 'firebase/firestore';
import CurrencyDisplay from '@/components/counters/CurrencyDisplay';
import { useAppStore } from '@/lib/state/appStore';
import QuestListItem from '@/components/cards/QuestListItem';
import QuestPreviewModal from '@/components/modals/QuestPreviewModal';

const StoryDetailScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const { userDoc } = useAppStore();
  const { subjectSlug } = useLocalSearchParams<{ subjectSlug: string }>();

  // Modal state
  const [selectedQuest, setSelectedQuest] = useState<
    (SubtopicDoc & { completedQuestions: number; totalQuestions: number }) | null
  >(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!userDoc) {
    return null;
  }

  // TODO: Replace with real data fetching based on subjectSlug
  // For now, using mock data
  const subject: SubjectDoc = {
    subjectTitle: 'Snakes on a plane',
    subjectSlug: subjectSlug || 'snakes-on-a-plane',
    level: 'novice',
    createdAt: Timestamp.now(),
    source: 'generated',
    domain: 'animal',
  };

  // Generate fake subtopics with completion data
  const subtopics: (SubtopicDoc & { completedQuestions: number; totalQuestions: number })[] = [
    {
      subtopicTitle: 'Basics & traits of snakes',
      subtopicSlug: 'basics-traits',
      description: 'Learn about snake characteristics and features',
      createdAt: Timestamp.now(),
      completedQuestions: 8,
      totalQuestions: 10,
    },
    {
      subtopicTitle: 'Habitat & range',
      subtopicSlug: 'habitat-range',
      description: 'Explore where snakes live and their distribution',
      createdAt: Timestamp.now(),
      completedQuestions: 5,
      totalQuestions: 10,
    },
    {
      subtopicTitle: 'Diet & foraging',
      subtopicSlug: 'diet-foraging',
      description: 'Understand what snakes eat and how they hunt',
      createdAt: Timestamp.now(),
      completedQuestions: 0,
      totalQuestions: 10,
    },
    {
      subtopicTitle: 'Behavior & social',
      subtopicSlug: 'behavior-social',
      description: 'Discover snake behavior patterns and social interactions',
      createdAt: Timestamp.now(),
      completedQuestions: 10,
      totalQuestions: 10,
    },
    {
      subtopicTitle: 'Reproduction & lifecycle',
      subtopicSlug: 'reproduction-lifecycle',
      description: 'Learn about snake reproduction and life stages',
      createdAt: Timestamp.now(),
      completedQuestions: 3,
      totalQuestions: 10,
    },
    {
      subtopicTitle: 'Predators & defenses',
      subtopicSlug: 'predators-defenses',
      description: 'Study snake predators and defense mechanisms',
      createdAt: Timestamp.now(),
      completedQuestions: 0,
      totalQuestions: 10,
    },
  ];

  const handleQuestPress = (
    subtopic: SubtopicDoc & { completedQuestions: number; totalQuestions: number }
  ) => {
    setSelectedQuest(subtopic);
    setIsModalVisible(true);
  };

  const handleStartQuest = () => {
    if (selectedQuest) {
      setIsModalVisible(false);
      router.push({
        pathname: '/(app)/(story)/(quest)/questRun',
        params: {
          subjectSlug: subject.subjectSlug,
          subtopicSlug: selectedQuest.subtopicSlug,
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
    router.dismissTo('/(app)/(tabs)/stories');
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mx-4">
        {/* <CurrencyDisplay gemCount={userDoc.economy.gems} goldCount={userDoc.economy.gold} /> */}
        <TopAppBar leftButtonIcon="back" leftButtonPress={handleBackPress} buttonVariant="wood" />

        {/* Subject Header */}
        <View className="mb-6 mt-2 rounded-lg bg-white/10 p-4">
          <Text className="text-center font-jacquard text-4xl text-white">
            {subject.subjectTitle}
          </Text>
          <Text className="text-center font-pixelify text-sm capitalize text-white/70">
            {subject.level} Level
          </Text>
        </View>
      </View>

      {/* Quests List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {subtopics.map((subtopic) => (
          <QuestListItem
            key={subtopic.subtopicSlug}
            subtopic={subtopic}
            completedQuestions={subtopic.completedQuestions}
            totalQuestions={subtopic.totalQuestions}
            onPress={() => handleQuestPress(subtopic)}
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
          subtopic={selectedQuest}
          subjectTitle={subject.subjectTitle}
          subjectLevel={subject.level}
        />
      )}
    </StandardSafeLayout>
  );
};

export default StoryDetailScreen;
