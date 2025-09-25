import React from 'react';
import { View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import StoryBook from '@/components/cards/StoryBook';
import { UserOwnedStory } from '@/lib/types/user/User';
import { Timestamp } from 'firebase/firestore';
import CurrencyDisplay from '@/components/counters/CurrencyDisplay';
import { useAppStore } from '@/lib/state/appStore';

const StoriesScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const { userDoc } = useAppStore();

  if (!userDoc) {
    return null;
  }

  // TODO: Temporary Fake data (replace with real data)
  const userOwnedStories: UserOwnedStory[] = [
    {
      acquiredAt: Timestamp.now(),
      lastPlayedAt: Timestamp.now(),
      domainId: 'animal',
      subjectId: 'gen:animals:snakes-on-a-plane',
      subjectTitle: 'Snakes on a plane',
      level: 'novice',
    },
    {
      subjectTitle: 'The 1988 battle of Manhattan Heights',
      subjectId: 'gen:history:the-1988-battle-of-manhattan-heights',
      level: 'apprentice',
      acquiredAt: Timestamp.now(),
      lastPlayedAt: Timestamp.now(),
      domainId: 'history',
    },
    {
      subjectTitle: 'Lions',
      subjectId: 'gen:animals:lions',
      level: 'master',
      acquiredAt: Timestamp.now(),
      lastPlayedAt: Timestamp.now(),
      domainId: 'animal',
    },
  ];

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mx-4">
        <CurrencyDisplay gemCount={userDoc.economy.gems} goldCount={userDoc.economy.gold} />
        <TopAppBar
          title="Stories"
          titleSize="large"
          rightButtonIcon="plus"
          rightButtonPress={() => router.push('/(app)/(story-creation)/subjectInput' as any)}
          buttonVariant="wood"
        />
      </View>
      <View className="flex-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 24,
          }}
          className="flex-1">
          {userOwnedStories.map((story) => (
            <StoryBook key={story.subjectId} subject={story} />
          ))}
        </ScrollView>
      </View>
    </StandardSafeLayout>
  );
};

export default StoriesScreen;
