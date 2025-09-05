import React from 'react';
import { Pressable, ImageBackground } from 'react-native';
import { SquareBtnIcons, BtnMaterialVariants } from '@/lib/types/ui-related/UIButtons';

// Back
const backStoneIdle = require('@/assets/ui-assets/buttons/square/back/back-stone-idle.png');
const backStoneDown = require('@/assets/ui-assets/buttons/square/back/back-stone-down.png');
const backWoodIdle = require('@/assets/ui-assets/buttons/square/back/back-wood-idle.png');
const backWoodDown = require('@/assets/ui-assets/buttons/square/back/back-wood-down.png');
// Check
const checkStoneIdle = require('@/assets/ui-assets/buttons/square/check/check-stone-idle.png');
const checkStoneDown = require('@/assets/ui-assets/buttons/square/check/check-stone-down.png');
const checkWoodIdle = require('@/assets/ui-assets/buttons/square/check/check-wood-idle.png');
const checkWoodDown = require('@/assets/ui-assets/buttons/square/check/check-wood-down.png');
// Close
const closeStoneIdle = require('@/assets/ui-assets/buttons/square/close/close-stone-idle.png');
const closeStoneDown = require('@/assets/ui-assets/buttons/square/close/close-stone-down.png');
const closeWoodIdle = require('@/assets/ui-assets/buttons/square/close/close-wood-idle.png');
const closeWoodDown = require('@/assets/ui-assets/buttons/square/close/close-wood-down.png');
// Edit
const editStoneIdle = require('@/assets/ui-assets/buttons/square/edit/edit-stone-idle.png');
const editStoneDown = require('@/assets/ui-assets/buttons/square/edit/edit-stone-down.png');
const editWoodIdle = require('@/assets/ui-assets/buttons/square/edit/edit-wood-idle.png');
const editWoodDown = require('@/assets/ui-assets/buttons/square/edit/edit-wood-down.png');
// Minus
const minusStoneIdle = require('@/assets/ui-assets/buttons/square/minus/minus-stone-idle.png');
const minusStoneDown = require('@/assets/ui-assets/buttons/square/minus/minus-stone-down.png');
const minusWoodIdle = require('@/assets/ui-assets/buttons/square/minus/minus-wood-idle.png');
const minusWoodDown = require('@/assets/ui-assets/buttons/square/minus/minus-wood-down.png');
// Play
const playStoneIdle = require('@/assets/ui-assets/buttons/square/play/play-stone-idle.png');
const playStoneDown = require('@/assets/ui-assets/buttons/square/play/play-stone-down.png');
const playWoodIdle = require('@/assets/ui-assets/buttons/square/play/play-wood-idle.png');
const playWoodDown = require('@/assets/ui-assets/buttons/square/play/play-wood-down.png');
// Pause
const pauseStoneIdle = require('@/assets/ui-assets/buttons/square/pause/pause-stone-idle.png');
const pauseStoneDown = require('@/assets/ui-assets/buttons/square/pause/pause-stone-down.png');
const pauseWoodIdle = require('@/assets/ui-assets/buttons/square/pause/pause-wood-idle.png');
const pauseWoodDown = require('@/assets/ui-assets/buttons/square/pause/pause-wood-down.png');
// Plus
const plusStoneIdle = require('@/assets/ui-assets/buttons/square/plus/plus-stone-idle.png');
const plusStoneDown = require('@/assets/ui-assets/buttons/square/plus/plus-stone-down.png');
const plusWoodIdle = require('@/assets/ui-assets/buttons/square/plus/plus-wood-idle.png');
const plusWoodDown = require('@/assets/ui-assets/buttons/square/plus/plus-wood-down.png');
// Question
const questionStoneIdle = require('@/assets/ui-assets/buttons/square/question/question-stone-idle.png');
const questionStoneDown = require('@/assets/ui-assets/buttons/square/question/question-stone-down.png');
const questionWoodIdle = require('@/assets/ui-assets/buttons/square/question/question-wood-idle.png');
const questionWoodDown = require('@/assets/ui-assets/buttons/square/question/question-wood-down.png');
// Replay
const replayStoneIdle = require('@/assets/ui-assets/buttons/square/replay/replay-stone-idle.png');
const replayStoneDown = require('@/assets/ui-assets/buttons/square/replay/replay-stone-down.png');
const replayWoodIdle = require('@/assets/ui-assets/buttons/square/replay/replay-wood-idle.png');
const replayWoodDown = require('@/assets/ui-assets/buttons/square/replay/replay-wood-down.png');

type Props = {
  onPress?: () => void;
  width?: number;
  height?: number;
  disabled?: boolean;
  variant?: BtnMaterialVariants;
  icon?: SquareBtnIcons;
};

export function SquareBtn({
  onPress,
  width = 64,
  height = 64,
  disabled,
  variant = 'wood',
  icon = 'play',
}: Props) {
  let idle = null;
  let down = null;

  if (variant === 'stone') {
    switch (icon) {
      case 'back':
        idle = backStoneIdle;
        down = backStoneDown;
        break;
      case 'check':
        idle = checkStoneIdle;
        down = checkStoneDown;
        break;
      case 'close':
        idle = closeStoneIdle;
        down = closeStoneDown;
        break;
      case 'minus':
        idle = minusStoneIdle;
        down = minusStoneDown;
        break;
      case 'play':
        idle = playStoneIdle;
        down = playStoneDown;
        break;
      case 'pause':
        idle = pauseStoneIdle;
        down = pauseStoneDown;
        break;
      case 'plus':
        idle = plusStoneIdle;
        down = plusStoneDown;
        break;
      case 'question':
        idle = questionStoneIdle;
        down = questionStoneDown;
        break;
      case 'replay':
        idle = replayStoneIdle;
        down = replayStoneDown;
        break;
    }
  } else {
    switch (icon) {
      case 'back':
        idle = backWoodIdle;
        down = backWoodDown;
        break;
      case 'check':
        idle = checkWoodIdle;
        down = checkWoodDown;
        break;
      case 'close':
        idle = closeWoodIdle;
        down = closeWoodDown;
        break;
      case 'edit':
        idle = editWoodIdle;
        down = editWoodDown;
        break;
      case 'minus':
        idle = minusWoodIdle;
        down = minusWoodDown;
        break;
      case 'play':
        idle = playWoodIdle;
        down = playWoodDown;
        break;
      case 'pause':
        idle = pauseWoodIdle;
        down = pauseWoodDown;
        break;
      case 'plus':
        idle = plusWoodIdle;
        down = plusWoodDown;
        break;
      case 'question':
        idle = questionWoodIdle;
        down = questionWoodDown;
        break;
      case 'replay':
        idle = replayWoodIdle;
        down = replayWoodDown;
        break;
    }
  }

  return (
    <Pressable onPress={onPress} disabled={disabled} style={{ width, height }}>
      {({ pressed }) => (
        <ImageBackground
          source={pressed && !disabled ? down : idle}
          style={{
            width,
            height,
            opacity: disabled ? 0.6 : 1,
          }}></ImageBackground>
      )}
    </Pressable>
  );
}
