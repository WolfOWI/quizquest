import { Text } from 'react-native';
import React from 'react';

const Subheading = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <Text className={`mb-2 font-kenney text-lg text-white ${className}`}>{children}</Text>;
};

export default Subheading;
