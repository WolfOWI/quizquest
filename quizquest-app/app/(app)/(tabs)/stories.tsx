import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import Heading from '@/components/typography/Heading';
import StoryBook from '@/components/cards/StoryBook';
import { SubjectDoc } from '@/lib/types/curriculum/Curriculum';
import { Timestamp } from 'firebase/firestore';

const StoriesScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');

  // TODO: Temporary Fake data (replace with real data)
  const subjects: SubjectDoc[] = [
    {
      subjectTitle: 'Snakes on a plane',
      subjectSlug: 'snakes-on-a-plane',
      level: 'novice',
      createdAt: Timestamp.now(),
      source: 'generated',
    },
    {
      subjectTitle: 'The 1988 battle of Manhattan Heights',
      subjectSlug: 'the-1988-battle-of-manhattan-heights',
      level: 'apprentice',
      createdAt: Timestamp.now(),
      source: 'generated',
    },
    {
      subjectTitle: 'Lions',
      subjectSlug: 'lions',
      level: 'master',
      createdAt: Timestamp.now(),
      source: 'generated',
    },
  ];

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4} noHorizontalPadding>
      <TopAppBar title="Stories" titleCenter />
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
          {subjects.map((subject) => (
            <StoryBook key={subject.subjectSlug} subject={subject} />
          ))}
        </ScrollView>
      </View>
    </StandardSafeLayout>
  );
};

export default StoriesScreen;
