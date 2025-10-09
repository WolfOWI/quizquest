import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { QuizState, QuizStateType } from '@/services/questRun/questRunService';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultiSelectQuestion from './MultiSelectQuestion';
import QuestionBox from './QuestionBox';
import AnswerBox from './AnswerBox';
import AnswerOptionsContainer from './AnswerOptionsContainer';

interface QuestionRendererProps {
  quizState: QuizState;
  onAnswerSelect: (index: number) => void;
  onStateTransition: (newState: QuizStateType) => void;
  onContinue: () => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  quizState,
  onAnswerSelect,
  onStateTransition,
  onContinue,
}) => {
  const {
    currentState,
    currentQuestion,
    selectedAnswer,
    showFeedback,
    isCorrect,
    showContinuePrompt,
    questionReadTime,
    isMultiSelect,
    isComplete,
    selectedCount,
    requiredCount,
  } = quizState;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (currentState === 'q-only') {
      timer = setTimeout(() => onStateTransition('q-and-a'), questionReadTime);
    }

    return () => clearTimeout(timer);
  }, [currentState, onStateTransition, questionReadTime]);

  if (currentState === 'q-only') {
    return (
      <View className="flex-1">
        <QuestionBox question={currentQuestion?.question || ''} />

        <AnswerOptionsContainer>
          {currentQuestion?.choices?.map((_, index) => <AnswerBox key={index} isEmpty />) || (
            <AnswerBox isEmpty />
          )}
        </AnswerOptionsContainer>
        <>
          <View className="items-center">
            <Text className="my-4 font-pixelify text-xl text-white"></Text>
          </View>
        </>
      </View>
    );
  }

  // Show question and answers
  if (!currentQuestion) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="font-pixelify text-lg text-white">No question available</Text>
      </View>
    );
  }

  const questionProps = {
    question: currentQuestion.question,
    choices: currentQuestion.choices,
    correctAnswerIndex: currentQuestion.correctAnswerIndex,
    showFeedback,
    isCorrect,
    onAnswerSelect,
  };

  const renderQuestion = () => {
    if (currentQuestion.kind === 'multiSelect') {
      return (
        <MultiSelectQuestion
          {...questionProps}
          selectedAnswers={selectedAnswer || []}
          isComplete={isComplete}
        />
      );
    }

    // Single select or true/false
    return <SingleChoiceQuestion {...questionProps} selectedAnswer={selectedAnswer?.[0] ?? null} />;
  };

  // If showing continue prompt, wrap everything in a tappable area
  if (showContinuePrompt) {
    return (
      <Pressable className="flex-1" onPress={onContinue}>
        {renderQuestion()}
        <View className="items-center">
          <Text className="my-4 font-pixelify text-xl text-white">Tap to Continue</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <>
      {renderQuestion()}
      <View className="items-center">
        <Text className="my-4 font-pixelify text-xl text-white"></Text>
      </View>
    </>
  );
};

export default QuestionRenderer;
