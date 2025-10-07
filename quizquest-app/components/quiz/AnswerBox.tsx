import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface AnswerBoxProps {
  children?: React.ReactNode;
  isEmpty?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({
  children,
  isEmpty = false,
  onPress,
  disabled = false,
  className = '',
}) => {
  const baseClasses =
    'min-h-12 items-center justify-center rounded-xl border border-white/20 bg-black/30 px-4';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (isEmpty) {
    return <View className={combinedClasses} />;
  }

  if (onPress) {
    return (
      <Pressable className={combinedClasses} onPress={onPress} disabled={disabled}>
        {children}
      </Pressable>
    );
  }

  return <View className={combinedClasses}>{children}</View>;
};

export default AnswerBox;
