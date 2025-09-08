import { Text } from 'react-native';
import React from 'react';

const Heading = ({
  children,
  className,
  size = 'standard',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'standard' | 'large';
}) => {
  const textSize = size === 'standard' ? 'text-4xl' : 'text-5xl';

  return <Text className={`font-jacquard ${textSize} text-white ${className}`}>{children}</Text>;
};

export default Heading;
