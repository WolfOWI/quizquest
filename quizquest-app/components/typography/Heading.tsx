import { Text } from 'react-native';
import React from 'react';

const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <Text className={`font-kenney text-4xl text-white ${className}`}>{children}</Text>;
};

export default Heading;
