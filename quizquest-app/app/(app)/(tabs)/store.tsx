import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, ImageBackground } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { ChipTabs, ChipTabInterface } from '@/components/navigation/ChipTabs';
import CurrencyDisplay from '@/components/counters/CurrencyDisplay';
import { useAppStore } from '@/lib/state/appStore';
import Heading from '@/components/typography/Heading';
import SearchBar from '@/components/ui/search-bar';
import DomainCategory from '@/components/cards/DomainCategory';
import SubjectListItem from '@/components/listItems/SubjectListItem';
import { loadContentPack } from '@/lib/content/loader';
import { UserOwnedStory } from '@/lib/types/user/User';
import { Timestamp } from 'firebase/firestore';
import { router } from 'expo-router';
import { Image } from 'react-native';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import { Subject } from '@/lib/types/curriculum/Curriculum';

const StoreScreen = () => {
  const { userDoc } = useAppStore();
  const backgroundTexture = require('@/assets/textures/leather_purple.png');
  const contentPack = loadContentPack();

  const [activeTab, setActiveTab] = useState('stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Mock data for "You Might Like" section
  const recommendedSubjects: Subject[] = [
    {
      subjectId: 'gen:animals:squirrels',
      domainId: 'animals',
      title: 'Squirrels',
      titleLower: 'squirrels',
      slug: 'squirrels',
      description: 'Squirrels are cute',
      levelsAvailable: ['novice', 'apprentice', 'master'],
      latestStoryUpdatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    },
    {
      subjectId: 'gen:literature:hunger-games',
      domainId: 'literature',
      title: 'The Hunger Games',
      titleLower: 'the-hunger-games',
      slug: 'the-hunger-games',
      description: 'The Hunger Games is a book',
      levelsAvailable: ['apprentice', 'master'],
      latestStoryUpdatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    },
  ];

  const storeTabs: ChipTabInterface[] = [
    { id: 'stories', label: 'Stories' },
    { id: 'items', label: 'Items' },
    { id: 'characters', label: 'Characters' },
    { id: 'currency', label: 'Currency' },
    { id: 'pets', label: 'Pets' },
  ];

  // TODO: Search by category (domain) on domain press
  const onDomainPress = (domainId: string) => {
    setSelectedDomain(domainId);
    console.log('Selected domain:', domainId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stories':
        return (
          <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
            {/* Search Bar */}
            <View className="mb-4 px-4">
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search by Name or Category"
              />
            </View>

            {/* Popular Categories */}
            <View className="mb-6 overflow-visible">
              <Text className="mb-2 ps-4 font-pixelify text-lg text-white">Popular Categories</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="ps-4">
                {Object.values(contentPack.domains).map((domain) => (
                  <DomainCategory key={domain.id} domain={domain} onPress={onDomainPress} />
                ))}
              </ScrollView>
            </View>

            {/* You Might Like Section */}
            <View className="mb-6 px-4">
              <Text className="mb-2 font-pixelify text-lg text-white">You Might Like</Text>
              {recommendedSubjects.map((subject) => (
                <SubjectListItem
                  key={subject.subjectId}
                  subject={subject}
                  onPress={() => console.log('Show story details modal')}
                />
              ))}
            </View>

            {/* Create Your Own Section */}
            <View className="px-4">
              <Text className="mb-2 font-pixelify text-lg text-white">Create Your Own</Text>
              <Pressable
                onPress={() => router.push('/(app)/(story-creation)/subjectInput' as any)}
                className="relative h-32 overflow-hidden rounded-2xl">
                <ImageBackground
                  className="flex-1 items-center justify-center"
                  resizeMode="cover"
                  source={require('@/assets/images/backgrounds/ai_gen.png')}>
                  <View className="z-10 items-center justify-center">
                    <Image source={UI_ICONS.nav.ai_generate} className="h-12 w-12" />
                    <Text className="font-pixelify text-lg text-white">Generate with AI</Text>
                  </View>
                </ImageBackground>
              </Pressable>
            </View>
          </ScrollView>
        );
      case 'items':
        return <Text className="text-center text-gray-400">Items Store</Text>;
      case 'characters':
        return <Text className="text-center text-gray-400">Characters Store</Text>;
      case 'currency':
        return <Text className="text-center text-gray-400">Currency Store</Text>;
      case 'pets':
        return <Text className="text-center text-gray-400">Pets Store</Text>;
      default:
        return <Text className="text-center text-gray-400">Store Page</Text>;
    }
  };

  if (!userDoc) {
    return null;
  }

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <View className="mx-4 flex-row items-center justify-between">
        <Heading size="large">Shop</Heading>
        <CurrencyDisplay gemCount={userDoc.economy.gems} goldCount={userDoc.economy.gold} />
      </View>
      <View className="flex-1">
        <ChipTabs
          tabs={storeTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mt-4 ps-4"
        />
        <View className="mt-4 flex-1 items-center justify-center">{renderTabContent()}</View>
      </View>
    </StandardSafeLayout>
  );
};

export default StoreScreen;
