import React, { useState, useEffect } from 'react';
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
import Subheading from '@/components/typography/Subheading';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import { getStoryById, getAllChaptersByStoryId } from '@/services/curriculumServices';
import { getTexture } from '@/lib/content/registry';

const StoryQuestsScreen = () => {
  const backgroundTexture = getTexture('dirt_purple');
  const { userDoc } = useAppStore();
  const { storyId } = useLocalSearchParams<{ storyId: string }>();

  // Data States
  const [story, setStory] = useState<Story | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [selectedQuest, setSelectedQuest] = useState<(Chapter & UserChapterProgress) | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get story and chapters data
  useEffect(() => {
    const loadStoryData = async () => {
      if (!storyId) {
        setError('No story selected');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const [storyData, chaptersData] = await Promise.all([
          getStoryById(storyId),
          getAllChaptersByStoryId(storyId),
        ]);

        setStory(storyData);
        setChapters(chaptersData);
      } catch (err) {
        console.error('Error loading story data:', err);
        setError('Failed to load story data');
      } finally {
        setIsLoading(false);
      }
    };

    loadStoryData();
  }, [storyId]);

  if (!userDoc) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} darkenOverlay={20}>
        <TopAppBar
          leftButtonIcon="back"
          leftButtonPress={() => router.dismissTo('/(app)/(tabs)/library' as any)}
          buttonVariant="wood"
          title="Story"
          titleSize="large"
          titleCenter
          titleClassName="opacity-50"
        />
        <View className="flex-1 items-center justify-center">
          <Text className="font-pixelify text-lg text-white">Loading story...</Text>
        </View>
      </StandardSafeLayout>
    );
  }

  // Error state
  if (error || !story) {
    return (
      <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} darkenOverlay={20}>
        <TopAppBar
          leftButtonIcon="back"
          leftButtonPress={() => router.dismissTo('/(app)/(tabs)/library' as any)}
          buttonVariant="wood"
          title="Story"
          titleSize="large"
          titleCenter
          titleClassName="opacity-50"
        />
        <View className="flex-1 items-center justify-center">
          <Text className="font-pixelify text-lg text-red-400">{error || 'Story not found'}</Text>
        </View>
      </StandardSafeLayout>
    );
  }

  // Quest Stat Icons
  const deathsIcon = UI_ICONS.stats.deaths;
  const enemiesSlainIcon = UI_ICONS.stats.slain;
  const playThroughsIcon = UI_ICONS.stats.runs;

  // TODO: Get real story progress data
  // Fake story progress data
  const storyProgress: UserStoryProgress = {
    storyId: story.storyId,
    runs: {
      total: 0,
      won: 0,
    },
    battles: {
      total: 0,
      won: 0,
    },
    questions: {
      total: story.questionCount,
      correct: 0,
    },
  };

  // TODO: Convert chapters to quests with fake user progress data
  const quests: (Chapter & UserChapterProgress)[] = chapters.map((chapter) => ({
    ...chapter,
    runs: {
      total: 0,
      won: 0,
    },
    battles: {
      total: 0,
      won: 0,
    },
    questions: {
      total: chapter.questionCount,
      correct: 0,
    },
  }));

  const completionPercentage =
    storyProgress.questions.total > 0
      ? (storyProgress.questions.correct / storyProgress.questions.total) * 100
      : 0;
  const isCompleted = completionPercentage === 100;
  const isInProgress = completionPercentage > 0 && completionPercentage < 100;

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
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} darkenOverlay={20}>
      <TopAppBar
        leftButtonIcon="back"
        leftButtonPress={handleBackPress}
        buttonVariant="wood"
        title="Story"
        titleSize="large"
        titleCenter
        titleClassName="opacity-50"
      />

      {/* Subject Header */}
      <View className="mb-4 mt-2 px-4">
        <Text className="text-center font-jacquard text-4xl text-white">{story.subjectTitle}</Text>
      </View>
      {/* Progress & Stats */}
      <View className="mb-6 gap-2">
        <View className="flex flex-row items-center justify-between">
          <Text className="w-1/3 text-left font-kenney text-sm text-white">
            {storyProgress.questions.correct}/{storyProgress.questions.total}
          </Text>
          <Text className="w-1/3 text-center font-pixelify text-sm capitalize text-white">
            {story.level} Level
          </Text>
          <Text className="w-1/3 text-right font-kenney text-sm text-white">Info</Text>
        </View>
        {/* Progress Bar */}
        <View className="h-2 rounded-full bg-black">
          <View
            className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-yellow-500'}`}
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </View>
        {/* Stats */}
        <View className="flex w-full flex-row items-center justify-center gap-4">
          <View className="flex-row items-center gap-1">
            <Image source={playThroughsIcon} className="h-6 w-6" />
            <Text className="font-kenney text-lg text-white">{storyProgress.runs.total}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Image source={enemiesSlainIcon} className="h-6 w-6" />
            <Text className="font-kenney text-lg text-white">{storyProgress.battles.won}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Image source={deathsIcon} className="h-6 w-6" />
            <Text className="font-kenney text-lg text-white">
              {storyProgress.runs.total - storyProgress.runs.won}
            </Text>
          </View>
        </View>
      </View>

      {/* Quests List */}
      <Subheading className="w-full text-center">Quests</Subheading>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
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

export default StoryQuestsScreen;
