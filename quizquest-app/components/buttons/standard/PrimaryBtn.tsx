import React from 'react';
import { Pressable, ImageBackground, View, Image, Text } from 'react-native';

const background = require('@/assets/ui-assets/buttons/standard/primary.png');

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  label: string;
};

export function PrimaryBtn({ onPress, disabled, label }: Props) {
  const btnHeight = 72;
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <ImageBackground
        source={background}
        resizeMode="contain"
        style={{
          height: btnHeight,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: disabled ? 0.6 : 1,
        }}>
        <Text className="font-kenney mb-2 text-center text-2xl text-white">{label}</Text>
      </ImageBackground>
    </Pressable>
  );
}
