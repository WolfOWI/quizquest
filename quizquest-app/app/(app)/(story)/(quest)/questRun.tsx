import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BattleArena from '@/components/battle/BattleArena';
import BattleArenaCounter from '@/components/battle/BattleArenaCounter';
import QuestionRenderer from '@/components/quiz/QuestionRenderer';
import { getCharacter, getEnemy, getEnvironmentBackground } from '@/lib/content';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import {
  FAKE_QUESTION_BANK,
  processQuestionBank,
  selectAnswer,
  resetFeedback,
  moveToNextQuestion,
  transitionToState,
  updateQuestionTiming,
  type QuizState,
  type QuizStateType,
  getQuizStateReadyByQIndex,
} from '@/services/questRunService';
import { Chapter, QuestionItem } from '@/lib/types/curriculum/Curriculum';
import { UserChapterProgress } from '@/lib/types/user/User';

const QuestRunScreen = () => {
  const params = useLocalSearchParams();
  const chapterAndProgress = JSON.parse(params.chapterAndProgress as string) as Chapter &
    UserChapterProgress;

  // TODO: Get all questions from the chapter info

  const handleCompleteQuest = () => {
    router.push({
      pathname: '/(app)/(story)/(quest)/questResult',
      params: {},
    } as any);
  };

  const handleQuitQuest = () => {
    router.back();
  };

  const [quizState, setQuizState] = useState<QuizState | null>(null);

  // Centralised state update function
  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState((prevState) => {
      if (!prevState) return null;
      return { ...prevState, ...updates };
    });
  };

  // On load, initialise the quiz state
  useEffect(() => {
    const processedQuestions = processQuestionBank(FAKE_QUESTION_BANK);
    setQuizState(getQuizStateReadyByQIndex(processedQuestions, 0));
  }, []);

  // On answer select
  const handleAnswerSelect = (index: number) => {
    if (!quizState) return;

    // If something is already selected, and it's not a multi-select, do nothing
    if (quizState.selectedAnswer !== null && !quizState.isMultiSelect) {
      return;
    }

    updateQuizState(selectAnswer(quizState, index));
  };

  const handleStateTransition = (newState: QuizStateType) => {
    updateQuizState(transitionToState(newState));
  };

  const handleContinue = () => {
    if (!quizState) return;

    // Move to next question if not the last one
    if (quizState.isLastQuestion) {
      handleCompleteQuest();
      return;
    }

    // Combine all state updates for the next question
    const nextQuestionUpdates = {
      ...moveToNextQuestion(quizState),
      ...resetFeedback(),
    };

    updateQuizState({
      ...nextQuestionUpdates,
      ...updateQuestionTiming({ ...quizState, ...nextQuestionUpdates }),
    });
  };

  const screenHeight = Dimensions.get('window').height;
  const combatSceneHeight = screenHeight * 0.35;
  const statusBarHeight = useSafeAreaInsets().top;

  // TODO: Setup visual assets
  // Visual Assets
  const userCharacterId = 'heavyKnight_green';
  const userEnemyId = 'bushMonster_default';
  const character = getCharacter(userCharacterId);
  const enemy = getEnemy(userEnemyId);
  const envBackground =
    getEnvironmentBackground(chapterAndProgress.environmentId) ||
    getEnvironmentBackground('castle_courtyard');
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const inventoryIcon = UI_ICONS.nav.inventory;

  const showHintModal = () => {
    console.log('Show hint modal');
  };

  const showExplanationModal = () => {
    console.log('Show explanation modal');
  };

  if (!quizState) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-pixelify text-lg text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Combat Scene */}
      <View className="absolute left-0 right-0 top-0" style={{ height: combatSceneHeight }}>
        <BattleArena
          height={combatSceneHeight}
          width="100%"
          playerId={userCharacterId}
          enemyId={userEnemyId}
          playerSize={200}
          enemySize={200}
          spriteDistance={400}
          spriteScale={1.0}
          backgroundImage={envBackground}
          showGradientOverlay
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
            leftHealth={32} // TODO: Health tracking of enemy
            rightHealth={5} // TODO: Health tracking of player
            currentQuestion={quizState.currentQIndex + 1}
            totalQuestions={quizState.totalQuestions}
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
            <QuestionRenderer
              quizState={quizState}
              onAnswerSelect={handleAnswerSelect}
              onStateTransition={handleStateTransition}
              onContinue={handleContinue}
            />
          </View>

          {/* Bottom Navigation */}
          <View className="flex-row items-center justify-between px-4 pb-4">
            <SquareBtn onPress={handleQuitQuest} icon="pause" />
            <SquareBtn onPress={showHintModal} icon="question" />
            <SquareBtn onPress={showExplanationModal} icon="check" />
            <Pressable onPress={() => console.log('Inventory')}>
              <Image source={inventoryIcon} className="h-12 w-12" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default QuestRunScreen;
