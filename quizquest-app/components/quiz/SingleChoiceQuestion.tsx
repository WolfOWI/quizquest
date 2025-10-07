import React from 'react';
import { View } from 'react-native';
import AnswerOption from './AnswerOption';
import QuestionBox from './QuestionBox';
import AnswerOptionsContainer from './AnswerOptionsContainer';

interface SingleChoiceQuestionProps {
  question: string;
  choices: string[];
  correctAnswerIndex: number[];
  selectedAnswer: number | null;
  showFeedback: boolean;
  isCorrect: boolean;
  onAnswerSelect: (index: number) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  choices,
  correctAnswerIndex,
  selectedAnswer,
  showFeedback,
  isCorrect,
  onAnswerSelect,
}) => {
  return (
    <View className="flex-1">
      <QuestionBox question={question} />

      <AnswerOptionsContainer>
        {choices.map((choice: string, index: number) => (
          <AnswerOption
            key={index}
            index={index}
            option={choice}
            isSelected={selectedAnswer === index}
            isCorrect={isCorrect}
            showFeedback={showFeedback}
            correctAnswerIndex={correctAnswerIndex[0]} // Single choice has one correct answer
            onPress={() => onAnswerSelect(index)}
            isMultiSelect={false}
          />
        ))}
      </AnswerOptionsContainer>
    </View>
  );
};

export default SingleChoiceQuestion;
