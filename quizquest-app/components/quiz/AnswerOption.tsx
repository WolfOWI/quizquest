import React from 'react';
import { Text, Pressable } from 'react-native';

interface AnswerOptionProps {
  index: number;
  option: string;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  correctAnswerIndex: number | number[];
  onPress: () => void;
  disabled?: boolean;
  isMultiSelect?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  option,
  isSelected,
  isCorrect,
  showFeedback,
  correctAnswerIndex,
  onPress,
  disabled = false,
  isMultiSelect = false,
}) => {
  const isOptionCorrect = Array.isArray(correctAnswerIndex)
    ? correctAnswerIndex.includes(index)
    : index === correctAnswerIndex;

  const getBackgroundColor = () => {
    if (!showFeedback) {
      return isSelected ? (isMultiSelect ? 'bg-blue-600/50' : 'bg-black/30') : 'bg-black/30';
    }

    // Show feedback: correct options as green, wrong selected options as red
    if (isOptionCorrect) {
      return 'bg-green-600/50';
    }

    if (isSelected && !isOptionCorrect) {
      return 'bg-red-600/50';
    }

    return 'bg-black/30';
  };

  const getBorderColor = () => {
    if (!showFeedback) {
      return isSelected
        ? isMultiSelect
          ? 'border-blue-400'
          : 'border-white/20'
        : 'border-white/20';
    }

    // Show feedback: correct options as green, wrong selected options as red
    if (isOptionCorrect) {
      return 'border-green-400';
    }

    if (isSelected && !isOptionCorrect) {
      return 'border-red-400';
    }

    return 'border-white/20';
  };

  return (
    <Pressable
      className={`min-h-12 items-center justify-center rounded-xl border px-4 ${getBackgroundColor()} ${getBorderColor()}`}
      onPress={onPress}
      disabled={disabled || (showFeedback && !isMultiSelect)}>
      <Text className="text-center font-pixelify text-base text-white">{option}</Text>
    </Pressable>
  );
};

export default AnswerOption;
