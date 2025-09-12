import React from 'react';
import { View, Text, Pressable, ImageBackground, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import { useLocalSearchParams } from 'expo-router';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BattleArena from '@/components/battle/BattleArena';
import BattleArenaCounter from '@/components/battle/BattleArenaCounter';
// import { LinearGradient } from 'expo-linear-gradient';

const QuestRunScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const healthIcon = require('@/assets/icons/health/heartFull.png');
  const knowledgeScrollIcon = require('@/assets/icons/navigation/blueScroll.png');
  const inventoryIcon = require('@/assets/icons/navigation/sackBrown.png');

  const { subjectSlug, subtopicSlug } = useLocalSearchParams<{
    subjectSlug: string;
    subtopicSlug: string;
  }>();

  const handleCompleteQuest = () => {
    router.push({
      pathname: '/(app)/(story)/(quest)/questResult',
      params: { subjectSlug, subtopicSlug },
    } as any);
  };

  const handleQuitQuest = () => {
    router.back();
  };

  const fakeQuestion = {
    question: 'Which animal classification do squirrels belong to?',
    answers: ['Reptilia', 'Pisces', 'Aves', 'Mammalia'],
    correctAnswer: 3,
  };

  const screenHeight = Dimensions.get('window').height;
  const combatSceneHeight = screenHeight * 0.35;
  const statusBarHeight = useSafeAreaInsets().top;

  return (
    <View className="flex-1">
      {/* Combat Scene */}
      <View className="absolute left-0 right-0 top-0" style={{ height: combatSceneHeight }}>
        <BattleArena
          height={combatSceneHeight}
          width="100%"
          playerId="heavyKnight_blue"
          enemyId="goblin_default"
          playerSize={200}
          enemySize={200}
          spriteDistance={400}
          spriteScale={1.0}
          backgroundImage={require('@/assets/images/backgrounds/start.png')}
          showGradientOverlay={true}
          autoPlay={true}
          containerStyle={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
          }}
        />

        {/* Health & question counter */}
        <SafeAreaView className="z-10">
          <BattleArenaCounter
            leftHealth={32} // Enemy Health
            rightHealth={5} // Player Health
            currentQuestion={16}
            totalQuestions={20}
          />
        </SafeAreaView>
      </View>

      {/* Quiz Section */}
      <View className="flex-1 pt-4" style={{ marginTop: combatSceneHeight - statusBarHeight }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={backgroundTexture}
            resizeMode="repeat"
            className="absolute bottom-0 left-0 right-0 top-0"
            style={{ transform: [{ scale: 4 }] }}
          />
          {/* Question & Answers Display */}
          <View className="flex-1 px-4">
            {/* Question */}
            <View className="mb-4 rounded-xl bg-black/50 p-4">
              <Text className="text-center font-pixelify text-base text-white">
                {fakeQuestion.question}
              </Text>
            </View>

            {/* Answer Options */}
            <View className="flex-1 flex-col gap-2">
              {fakeQuestion.answers.map((answer, index) => (
                <Pressable
                  key={index}
                  className="min-h-12 items-center justify-center rounded-xl border border-white/20 bg-black/30 px-4">
                  <Text className="text-center font-pixelify text-base text-white">{answer}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Bottom Navigation */}
          <View className="flex-row items-center justify-between px-4 pb-4">
            <SquareBtn onPress={handleQuitQuest} icon="pause" />
            <View className="flex-row gap-4">
              <Pressable onPress={() => console.log('Knowledge Scroll')}>
                <Image source={knowledgeScrollIcon} className="h-12 w-12" />
              </Pressable>
              <Pressable onPress={() => console.log('Inventory')}>
                <Image source={inventoryIcon} className="h-12 w-12" />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default QuestRunScreen;
