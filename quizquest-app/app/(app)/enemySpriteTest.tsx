import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import EnemySprite from '@/components/sprites/EnemySprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';
import { EnemyData } from '@/lib/constants/sprites/EnemySpriteData';
import { getSpriteData } from '@/lib/utils/spriteUtils';

const EnemySpriteTestScreen = () => {
  const { spriteRef, playAnimation, play2AnimationSequence, stopAnimation } = useSpriteAnimation();

  const [selectedEnemyId, setSelectedEnemyId] = useState('bushMonster_default');
  const [currentDisplayedAnimation, setCurrentDisplayedAnimation] = useState('idle');

  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');

  const enemyGroups = {
    bushMonster: EnemyData.bushMonster.skins,
    skeleton: EnemyData.skeleton.skins,
    goblin: EnemyData.goblin.skins,
  };

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
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
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
              {Object.entries(enemyGroups).map(([enemyType, skins]) => (
                <View key={enemyType} className="mb-4">
                  <Text className="mb-2 text-sm font-semibold capitalize text-yellow-400">
                    {enemyType.replace('_', ' ')}
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {skins.map((enemyId: string) => (
                      <TouchableOpacity
                        key={enemyId}
                        className={`rounded px-3 py-2 ${
                          selectedEnemyId === enemyId ? 'bg-yellow-600' : 'bg-gray-600'
                        }`}
                        onPress={() => handleEnemyChange(enemyId)}>
                        <Text className="text-xs text-white">
                          {enemyId.replace(`${enemyType}_`, '')}
                        </Text>
                      </TouchableOpacity>
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
              characterId={selectedEnemyId}
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
              Available animations for {currentEnemyData.name}:
            </Text>
            <View className="mb-4 flex-row flex-wrap justify-center gap-2">
              {currentEnemyData.animations.map((animation: string) => (
                <TouchableOpacity
                  key={animation}
                  className="rounded bg-blue-600 px-3 py-2"
                  onPress={() => handlePlayAnimation(animation, true)}>
                  <Text className="text-xs font-semibold capitalize text-white">
                    {animation.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Special Controls */}
            <View className="flex-row flex-wrap justify-center gap-2">
              <TouchableOpacity
                className="rounded bg-green-600 px-4 py-2"
                onPress={() => handlePlayAnimation('idle', true)}>
                <Text className="text-sm font-semibold text-white">Start Idle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded bg-purple-600 px-4 py-2"
                onPress={handleAttackIdleSequence}>
                <Text className="text-sm font-semibold text-white">Attack → Idle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded bg-orange-600 px-4 py-2"
                onPress={handleHitIdleSequence}>
                <Text className="text-sm font-semibold text-white">Hit → Idle</Text>
              </TouchableOpacity>
              <TouchableOpacity className="rounded bg-red-800 px-4 py-2" onPress={handleDieOnce}>
                <Text className="text-sm font-semibold text-white">Die (Once)</Text>
              </TouchableOpacity>
              <TouchableOpacity className="rounded bg-gray-600 px-4 py-2" onPress={stopAnimation}>
                <Text className="text-sm font-semibold text-white">Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </StandardSafeLayout>
  );
};

export default EnemySpriteTestScreen;
