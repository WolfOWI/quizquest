import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import EnemySprite from '@/components/sprites/EnemySprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';
import { getEnemyGroups } from '@/lib/content';
import { getSpriteData } from '@/lib/utils/spriteUtils';

const EnemySpriteTestScreen = () => {
  const { spriteRef, playAnimation, play2AnimationSequence, stopAnimation } = useSpriteAnimation();

  const [selectedEnemyId, setSelectedEnemyId] = useState('bushMonster_default');
  const [currentDisplayedAnimation, setCurrentDisplayedAnimation] = useState('idle');

  const backgroundTexture = require('@/assets/textures/bricks_castle.png');

  // Get enemy variants from content using proper content utilities
  const enemyGroups = getEnemyGroups();

  const handleEnemyChange = (enemyId: string) => {
    setSelectedEnemyId(enemyId);
  };

  const handlePlayAnimation = (animation: string, loop: boolean = true) => {
    setCurrentDisplayedAnimation(animation);
    stopAnimation();
    setTimeout(() => {
      playAnimation(animation, loop, 10);
    }, 50);
  };

  const handleAttackIdleSequence = () => {
    setCurrentDisplayedAnimation('attack → idle');
    stopAnimation();
    setTimeout(() => {
      play2AnimationSequence(['attack', 'idle'], selectedEnemyId, true, 10);
    }, 50);
  };

  const handleHitIdleSequence = () => {
    setCurrentDisplayedAnimation('hit → idle');
    stopAnimation();
    setTimeout(() => {
      play2AnimationSequence(['hit', 'idle'], selectedEnemyId, true, 10);
    }, 50);
  };

  const handleDieOnce = () => {
    setCurrentDisplayedAnimation('die');
    stopAnimation();
    setTimeout(() => {
      playAnimation('die', false, 10);
    }, 50);
  };

  // Get current enemy data
  const currentEnemyData = getSpriteData(selectedEnemyId);

  // Auto-start idle animation when component mounts or enemy changes
  useEffect(() => {
    const timer = setTimeout(() => {
      playAnimation('idle', true, 10);
    }, 100); // Small delay to ensure sprite is ready

    return () => clearTimeout(timer);
  }, [selectedEnemyId, playAnimation]);

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4}>
      <TopAppBar
        title="Enemies"
        titleCenter
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
      />
      <ScrollView className="flex-1 p-4">
        <View className="items-center space-y-6">
          {/* Enemy Selection */}
          <View className="w-full">
            <Text className="mb-2 text-lg font-bold text-white">1. Select Enemy Skin</Text>
            <ScrollView className="max-h-40">
              {Object.entries(enemyGroups).map(([enemyType, enemies]) => (
                <View key={enemyType} className="mb-4">
                  <Text className="mb-2 text-sm font-semibold capitalize text-yellow-400">
                    {enemyType.replace('_', ' ')}
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {enemies.map((enemy) => (
                      <Pressable
                        key={enemy.id}
                        className={`rounded px-3 py-2 ${
                          selectedEnemyId === enemy.id ? 'bg-yellow-600' : 'bg-gray-600'
                        }`}
                        onPress={() => handleEnemyChange(enemy.id)}>
                        <Text className="text-xs text-white">
                          {enemy.id.replace(`${enemyType}_`, '')}
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
            <Text className="mb-2 text-lg font-bold text-white">2. Current Enemy</Text>
            <Text className="mb-4 text-sm text-white">
              {selectedEnemyId} - Current: {currentDisplayedAnimation}
            </Text>
            <EnemySprite
              key={selectedEnemyId} // Rerender when enemy changes
              variantId={selectedEnemyId}
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
              Available animations for {selectedEnemyId}:
            </Text>
            <View className="mb-4 flex-row flex-wrap justify-center gap-2">
              {Object.keys(currentEnemyData.animations).map((animation: string) => (
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
                className="rounded bg-purple-600 px-4 py-2"
                onPress={handleAttackIdleSequence}>
                <Text className="text-sm font-semibold text-white">Attack → Idle</Text>
              </Pressable>
              <Pressable
                className="rounded bg-orange-600 px-4 py-2"
                onPress={handleHitIdleSequence}>
                <Text className="text-sm font-semibold text-white">Hit → Idle</Text>
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

export default EnemySpriteTestScreen;
