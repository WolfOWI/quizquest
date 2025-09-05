import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import Heading from '@/components/typography/Heading';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { useAppStore } from '@/lib/state/appStore';
import {
  AnimatedSprite,
  getFrames,
  type AnimatedSpriteType,
} from '@darrench3140/react-native-sprite-sheet';

const StartScreen = () => {
  const { userDoc, logout, authUser, authStatus } = useAppStore();

  const spriteSource = Image.resolveAssetSource(
    require('@/assets/sprites/playerCharacters/heavy_knight/heavy_knight_red.png')
  );
  const animatedRef = useRef<AnimatedSpriteType>(null);
  const [loop, setLoop] = useState(true);
  const [fps, setFps] = useState(10);
  const [flip, setFlip] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 1 });

  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!userDoc) {
    // TODO: Add proper loading screen
    return (
      <View className="flex-1 items-center justify-center bg-slate-200">
        <Text className="text-lg font-semibold">Loading Start...</Text>
      </View>
    );
  }

  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar title="Start" titleCenter />
      <View className="flex-1 items-center justify-center bg-slate-200">
        <Text className="mb-4 text-xl">Hello {userDoc?.username}!</Text>
        <AnimatedSprite
          ref={animatedRef}
          source={spriteSource}
          spriteSheetSize={{ width: 21840, height: 256 }}
          size={{ width: 364, height: 256 }}
          offset={offset}
          columnRowMapping={[59]}
          frameSize={{ width: 364, height: 256 }}
          defaultAnimationName="idle"
          animations={{
            walk: getFrames(0, 7),
            walk_attack: getFrames(8, 15),
            jump: getFrames(16, 21),
            idle: getFrames(22, 26),
            block: getFrames(27, 31),
            block_hit: getFrames(32, 36),
            attack: getFrames(37, 45),
            rest: getFrames(46, 50),
            die: getFrames(51, 59),
          }}
          inLoop={loop}
          fps={3}
          autoPlay={true}
          styles={{ transform: [{ scaleX: flip ? -1 : 1 }] }}
        />
        <PrimaryBtn label="Logout" variant="stone" onPress={handleLogout} />
      </View>
    </StandardSafeLayout>
  );
};

export default StartScreen;
