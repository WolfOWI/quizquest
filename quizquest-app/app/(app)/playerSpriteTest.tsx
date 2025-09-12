import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';
import { CharacterData } from '@/lib/constants/sprites/PlayerSpriteData';
import { getSpriteData } from '@/lib/utils/spriteUtils';

const PlayerSpriteTestScreen = () => {
  const { spriteRef, playAnimation, play2AnimationSequence, stopAnimation } = useSpriteAnimation();

  const [selectedCharacterId, setSelectedCharacterId] = useState('heavyKnight_red');
  const [currentDisplayedAnimation, setCurrentDisplayedAnimation] = useState('idle');

  const backgroundTexture = require('@/assets/textures/bricks_castle.png');

  const characterGroups = {
    heavyKnight: CharacterData.heavyKnight.skins,
    samurai: CharacterData.samurai.skins,
    mage: CharacterData.mage.skins,
  };

  const handleCharacterChange = (characterId: string) => {
    setSelectedCharacterId(characterId);
  };

  const handlePlayAnimation = (animation: string, loop: boolean = true) => {
    setCurrentDisplayedAnimation(animation);
    stopAnimation();
    setTimeout(() => {
      playAnimation(animation, loop, 10);
    }, 50);
  };

  const handlePlaySequence = () => {
    setCurrentDisplayedAnimation('attack → idle');
    stopAnimation();
    setTimeout(() => {
      play2AnimationSequence(['attack', 'idle'], selectedCharacterId, true, 10);
    }, 50);
  };

  const handleBlockHitSequence = () => {
    setCurrentDisplayedAnimation('block_hit → idle');
    stopAnimation();
    setTimeout(() => {
      play2AnimationSequence(['block_hit', 'idle'], selectedCharacterId, true, 10);
    }, 50);
  };

  const handleDieOnce = () => {
    setCurrentDisplayedAnimation('die');
    stopAnimation();
    setTimeout(() => {
      playAnimation('die', false, 10);
    }, 50);
  };

  // Get current character data
  const currentCharacterData = getSpriteData(selectedCharacterId);

  // Auto-start idle animation when component mounts or character changes
  useEffect(() => {
    const timer = setTimeout(() => {
      playAnimation('idle', true, 10);
    }, 100); // Small delay to ensure sprite is ready

    return () => clearTimeout(timer);
  }, [selectedCharacterId, playAnimation]);

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4}>
      <TopAppBar
        title="Players"
        titleCenter
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
      />
      <ScrollView className="flex-1 p-4">
        <View className="items-center space-y-6">
          {/* Character Selection */}
          <View className="w-full">
            <Text className="mb-2 text-lg font-bold text-white">1. Select Character Skin</Text>
            <ScrollView className="max-h-40">
              {Object.entries(characterGroups).map(([characterType, skins]) => (
                <View key={characterType} className="mb-4">
                  <Text className="mb-2 text-sm font-semibold capitalize text-yellow-400">
                    {characterType.replace('_', ' ')}
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {skins.map((characterId) => (
                      <Pressable
                        key={characterId}
                        className={`rounded px-3 py-2 ${
                          selectedCharacterId === characterId ? 'bg-yellow-600' : 'bg-gray-600'
                        }`}
                        onPress={() => handleCharacterChange(characterId)}>
                        <Text className="text-xs text-white">
                          {characterId.replace(`${characterType}_`, '')}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Sprite Display */}
          <View className="w-full items-center">
            <Text className="mb-2 text-lg font-bold text-white">2. Current Character</Text>
            <Text className="mb-4 text-sm text-white">
              {selectedCharacterId} - Current: {currentDisplayedAnimation}
            </Text>
            <PlayerSprite
              key={selectedCharacterId} // Rerender when character changes
              characterId={selectedCharacterId}
              defaultAnimation="idle"
              autoPlay={false}
              spriteRef={spriteRef}
              size={200}
            />
          </View>

          {/* Animation Controls */}
          <View className="w-full">
            <Text className="mb-2 text-lg font-bold text-white">3. Animation Controls</Text>
            <Text className="mb-4 text-sm text-white">
              Available animations for {currentCharacterData.name}:
            </Text>
            <View className="mb-4 flex-row flex-wrap justify-center gap-2">
              {currentCharacterData.animations.map((animation) => (
                <Pressable
                  key={animation}
                  className="rounded bg-blue-600 px-3 py-2"
                  onPress={() => handlePlayAnimation(animation, true)}>
                  <Text className="text-xs font-semibold capitalize text-white">
                    {animation.replace('_', ' ')}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Special Controls */}
            <View className="flex-row flex-wrap justify-center gap-2">
              <Pressable
                className="rounded bg-green-600 px-4 py-2"
                onPress={() => handlePlayAnimation('idle', true)}>
                <Text className="text-sm font-semibold text-white">Start Idle</Text>
              </Pressable>
              <Pressable
                className="rounded bg-red-600 px-4 py-2"
                onPress={() => handlePlayAnimation('attack', false)}>
                <Text className="text-sm font-semibold text-white">Attack (Once)</Text>
              </Pressable>
              <Pressable className="rounded bg-purple-600 px-4 py-2" onPress={handlePlaySequence}>
                <Text className="text-sm font-semibold text-white">Attack → Idle</Text>
              </Pressable>
              <Pressable
                className="rounded bg-orange-600 px-4 py-2"
                onPress={handleBlockHitSequence}>
                <Text className="text-sm font-semibold text-white">Block Hit → Idle</Text>
              </Pressable>
              <Pressable className="rounded bg-red-800 px-4 py-2" onPress={handleDieOnce}>
                <Text className="text-sm font-semibold text-white">Die (Once)</Text>
              </Pressable>
              <Pressable className="rounded bg-gray-600 px-4 py-2" onPress={stopAnimation}>
                <Text className="text-sm font-semibold text-white">Stop</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </StandardSafeLayout>
  );
};

export default PlayerSpriteTestScreen;
