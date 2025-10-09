import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Pressable, ImageBackground, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BattleArena from '@/components/battle/BattleArena';
import BattleArenaCounter from '@/components/battle/BattleArenaCounter';
import PowerAttackBar from '@/components/battle/PowerAttackBar';
import QuestionRenderer from '@/components/quiz/QuestionRenderer';
import HintModal from '@/components/modals/HintModal';
import ExplanationModal from '@/components/modals/ExplanationModal';
import {
  getCharacter,
  getEnemy,
  getEnvironmentBackground,
  getTextureResource,
} from '@/lib/content';
import { UI_ICONS } from '@/lib/constants/uiIcons';
import {
  FAKE_QUESTION_BANK,
  processQuestionBank,
  selectAnswer,
  resetFeedback,
  moveToNextQuestion,
  updateQuestionTiming,
  type QuizState,
  type QuizPhaseType,
  getQuizStateReadyByQIndex,
} from '@/services/questRun/questRunService';
import {
  getEnemyAttackDmg,
  spawnNewEnemy,
  isPlayerDefeated,
  isEnemyDefeated,
  type HealthState,
  damageEnemy,
  damagePlayer,
  getInitialHealthState,
} from '@/services/questRun/questRunHealthService';
import { Chapter, QuestionItem, Story } from '@/lib/types/curriculum/Curriculum';
import { UserChapterProgress } from '@/lib/types/user/User';

