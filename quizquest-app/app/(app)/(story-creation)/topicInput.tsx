import React, { useState } from 'react';
import { View, Text, Pressable, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AudienceLevel } from '@/lib/types/curriculum/Curriculum';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { capitaliseAllWords } from '@/lib/utils/textUtils';
import { getDifficultyIcon } from '@/lib/utils/iconUtils';

const TopicInputScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_smallplanks.png');

  const [subject, setSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<AudienceLevel>('novice');

  const levels: { value: AudienceLevel; label: string; description: string }[] = [
    {
      value: 'novice',
      label: 'Novice',
      description: 'A light quest for casual learners',
    },
    {
      value: 'apprentice',
      label: 'Apprentice',
      description: 'A worthy challenge, school/college level',
    },
    {
      value: 'master',
      label: 'Master',
      description: 'A grand trial of wisdom, for experts',
    },
  ];

  const handleContinue = () => {
    if (!subject.trim()) {
      Alert.alert('Error', 'Please enter a subject for your story.');
      return;
    }

    router.push({
      pathname: '/(app)/(story-creation)/aiValidation' as any,
      params: {
        subject: subject.trim(),
        level: selectedLevel,
      },
    });
  };

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={2}>
      <TopAppBar
        title="New Story"
        titleSize="large"
        rightButtonIcon="close"
        rightButtonPress={() => router.back()}
        buttonVariant="wood"
      />

      <View className="flex-1 gap-8">
        <View className="mt-4">
          <Text className="mb-2 font-kenney text-2xl font-bold text-white">
            What's your story about?
          </Text>
          <Text className="font-pixelify text-base text-gray-300">
            Name your subject, and the guild will craft it into an engaging quiz story.
          </Text>
        </View>

        <View>
          <Label className="mb-3 font-kenney text-lg text-white">Subject</Label>
          <Input
            placeholder="E.g. Space exploration, Squirrels, Japan..."
            value={capitaliseAllWords(subject)}
            onChangeText={setSubject}
            className="border-white/20 font-pixelify text-white"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View>
          <Label className="mb-3 font-kenney text-lg text-white">Difficulty</Label>
          <View className="gap-2">
            {levels.map((level) => (
              <Pressable
                key={level.value}
                onPress={() => setSelectedLevel(level.value)}
                className={`rounded-lg border-2 p-4 ${
                  selectedLevel === level.value
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-transparent bg-white/5'
                }`}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="font-pixelifySemibold text-lg text-white">{level.label}</Text>
                    <Text className="font-pixelify text-sm text-gray-300">{level.description}</Text>
                  </View>
                  <View
                    className={`h-8 w-8 items-center justify-center rounded-full ${
                      selectedLevel === level.value && 'bg-zinc-900/70'
                    }`}>
                    <Image
                      source={getDifficultyIcon(level.value)}
                      className={` ${
                        selectedLevel === level.value ? 'h-8 w-8 opacity-100' : 'h-6 w-6 opacity-25'
                      }`}
                    />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View className="mt-auto">
        <PrimaryBtn onPress={handleContinue} label="Continue" />
      </View>
    </StandardSafeLayout>
  );
};

export default TopicInputScreen;
