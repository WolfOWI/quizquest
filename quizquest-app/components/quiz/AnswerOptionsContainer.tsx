import React from 'react';
import { View } from 'react-native';

interface AnswerOptionsContainerProps {
  children: React.ReactNode;
  className?: string;
}

const AnswerOptionsContainer: React.FC<AnswerOptionsContainerProps> = ({
  children,
  className = '',
}) => {
  const baseClasses = 'flex-1 flex-col gap-2';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return <View className={combinedClasses}>{children}</View>;
};

export default AnswerOptionsContainer;
