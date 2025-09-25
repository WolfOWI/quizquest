import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Subject } from '@/lib/types/curriculum/Curriculum';
import { capitaliseWordAndRemoveUnderscores } from '@/lib/utils/textUtils';
import { UI_ICONS } from '@/lib/constants/uiIcons';

interface SubjectListItemProps {
  subject: Subject;
  onPress: () => void;
}

const SubjectListItem = ({ subject, onPress }: SubjectListItemProps) => {
  const getDifficultyDots = () => {
    const dots = [];
    const levels = subject.levelsAvailable;

    // Green dot for novice
    if (levels.includes('novice')) {
      dots.push(<View key="novice" className="h-2 w-2 bg-green-500" />);
    }

    // Orange dot for apprentice
    if (levels.includes('apprentice')) {
      dots.push(<View key="apprentice" className="h-2 w-2 bg-orange-500" />);
    }

    // Red dot for master
    if (levels.includes('master')) {
      dots.push(<View key="master" className="h-2 w-2 bg-red-500" />);
    }

    return dots;
  };

  return (
    <Pressable onPress={onPress} className="mb-3 flex-row items-center rounded-lg bg-white/10 p-4">
      {/* Book Icon */}
      <View className="mr-4 h-12 w-12 items-center justify-center">
        <Image source={UI_ICONS.curriculum.subjectBook} className="h-12 w-12" />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="font-pixelify text-lg text-white">{subject.title}</Text>
        <Text className="font-pixelify text-sm text-white/70">
          {capitaliseWordAndRemoveUnderscores(subject.domainId)}
        </Text>
      </View>

      {/* Difficulty Dots */}
      <View className="flex-row gap-1">{getDifficultyDots()}</View>
    </Pressable>
  );
};

export default SubjectListItem;
