import React from 'react';
import { View } from 'react-native';
import AnswerOption from './AnswerOption';
import QuestionBox from './QuestionBox';
import AnswerOptionsContainer from './AnswerOptionsContainer';

interface MultiSelectQuestionProps {
  question: string;
  choices: string[];
  correctAnswerIndex: number[];
  selectedAnswers: number[];
  showFeedback: boolean;
  isCorrect: boolean;
  isComplete: boolean;
  onAnswerSelect: (index: number) => void;
}

const MultiSelectQuestion: React.FC<MultiSelectQuestionProps> = ({
  question,
  choices,
  correctAnswerIndex,
  selectedAnswers,
  showFeedback,
  isCorrect,
  isComplete,
  onAnswerSelect,
}) => {
  return (
    <View className="flex-1">
      <QuestionBox
        question={question}
        subtitle={`Select ${selectedAnswers.length}/${correctAnswerIndex.length}`}
      />

      <AnswerOptionsContainer>
        {choices.map((choice: string, index: number) => {
          const isMaxSelected = selectedAnswers.length >= correctAnswerIndex.length;
          const shouldDisable = (showFeedback && isComplete) || isMaxSelected;

          return (
            <AnswerOption
              key={index}
              index={index}
              option={choice}
              isSelected={selectedAnswers.includes(index)}
              isCorrect={correctAnswerIndex.includes(index)}
              showFeedback={showFeedback}
              correctAnswerIndex={correctAnswerIndex}
              onPress={() => onAnswerSelect(index)}
              disabled={shouldDisable}
              isMultiSelect={true}
            />
          );
        })}
      </AnswerOptionsContainer>
    </View>
  );
};

export default MultiSelectQuestion;
