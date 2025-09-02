import React from 'react';
import { Pressable, ImageBackground, View, Image, Text } from 'react-native';
import { BtnMaterialVariants } from '@/lib/types/ui-related/UIButtons';

const woodBackground = require('@/assets/ui-assets/buttons/standard/primary-wood.png');
const stoneBackground = require('@/assets/ui-assets/buttons/standard/primary-stone.png');

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  label: string;
  variant?: BtnMaterialVariants;
};

export function PrimaryBtn({ onPress, disabled, label, variant = 'wood' }: Props) {
  const btnHeight = 72;
  return (
    <Pressable onPress={onPress} disabled={disabled} className="w-full">
      <ImageBackground
        source={variant === 'wood' ? woodBackground : stoneBackground}
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
