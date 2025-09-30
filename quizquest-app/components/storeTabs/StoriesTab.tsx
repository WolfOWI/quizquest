import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, ImageBackground, Image } from 'react-native';
import SearchBar from '@/components/ui/search-bar';
import DomainCategory from '@/components/cards/DomainCategory';
import SubjectListItem from '@/components/listItems/SubjectListItem';
import { loadContentPack } from '@/lib/content/loader';
import { router } from 'expo-router';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import { Subject } from '@/lib/types/curriculum/Curriculum';
import Subheading from '@/components/typography/Subheading';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';

const StoriesTab = React.memo(() => {
  const contentPack = loadContentPack();
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
      latestStoryUpdatedAt: { toMillis: () => Date.now() } as any,
      createdAt: { toMillis: () => Date.now() } as any,
      updatedAt: { toMillis: () => Date.now() } as any,
    },
    {
      subjectId: 'gen:literature:hunger-games',
      domainId: 'literature',
      title: 'The Hunger Games',
      titleLower: 'the-hunger-games',
      slug: 'the-hunger-games',
      description: 'The Hunger Games is a book',
      levelsAvailable: ['apprentice', 'master'],
      latestStoryUpdatedAt: { toMillis: () => Date.now() } as any,
      createdAt: { toMillis: () => Date.now() } as any,
      updatedAt: { toMillis: () => Date.now() } as any,
    },
  ];

  // Handle search bar press - enter search mode
  const handleSearchPress = () => {
    console.log('🔍 Search bar pressed - entering search mode');
    setIsSearchMode(true);
    setSelectedDomain(null);
    setSearchQuery('');
  };

  // Handle domain selection - enter search mode with domain filter
  const onDomainPress = (domainId: string) => {
    console.log('Domain pressed:', domainId);
    setIsSearchMode(true);
    setSelectedDomain(domainId);
    setSearchQuery('');
  };

  const handleCloseSearch = () => {
    setIsSearchMode(false);
    setSelectedDomain(null);
    setSearchQuery('');
  };

  // Handle subject press
  const onSubjectPress = (subject: Subject) => {
    console.log('Selected subject:', subject);
    // TODO: Show modal
  };

  // If in search mode is true, show list of subjects
  if (isSearchMode) {
    return (
      <>
        {/* Search Bar */}
        <View className="mb-4 w-full flex-row items-center gap-2 px-4">
          <View className="flex-1">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by Name or Category"
            />
          </View>
          <SquareBtn icon="close" onPress={handleCloseSearch} />
        </View>
        <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
          {/* Results Header */}
          <View className="mb-4 px-4">
            <Subheading>
              {selectedDomain
                ? `${contentPack.domains[selectedDomain]?.title || selectedDomain} Subjects`
                : 'All Subjects'}
            </Subheading>
          </View>

          {/* TODO: Search functionality */}
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-center font-pixelify text-lg text-gray-400">
              Search functionality
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }

  // Default home view, show popular categories and you might like section
  return (
    <>
      {/* Search Bar */}
      <View className="mb-4 w-full px-4">
        <Pressable onPress={handleSearchPress}>
          <SearchBar
            value=""
            onChangeText={() => {}}
            placeholder="Search by Name or Category"
            editable={false}
          />
        </Pressable>
      </View>
      <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false}>
        {/* Popular Categories */}
        <View className="mb-6 overflow-visible">
          <Subheading className="ps-4">Popular Categories</Subheading>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="ps-4">
            {Object.values(contentPack.domains).map((domain) => (
              <DomainCategory key={domain.id} domain={domain} onPress={onDomainPress} />
            ))}
          </ScrollView>
        </View>

        {/* You Might Like Section */}
        <View className="mb-6 px-4">
          <Subheading>You Might Like</Subheading>
          {recommendedSubjects.map((subject) => (
            <SubjectListItem
              key={subject.subjectId}
              subject={subject}
              onPress={() => onSubjectPress(subject)}
            />
          ))}
        </View>

        {/* Create Your Own Section */}
        <View className="px-4">
          <Subheading>Create Your Own</Subheading>
          <Pressable
            onPress={() => {
              try {
                router.push('/(app)/(story-creation)/subjectInput' as any);
              } catch (error) {
                console.error('Navigation error:', error);
              }
            }}
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
    </>
  );
});

StoriesTab.displayName = 'StoriesTab';

export default StoriesTab;
