import { View, Text } from 'react-native';
import React from 'react';
import { SquareBtn } from '@/components/buttons/square/SquareBtn';
import Heading from '@/components/typography/Heading';
import { BtnMaterialVariants, SquareBtnIcons } from '@/lib/types/ui-related/UIButtons';

type Props = {
  leftButtonIcon?: SquareBtnIcons;
  leftButtonPress?: () => void;
  title?: string;
  pretitle?: string;
  titleCenter?: boolean;
  rightButtonIcon?: SquareBtnIcons;
  rightButtonPress?: () => void;
  buttonVariant?: BtnMaterialVariants;
};

const TopAppBar = ({
  leftButtonIcon,
  leftButtonPress,
  title,
  pretitle,
  titleCenter = false,
  rightButtonIcon,
  rightButtonPress,
  buttonVariant = 'stone',
}: Props) => {
  return (
    <View className={`relative h-16 w-full flex-row items-center justify-between`}>
      {leftButtonIcon && (
        <SquareBtn icon={leftButtonIcon} onPress={leftButtonPress} variant={buttonVariant} />
      )}

      <View
        className={`flex-col items-center ${titleCenter && `absolute left-1/2 -translate-x-1/2`}`}>
        {pretitle && <Text className="font-kenney text-white">{pretitle}</Text>}
        {title && <Heading>{title}</Heading>}
      </View>

      {/* Invisible spacer to ensure right button is aligned to the right (when titleCenter is true) */}
      {titleCenter && rightButtonIcon && <View className="h-1 w-1"></View>}

      {rightButtonIcon && (
        <View>
          <SquareBtn icon={rightButtonIcon} onPress={rightButtonPress} variant={buttonVariant} />
        </View>
      )}
    </View>
  );
};

export default TopAppBar;
