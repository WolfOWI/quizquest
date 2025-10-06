import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import OwnedStoryBook from '@/components/cards/OwnedStoryBook';
import { UserOwnedStory } from '@/lib/types/user/User';
import { Timestamp } from 'firebase/firestore';
import { useAppStore } from '@/lib/state/appStore';
import SearchBar from '@/components/ui/search-bar';
import Subheading from '@/components/typography/Subheading';
import { getUserOwnedStoriesByDomain } from '@/services/userStoryServices';
import { getContentRegistry } from '@/lib/content';

const LibraryScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const { userDoc } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [storiesByDomain, setStoriesByDomain] = useState<Record<string, UserOwnedStory[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user stories by domain
  useEffect(() => {
    const loadUserStories = async () => {
      if (!userDoc) return;

      try {
        setIsLoading(true);
        setError(null);
        const stories = await getUserOwnedStoriesByDomain(userDoc.uid);
        setStoriesByDomain(stories);
      } catch (err) {
        console.error('Error loading user stories:', err);
        setError('Failed to load stories');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserStories();
  }, [userDoc]);

  if (!userDoc) {
    return null;
  }

  if (isLoading) {
    return (
      <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
        <View className="mx-4">
          <TopAppBar title="Library" titleSize="large" />
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="font-pixelify text-lg text-white">Loading your stories...</Text>
        </View>
      </StandardSafeLayout>
    );
  }

  if (error) {
    return (
      <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
        <View className="mx-4">
          <TopAppBar title="Library" titleSize="large" />
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="font-pixelify text-lg text-red-400">{error}</Text>
        </View>
      </StandardSafeLayout>
    );
  }

  // Get domain information for display
  const contentRegistry = getContentRegistry();

  // Step 1: Get all domains that have stories
  const domainsWithStories: [string, UserOwnedStory[]][] = [];
  for (const [domainId, stories] of Object.entries(storiesByDomain)) {
    if (stories.length > 0) {
      domainsWithStories.push([domainId, stories]);
    }
  }

  // Step 2: Filter stories by search query
  const domainsToShow: [string, UserOwnedStory[]][] = [];
  for (const [domainId, stories] of domainsWithStories) {
    const matchingStories: UserOwnedStory[] = [];
    for (const story of stories) {
      if (story.subjectTitle.toLowerCase().includes(searchQuery.toLowerCase())) {
        matchingStories.push(story);
      }
    }
    if (matchingStories.length > 0) {
      domainsToShow.push([domainId, matchingStories]);
    }
  }

  // Step 3: Sort domains alphabetically
  domainsToShow.sort(([domainIdA], [domainIdB]) => {
    const domainA = contentRegistry.domains[domainIdA];
    const domainB = contentRegistry.domains[domainIdB];
    return domainA.title.localeCompare(domainB.title);
  });

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

        {domainsToShow.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center font-pixelify text-lg text-gray-400">
              {searchQuery ? 'No stories match your search' : 'No stories in your library yet'}
            </Text>
          </View>
        ) : (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {domainsToShow.map(([domainId, stories]) => {
              const domain = contentRegistry.domains[domainId];
              if (!domain) return null;

              return (
                <View key={domainId} className="mb-6">
                  <View className="mb-3 px-4">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-2xl">{domain.iconKey}</Text>
                      <Subheading className="text-white">
                        {domain.title} ({stories.length})
                      </Subheading>
                    </View>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      flexDirection: 'row',
                      gap: 16,
                      paddingHorizontal: 16,
                    }}>
                    {stories.map((story) => (
                      <OwnedStoryBook key={story.storyId} story={story} />
                    ))}
                  </ScrollView>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </StandardSafeLayout>
  );
};

export default LibraryScreen;
