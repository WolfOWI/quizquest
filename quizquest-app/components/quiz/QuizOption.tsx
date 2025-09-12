import { Text, Pressable } from 'react-native';
import React from 'react';

interface QuizOptionProps {
  index: number;
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  correctAnswerIndex: number;
  onPress: () => void;
}

const QuizOption = ({
  index,
  option,
  isSelected,
  isCorrect,
  showFeedback,
  correctAnswerIndex,
  onPress,
}: QuizOptionProps) => {
  const getBackgroundColor = () => {
    if (!showFeedback) return 'bg-black/30';

    if (isSelected) {
      return isCorrect ? 'bg-green-600/50' : 'bg-red-600/50';
    }

    if (showFeedback && index === correctAnswerIndex) {
      return 'bg-green-600/50';
    }

    return 'bg-black/30';
  };

  const getBorderColor = () => {
    if (!showFeedback) return 'border-white/20';

    if (isSelected) {
      return isCorrect ? 'border-green-400' : 'border-red-400';
    }

    if (showFeedback && index === correctAnswerIndex) {
      return 'border-green-400';
    }

    return 'border-white/20';
  };

  return (
    <Pressable
      className={`min-h-12 items-center justify-center rounded-xl border px-4 ${getBackgroundColor()} ${getBorderColor()}`}
      onPress={onPress}
      disabled={showFeedback}>
      <Text className="text-center font-pixelify text-base text-white">{option}</Text>
    </Pressable>
  );
};

export default QuizOption;
