import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ImageBackground, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BattleArena from '@/components/battle/BattleArena';
import BattleArenaCounter from '@/components/battle/BattleArenaCounter';
import QuizOption from '@/components/quiz/QuizOption';
import { getCharacter, getEnemy } from '@/lib/content';
import { UI_ICONS } from '@/lib/constants/uiIcons';

const QuestRunScreen = () => {
  const backgroundTexture = require('@/assets/textures/wood_planks.png');
  const knowledgeScrollIcon = UI_ICONS.nav.achievements;
  const inventoryIcon = UI_ICONS.nav.inventory;

  const { chapterId } = useLocalSearchParams<{
    chapterId: string;
  }>();

  const userCharacterId = 'heavyKnight_green';
  const userEnemyId = 'bushMonster_default';

  const character = getCharacter(userCharacterId);
  const enemy = getEnemy(userEnemyId);

  const handleCompleteQuest = () => {
    router.push({
      pathname: '/(app)/(story)/(quest)/questResult',
      params: { chapterId },
    } as any);
  };

  const handleQuitQuest = () => {
    router.back();
  };

  // TODO: Fake data here (get from chapterId in params)
  const questionBank = [
    {
      question: 'Which animal classification do squirrels belong to?',
      answers: ['Reptilia', 'Pisces', 'Aves', 'Mammalia'],
      correctAnswer: 3,
    },
    {
      question: 'What is the largest planet in our solar system?',
      answers: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
      correctAnswer: 2,
    },
    {
      question: 'Who painted the Mona Lisa?',
      answers: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correctAnswer: 2,
    },
    {
      question: 'What is the chemical symbol for gold?',
      answers: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
    },
    {
      question: 'Which programming language was created by Brendan Eich?',
      answers: ['Python', 'Java', 'JavaScript', 'C++'],
      correctAnswer: 2,
    },
  ];

  // State for quiz feedback and navigation
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = questionBank[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setIsCorrect(false);

      // Move to next question if not the last one
      if (currentQuestionIndex < questionBank.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // If it's the last question, complete the quest
        handleCompleteQuest();
      }
    }, 2500);
  };

  // On mount, set the current question index to 0
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, []);

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
          playerId={userCharacterId}
          enemyId={userEnemyId}
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
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questionBank.length}
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
                {currentQuestion.question}
              </Text>
            </View>

            {/* Answer Options */}
            <View className="flex-1 flex-col gap-2">
              {currentQuestion.answers.map((answer, index) => (
                <QuizOption
                  key={index}
                  index={index}
                  option={answer}
                  isSelected={selectedAnswer === index}
                  isCorrect={isCorrect}
                  showFeedback={showFeedback}
                  correctAnswerIndex={currentQuestion.correctAnswer}
                  onPress={() => handleAnswerSelect(index)}
                />
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