const QuestRunScreen = () => {
  const params = useLocalSearchParams();
  const chapterAndProgress = JSON.parse(params.chapterAndProgress as string) as Chapter &
    UserChapterProgress;
  const story = JSON.parse(params.story as string) as Story;

  // TODO: Get all questions from the chapter info

  const handleWinQuest = () => {
    router.push({
      pathname: '/(app)/(story)/(quest)/questVictory',
      params: {
        story: JSON.stringify(story),
        chapterAndProgress: JSON.stringify(chapterAndProgress),
      },
    } as any);
  };

  const handleQuitQuest = () => {
    router.back();
  };

  const handleDefeatQuest = () => {
    router.push({
      pathname: '/(app)/(story)/(quest)/questDefeat',
      params: {
        story: JSON.stringify(story),
        chapterAndProgress: JSON.stringify(chapterAndProgress),
      },
    } as any);
  };

  // Quiz State
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  // Health State
  const [healthState, setHealthState] = useState<HealthState | null>(null);

  // Modal state
  const [hintModalVisible, setHintModalVisible] = useState(false);
  const [explanationModalVisible, setExplanationModalVisible] = useState(false);

  // Centralised state update function
  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState((prevState) => {
      if (!prevState) return null;
      return { ...prevState, ...updates };
    });
  };

  // TODO: Remove this later
  useEffect(() => {
    console.log('🏥 Health State Updated:', healthState);
  }, [healthState]);

  // At start, create quiz & health state
  useEffect(() => {
    const processedQuestions = processQuestionBank(FAKE_QUESTION_BANK);
    setQuizState(getQuizStateReadyByQIndex(processedQuestions, 0));

    setHealthState(getInitialHealthState(chapterAndProgress, story));
  }, [chapterAndProgress.chapterId]);

  // Defeat when player health = 0
  useEffect(() => {
    if (healthState && isPlayerDefeated(healthState.playerHealth)) {
      handleDefeatQuest();
    }
  }, [healthState?.playerHealth]);

  // Spawn new enemy when enemy health = 0
  useEffect(() => {
    if (healthState && isEnemyDefeated(healthState.enemyHealth)) {
      const { newEnemyId, newEnemyHealth } = spawnNewEnemy(healthState.enemyLineup);
      setHealthState((prev) =>
        prev
          ? {
              ...prev,
              currentEnemyId: newEnemyId,
              enemyHealth: newEnemyHealth,
            }
          : null
      );
    }
  }, [healthState?.enemyHealth]);

  const handleAnswerSelect = (index: number) => {
    if (!quizState || !healthState) return;

    // if (quizState.selectedAnswer !== null && !quizState.isMultiSelect) {
    //   return;
    // }

    const updatedState = selectAnswer(quizState, index);
    updateQuizState(updatedState);

    // Only apply health changes when the question is complete and feedback is shown
    const questionIsAnswered =
      updatedState.isCorrect !== undefined &&
      (!quizState.isMultiSelect || updatedState.showFeedback);

    if (questionIsAnswered) {
      if (!updatedState.isCorrect) {
        // Incorrect answer - enemy attacks player
        const enemyDamage = getEnemyAttackDmg(healthState.currentEnemyId);
        const newPlayerHealth = damagePlayer(healthState.playerHealth, enemyDamage);
        setHealthState((prev) =>
          prev
            ? {
                ...prev,
                playerHealth: newPlayerHealth,
              }
            : null
        );
      }
    }
  };

  const handleStateTransition = (newState: QuizPhaseType) => {
    updateQuizState({ currentPhase: newState });
  };

  const handlePowerAttackDamage = useCallback(
    (damage: number) => {
      // Apply damage to enemy if the answer was correct and we have damage
      if (damage > 0 && healthState) {
        const newEnemyHealth = damageEnemy(healthState.enemyHealth, damage);
        setHealthState((prev) =>
          prev
            ? {
                ...prev,
                enemyHealth: newEnemyHealth,
              }
            : null
        );
      }
    },
    [healthState]
  );

  const handleContinue = () => {
    if (!quizState) return;

    // Move to next question if not the last one
    if (quizState.isLastQuestion) {
      handleWinQuest();
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
  const character = getCharacter(userCharacterId);
  const enemy = healthState ? getEnemy(healthState.currentEnemyId) : null;
  const envBackground =
    getEnvironmentBackground(chapterAndProgress.environmentId) ||
    getEnvironmentBackground('castle_courtyard');
  const backgroundTexture = getTextureResource('wood_planks');
  const inventoryIcon = UI_ICONS.nav.inventory;

  const showHintModal = () => {
    setHintModalVisible(true);
  };

  const showExplanationModal = () => {
    setExplanationModalVisible(true);
  };

  const closeHintModal = () => {
    setHintModalVisible(false);
  };

  const closeExplanationModal = () => {
    setExplanationModalVisible(false);
  };

  // TODO: Remove this later
  // useEffect(() => {
  //   console.log('Quiz State', quizState);
  // }, [quizState]);

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
          enemyId={healthState?.currentEnemyId || 'bushMonster_default'}
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
          {healthState && (
            <BattleArenaCounter
              leftHealth={healthState.enemyHealth || 0}
              rightHealth={healthState.playerHealth || 0}
              currentQuestion={quizState.currentQIndex + 1}
              totalNumQuestions={quizState.totalNumQuestions}
            />
          )}
          {/* TODO: Delete later */}
          <Pressable onPress={handleWinQuest} className="absolute bottom-0 left-0">
            <Text className="font-pixelify text-base text-white">Win</Text>
          </Pressable>
          {/* TODO: Delete later */}
          <Pressable onPress={handleDefeatQuest} className="absolute bottom-0 right-0">
            <Text className="font-pixelify text-base text-white">Defeat</Text>
          </Pressable>
        </SafeAreaView>
      </View>

      {/* Quiz Section */}
      <View className="flex-1 pt-2" style={{ marginTop: combatSceneHeight - statusBarHeight }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Background Texture */}
          <ImageBackground
            source={backgroundTexture}
            resizeMode="repeat"
            className="absolute bottom-0 left-0 right-0 top-0"
            style={{ transform: [{ scale: 4 }] }}
          />
          {/* Question & Answers Display */}
          <View className="flex-1 px-4">
            {/* Power Attack Bar */}
            <PowerAttackBar
              isActive={quizState.currentPhase === 'q-and-a'}
              onDamageCalculated={handlePowerAttackDamage}
              isCorrect={quizState.isCorrect}
              currentPhase={quizState.currentPhase}
            />

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
            {/* Hint modal & Explanation modal swaps based on state */}
            {quizState.currentPhase !== 'answered' ? (
              <Pressable
                onPress={showHintModal}
                className="items-center justify-center rounded-full border-2 border-treasureYellow px-4 py-2">
                <Text className="font-pixelifyBold text-base text-treasureYellow">Hint</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={showExplanationModal}
                className="items-center justify-center rounded-full border-2 border-treasureYellow px-4 py-2">
                <Text className="font-pixelifyBold text-base text-treasureYellow">Explain</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => console.log('Inventory')}
              style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={inventoryIcon} className="h-12 w-12" />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      {/* Modals */}
      <HintModal
        visible={hintModalVisible}
        onClose={closeHintModal}
        onModalHide={closeHintModal}
        hintText={quizState?.currentQuestion?.hint || 'No hint available for this question.'}
      />

      <ExplanationModal
        visible={explanationModalVisible}
        onClose={closeExplanationModal}
        onModalHide={closeExplanationModal}
        explanationText={
          quizState?.currentQuestion?.explanation || 'No explanation available for this question.'
        }
      />
    </View>
  );
};

export default QuestRunScreen;
