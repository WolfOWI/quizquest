import { View, Text, Image, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SubjectDoc } from '@/lib/types/curriculum/Curriculum';
import { capitaliseWord } from '@/lib/utils/textUtils';

interface StoryBookProps {
  subject: SubjectDoc;
}

const StoryBook = ({ subject }: StoryBookProps) => {
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
      subject.subjectTitle.startsWith('A') ||
      subject.subjectTitle.startsWith('B') ||
      subject.subjectTitle.startsWith('C') ||
      subject.subjectTitle.startsWith('D') ||
      subject.subjectTitle.startsWith('E')
    ) {
      return bookPurple;
    }
    // If subject title starts with F-J, return bookNavy
    if (
      subject.subjectTitle.startsWith('F') ||
      subject.subjectTitle.startsWith('G') ||
      subject.subjectTitle.startsWith('H') ||
      subject.subjectTitle.startsWith('I') ||
      subject.subjectTitle.startsWith('J')
    ) {
      return bookNavy;
    }
    // If subject title starts with K-O, return bookCyan
    if (
      subject.subjectTitle.startsWith('K') ||
      subject.subjectTitle.startsWith('L') ||
      subject.subjectTitle.startsWith('M') ||
      subject.subjectTitle.startsWith('N') ||
      subject.subjectTitle.startsWith('O')
    ) {
      return bookCyan;
    }
    // If subject title starts with P-T, return bookRed
    if (
      subject.subjectTitle.startsWith('P') ||
      subject.subjectTitle.startsWith('Q') ||
      subject.subjectTitle.startsWith('R') ||
      subject.subjectTitle.startsWith('S') ||
      subject.subjectTitle.startsWith('T')
    ) {
      return bookRed;
    }
    // If subject title starts with U-Z, return bookGreen
    if (
      subject.subjectTitle.startsWith('U') ||
      subject.subjectTitle.startsWith('V') ||
      subject.subjectTitle.startsWith('W') ||
      subject.subjectTitle.startsWith('X') ||
      subject.subjectTitle.startsWith('Y') ||
      subject.subjectTitle.startsWith('Z')
    ) {
      return bookGreen;
    }
  };

  const handlePress = () => {
    router.push({
      pathname: '/(app)/(story)/storyDetail',
      params: { subjectSlug: subject.subjectSlug },
    } as any);
  };

  return (
    <Pressable
      className="relative h-[150px] w-[224px] items-center justify-center"
      onPress={handlePress}>
      <Image source={bookColour()} className="absolute h-full w-full" resizeMode="contain" />
      <View className="absolute mb-6 items-center justify-center">
        <Text className="font-pixelify mx-4 text-center text-sm text-white opacity-60">
          {capitaliseWord(subject.level)}
        </Text>
        <Text className="font-pixelify mx-4 text-center text-lg text-white">
          {subject.subjectTitle}
        </Text>
      </View>
      {/* Bookmark */}
      <Image
        source={
          subject.level === 'novice'
            ? markNovice
            : subject.level === 'apprentice'
              ? markApprentice
              : markMaster
        }
        className="absolute h-full w-full"
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default StoryBook;
