import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import OwnedStoryBook from '@/components/cards/OwnedStoryBook';
import { UserOwnedStory } from '@/lib/types/user/User';
import { Timestamp } from 'firebase/firestore';
import CurrencyDisplay from '@/components/counters/CurrencyDisplay';
import { useAppStore } from '@/lib/state/appStore';
import SearchBar from '@/components/ui/search-bar';

const LibraryScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const { userDoc } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
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
        <TopAppBar title="Library" titleSize="large" />
      </View>
      <View className="flex-1">
        <View className="my-4 px-4">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by Name"
          />
        </View>
        <View className="mb-6 overflow-visible">
          <Text className="mb-2 ps-4 font-kenney text-lg text-white">Stories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 16,
              paddingHorizontal: 16,
            }}>
            {userOwnedStories.map((story) => (
              <OwnedStoryBook key={story.subjectId} story={story} />
            ))}
          </ScrollView>
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default LibraryScreen;
