import React from 'react';
import { View, Text } from 'react-native';

interface QuestionBoxProps {
  question: string;
  subtitle?: string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question, subtitle }) => {
  return (
    <View className="mb-4 rounded-xl bg-black/50 p-4">
      <Text className="text-center font-pixelify text-base text-white">{question}</Text>
      {subtitle && (
        <Text className="mt-2 text-center font-pixelify text-sm text-white/70">{subtitle}</Text>
      )}
    </View>
  );
};

export default QuestionBox;
