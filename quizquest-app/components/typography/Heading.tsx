import { Text } from 'react-native';
import React from 'react';

const Heading = ({
  children,
  className,
  size = 'standard',
  color = 'text-white',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'standard' | 'large';
  color?: string | 'text-white';
}) => {
  const textSize = size === 'standard' ? 'text-4xl' : 'text-5xl';

  return <Text className={`font-jacquard ${textSize} ${color} ${className}`}>{children}</Text>;
};

export default Heading;
