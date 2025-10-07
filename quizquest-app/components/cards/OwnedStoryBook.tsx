import { View, Text, Image, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { capitaliseWord } from '@/lib/utils/textUtils';
import { UserOwnedStory } from '@/lib/types/user/User';

interface OwnedStoryBookProps {
  story: UserOwnedStory;
}

const OwnedStoryBook = ({ story }: OwnedStoryBookProps) => {
  // Book Colours
  const bookPurple = require('@/assets/ui-assets/cards/storybooks/book_purple.png');
  const bookNavy = require('@/assets/ui-assets/cards/storybooks/book_navy.png');
  const bookCyan = require('@/assets/ui-assets/cards/storybooks/book_cyan.png');
  const bookRed = require('@/assets/ui-assets/cards/storybooks/book_red.png');
  const bookGreen = require('@/assets/ui-assets/cards/storybooks/book_green.png');

  // Bookmarks
  const markNovice = require('@/assets/ui-assets/cards/storybooks/bookmark_green.png');
  const markApprentice = require('@/assets/ui-assets/cards/storybooks/bookmark_orange.png');
  const markMaster = require('@/assets/ui-assets/cards/storybooks/bookmark_red.png');

  const bookColour = () => {
    // If subject title starts with A-E, return bookPurple
    if (
      story.subjectTitle.startsWith('A') ||
      story.subjectTitle.startsWith('B') ||
      story.subjectTitle.startsWith('C') ||
      story.subjectTitle.startsWith('D') ||
      story.subjectTitle.startsWith('E')
    ) {
      return bookPurple;
    }
    // If subject title starts with F-J, return bookNavy
    if (
      story.subjectTitle.startsWith('F') ||
      story.subjectTitle.startsWith('G') ||
      story.subjectTitle.startsWith('H') ||
      story.subjectTitle.startsWith('I') ||
      story.subjectTitle.startsWith('J')
    ) {
      return bookNavy;
    }
    // If subject title starts with K-O, return bookCyan
    if (
      story.subjectTitle.startsWith('K') ||
      story.subjectTitle.startsWith('L') ||
      story.subjectTitle.startsWith('M') ||
      story.subjectTitle.startsWith('N') ||
      story.subjectTitle.startsWith('O')
    ) {
      return bookCyan;
    }
    // If subject title starts with P-T, return bookRed
    if (
      story.subjectTitle.startsWith('P') ||
      story.subjectTitle.startsWith('Q') ||
      story.subjectTitle.startsWith('R') ||
      story.subjectTitle.startsWith('S') ||
      story.subjectTitle.startsWith('T')
    ) {
      return bookRed;
    }
    // If subject title starts with U-Z, return bookGreen
    if (
      story.subjectTitle.startsWith('U') ||
      story.subjectTitle.startsWith('V') ||
      story.subjectTitle.startsWith('W') ||
      story.subjectTitle.startsWith('X') ||
      story.subjectTitle.startsWith('Y') ||
      story.subjectTitle.startsWith('Z')
    ) {
      return bookGreen;
    }
  };

  const handlePress = () => {
    router.push({
      pathname: '/(app)/(story)/storyQuests',
      params: { storyId: story.storyId },
    } as any);
  };

  return (
    <Pressable
      className="relative h-[150px] w-[224px] items-center justify-center"
      onPress={handlePress}>
      <Image source={bookColour()} className="absolute h-full w-full" resizeMode="contain" />
      <View className="absolute mb-6 items-center justify-center">
        <Text className="mx-4 text-center font-pixelify text-sm text-white opacity-60">
          {capitaliseWord(story.level)}
        </Text>
        <Text className="mx-4 text-center font-pixelify text-lg text-white">
          {story.subjectTitle}
        </Text>
      </View>
      {/* Bookmark */}
      <Image
        source={
          story.level === 'novice'
            ? markNovice
            : story.level === 'apprentice'
              ? markApprentice
              : markMaster
        }
        className="absolute h-full w-full"
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default OwnedStoryBook;
