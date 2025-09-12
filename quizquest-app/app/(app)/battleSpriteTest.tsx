import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import EnemySprite from '@/components/sprites/EnemySprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';
import { EnemyData } from '@/lib/constants/sprites/EnemySpriteData';
import { getAnimationDuration, getSpriteData } from '@/lib/utils/spriteUtils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CharacterData } from '@/lib/constants/sprites/PlayerSpriteData';
import PlayerSprite from '@/components/sprites/PlayerSprite';

const BattleSpriteTestScreen = () => {
  const {
    spriteRef: enemySpriteRef,
    playAnimation: playEnemyAnimation,
    play2AnimationSequence: playEnemySequence,
    stopAnimation: stopEnemyAnimation,
  } = useSpriteAnimation();
  const {
    spriteRef: playerSpriteRef,
    playAnimation: playPlayerAnimation,
    play2AnimationSequence: playPlayerSequence,
    stopAnimation: stopPlayerAnimation,
  } = useSpriteAnimation();

  const [selectedEnemyId, setSelectedEnemyId] = useState('bushMonster_default');
  const [selectedPlayerId, setSelectedPlayerId] = useState('heavyKnight_red');
  const [currentEnemyAnimation, setCurrentEnemyAnimation] = useState('idle');
  const [currentPlayerAnimation, setCurrentPlayerAnimation] = useState('idle');

  // Battle container controls
  const [spriteDistance, setSpriteDistance] = useState(200); // Distance between sprites
  const [spriteScale, setSpriteScale] = useState(1.0); // Scale factor for both sprites
  const [enemySize, setEnemySize] = useState(150); // Individual enemy size
  const [playerSize, setPlayerSize] = useState(150); // Individual player size

  const backgroundTexture = require('@/assets/textures/bricks_castle.png');

  const enemyGroups = {
    bushMonster: EnemyData.bushMonster.skins,
    skeleton: EnemyData.skeleton.skins,
    goblin: EnemyData.goblin.skins,
  };

  const playerGroups = {
    heavyKnight: CharacterData.heavyKnight.skins,
    samurai: CharacterData.samurai.skins,
    mage: CharacterData.mage.skins,
  };

  // Enemy animation handlers
  const handleEnemyAnimation = (animation: string, loop: boolean = true) => {
    setCurrentEnemyAnimation(animation);
    stopEnemyAnimation();
    setTimeout(() => {
      playEnemyAnimation(animation, loop, 10);
    }, 50);
  };

  const handleEnemyAttackSequence = () => {
    setCurrentEnemyAnimation('attack → idle');
    stopEnemyAnimation();
    setTimeout(() => {
      playEnemySequence(['attack', 'idle'], selectedEnemyId, true, 10);
    }, 50);
  };

  const handleEnemyHitSequence = () => {
    setCurrentEnemyAnimation('hit → idle');
    stopEnemyAnimation();
    setTimeout(() => {
      playEnemySequence(['hit', 'idle'], selectedEnemyId, true, 10);
    }, 50);
  };

  const handleEnemyDie = () => {
    setCurrentEnemyAnimation('die');
    stopEnemyAnimation();
    setTimeout(() => {
      playEnemyAnimation('die', false, 10);
    }, 50);
  };

  // Player animation handlers
  const handlePlayerAnimation = (animation: string, loop: boolean = true) => {
    setCurrentPlayerAnimation(animation);
    stopPlayerAnimation();
    setTimeout(() => {
      playPlayerAnimation(animation, loop, 10);
    }, 50);
  };

  const handlePlayerAttackSequence = () => {
    setCurrentPlayerAnimation('attack → idle');
    stopPlayerAnimation();
    setTimeout(() => {
      playPlayerSequence(['attack', 'idle'], selectedPlayerId, true, 10);
    }, 50);
  };

  const handlePlayerHurtSequence = () => {
    setCurrentPlayerAnimation('hurt → idle');
    stopPlayerAnimation();
    setTimeout(() => {
      playPlayerSequence(['hurt', 'idle'], selectedPlayerId, true, 10);
    }, 50);
  };

  const handlePlayerDie = () => {
    setCurrentPlayerAnimation('die');
    stopPlayerAnimation();
    setTimeout(() => {
      playPlayerAnimation('die', false, 10);
    }, 50);
  };

  // Inter-character animation handlers
  const handleEnemyAttackPlayer = () => {
    stopEnemyAnimation();
    setTimeout(() => {
      handleEnemyAttackSequence();
      setTimeout(
        () => {
          stopPlayerAnimation();
          handlePlayerHurtSequence();
        },
        getAnimationDuration(selectedEnemyId, 'attack', 10) / 2 -
          getAnimationDuration(selectedPlayerId, 'hurt', 10) / 1.2
      );
    }, 50);
  };

  const handlePlayerAttackEnemy = () => {
    stopPlayerAnimation();
    setTimeout(() => {
      handlePlayerAttackSequence();
      setTimeout(
        () => {
          stopEnemyAnimation();
          handleEnemyHitSequence();
        },
        getAnimationDuration(selectedPlayerId, 'attack', 10) / 2 -
          getAnimationDuration(selectedEnemyId, 'hit', 10) / 1.2
      );
    }, 50);
  };

  const handleEnemyDefeatPlayer = () => {
    stopEnemyAnimation();
    setTimeout(() => {
      handleEnemyAttackSequence();
      setTimeout(
        () => {
          stopPlayerAnimation();
          handlePlayerDie();
        },
        getAnimationDuration(selectedEnemyId, 'attack', 10) / 2 -
          getAnimationDuration(selectedPlayerId, 'die', 10) / 3
      );
    }, 50);
  };

  const handlePlayerDefeatEnemy = () => {
    stopPlayerAnimation();
    setTimeout(() => {
      handlePlayerAttackSequence();
      setTimeout(
        () => {
          stopEnemyAnimation();
          handleEnemyDie();
        },
        getAnimationDuration(selectedPlayerId, 'attack', 10) / 1 -
          getAnimationDuration(selectedEnemyId, 'die', 10) / 2
      );
    }, 50);
  };

  const resetBattle = () => {
    stopEnemyAnimation();
    stopPlayerAnimation();
    setTimeout(() => {
      playEnemyAnimation('idle', true, 10);
      playPlayerAnimation('idle', true, 10);
    }, 100);
  };

  // Get current sprite data
  const currentEnemyData = getSpriteData(selectedEnemyId);
  const currentPlayerData = getSpriteData(selectedPlayerId);

  // Auto-start idle animations when component mounts or characters change
  useEffect(() => {
    const timer = setTimeout(() => {
      playEnemyAnimation('idle', true, 10);
      playPlayerAnimation('idle', true, 10);
    }, 100); // Small delay to ensure sprites are ready

    return () => clearTimeout(timer);
  }, [selectedEnemyId, selectedPlayerId, playEnemyAnimation, playPlayerAnimation]);

  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4}>
      <TopAppBar
        title="Battle"
        titleCenter
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
      />
      <ScrollView className="flex-1 p-4">
        <View className="items-center space-y-6">
          {/* Character Selection */}
          <View className="w-full">
            <Text className="mb-4 text-lg font-bold text-white">1. Select Characters</Text>
            <View className="flex-row gap-4">
              {/* Enemy Selection */}
              <View className="flex-1">
                <Text className="mb-2 text-sm font-semibold text-yellow-400">Enemy</Text>
                <Select onValueChange={(e) => setSelectedEnemyId(e?.value ?? '')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an enemy" />
                  </SelectTrigger>
                  <SelectContent className="w-[180px]">
                    <SelectGroup>
                      <SelectLabel>Enemies</SelectLabel>
                      {Object.entries(enemyGroups).map(([enemyType]) => (
                        <SelectItem key={enemyType} label={enemyType} value={enemyType}>
                          {enemyType.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </View>

              {/* Player Selection */}
              <View className="flex-1">
                <Text className="mb-2 text-sm font-semibold text-blue-400">Player</Text>
                <Select onValueChange={(e) => setSelectedPlayerId(e?.value ?? '')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an player" />
                  </SelectTrigger>
                  <SelectContent className="w-[180px]">
                    <SelectGroup>
                      <SelectLabel>Players</SelectLabel>
                      {Object.entries(playerGroups).map(([playerType]) => (
                        <SelectItem key={playerType} label={playerType} value={playerType}>
                          {playerType.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </View>
            </View>
          </View>
          <Text className="mb-2 text-xs text-white">
            {selectedEnemyId} - {currentEnemyAnimation}
          </Text>
          <Text className="mb-2 text-xs text-white">
            {selectedPlayerId} - {currentPlayerAnimation}
          </Text>

          {/* -------------------- Battle Component -------------------- */}

          {/* Battle Container Controls */}
          <View className="w-full">
            <Text className="mb-4 text-lg font-bold text-white">2. Battle Container Settings</Text>
            <View className="mb-4 flex-row gap-4">
              <View className="flex-1">
                <Text className="mb-2 text-sm font-semibold text-white">
                  Distance: {spriteDistance}px
                </Text>
                <View className="flex-row gap-2">
                  <Pressable
                    className="rounded bg-gray-600 px-3 py-1"
                    onPress={() => setSpriteDistance(Math.min(400, spriteDistance + 25))}>
                    <Text className="text-xs text-white">+25</Text>
                  </Pressable>
                  <Pressable
                    className="rounded bg-gray-600 px-3 py-1"
                    onPress={() => setSpriteDistance(Math.max(50, spriteDistance - 25))}>
                    <Text className="text-xs text-white">-25</Text>
                  </Pressable>
                </View>
              </View>
              <View className="flex-1">
                <Text className="mb-2 text-sm font-semibold text-white">
                  Scale: {spriteScale.toFixed(1)}x
                </Text>
                <View className="flex-row gap-2">
                  <Pressable
                    className="rounded bg-gray-600 px-3 py-1"
                    onPress={() => setSpriteScale(Math.max(0.5, spriteScale - 0.1))}>
                    <Text className="text-xs text-white">-0.1</Text>
                  </Pressable>
                  <Pressable
                    className="rounded bg-gray-600 px-3 py-1"
                    onPress={() => setSpriteScale(Math.min(2.0, spriteScale + 0.1))}>
                    <Text className="text-xs text-white">+0.1</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View className="mb-4 flex-row gap-4">
              <View className="flex-1">
                <Text className="mb-2 text-sm font-semibold text-yellow-400">
                  Enemy Size: {enemySize}px
                </Text>
                <View className="flex-row gap-2">
                  <Pressable
                    className="rounded bg-yellow-600 px-3 py-1"
                    onPress={() => setEnemySize(Math.max(50, enemySize - 25))}>
                    <Text className="text-xs text-white">-25</Text>
                  </Pressable>
                  <Pressable
                    className="rounded bg-yellow-600 px-3 py-1"
                    onPress={() => setEnemySize(Math.min(300, enemySize + 25))}>
                    <Text className="text-xs text-white">+25</Text>
                  </Pressable>
                </View>
              </View>
              <View className="flex-1">
                <Text className="mb-2 text-sm font-semibold text-blue-400">
                  Player Size: {playerSize}px
                </Text>
                <View className="flex-row gap-2">
                  <Pressable
                    className="rounded bg-blue-600 px-3 py-1"
                    onPress={() => setPlayerSize(Math.max(50, playerSize - 25))}>
                    <Text className="text-xs text-white">-25</Text>
                  </Pressable>
                  <Pressable
                    className="rounded bg-blue-600 px-3 py-1"
                    onPress={() => setPlayerSize(Math.min(300, playerSize + 25))}>
                    <Text className="text-xs text-white">+25</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* Battle Arena Container */}
          <View
            className="relative w-full items-center justify-end"
            style={{
              height: 250, // Fixed height
              minHeight: 250,
            }}>
            {/* Battle Arena Background (optional visual aid) */}
            <View
              className="absolute rounded-lg border-2 border-gray-500 bg-gray-800/30"
              style={{
                width: spriteDistance + Math.max(enemySize, playerSize) * spriteScale,
                height: 250, // Fixed height to match container
                bottom: 0,
              }}
            />

            {/* Enemy Sprite (Left side) */}
            <View
              className="absolute items-center justify-end"
              style={{
                left: 0,
                bottom: 0,
                width: spriteDistance / 2,
                height: 250, // Fixed height container
              }}>
              <EnemySprite
                key={selectedEnemyId}
                characterId={selectedEnemyId}
                defaultAnimation="idle"
                autoPlay={false}
                spriteRef={enemySpriteRef}
                size={enemySize * spriteScale}
                styles={{
                  // backgroundColor: 'red',
                  position: 'relative',
                }}
              />
            </View>

            {/* Player Sprite (Right side) */}
            <View
              className="absolute items-center justify-end"
              style={{
                right: 0,
                bottom: 0,
                width: spriteDistance / 2,
                height: 250, // Fixed height container
              }}>
              <PlayerSprite
                key={selectedPlayerId}
                characterId={selectedPlayerId}
                defaultAnimation="idle"
                autoPlay={false}
                spriteRef={playerSpriteRef}
                size={playerSize * spriteScale}
                styles={{
                  // backgroundColor: 'blue',
                  position: 'relative',
                }}
              />
            </View>
          </View>
          {/* -------------------- Battle Component -------------------- */}

          {/* Animation Controls */}
          <View className="w-full">
            <Text className="mb-4 text-lg font-bold text-white">3. Animation Controls</Text>
            <Pressable
              className="rounded bg-yellow-600 px-3 py-2"
              onPress={() => handleEnemyAttackPlayer()}>
              <Text className="text-xs font-semibold capitalize text-white">
                Enemy Attack Player
              </Text>
            </Pressable>

            <Pressable
              className="rounded bg-yellow-600 px-3 py-2"
              onPress={() => handlePlayerAttackEnemy()}>
              <Text className="text-xs font-semibold capitalize text-white">
                Player Attack Enemy
              </Text>
            </Pressable>

            <Pressable
              className="rounded bg-yellow-600 px-3 py-2"
              onPress={() => handleEnemyDefeatPlayer()}>
              <Text className="text-xs font-semibold capitalize text-white">
                Enemy Defeat Player
              </Text>
            </Pressable>

            <Pressable
              className="rounded bg-yellow-600 px-3 py-2"
              onPress={() => handlePlayerDefeatEnemy()}>
              <Text className="text-xs font-semibold capitalize text-white">
                Player Defeat Enemy
              </Text>
            </Pressable>

            <Pressable className="rounded bg-yellow-600 px-3 py-2" onPress={() => resetBattle()}>
              <Text className="text-xs font-semibold capitalize text-white">Reset Battle</Text>
            </Pressable>

            {/* Enemy Controls */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-semibold text-yellow-400">
                Enemy ({currentEnemyData.name}) Animations:
              </Text>
              <View className="mb-3 flex-row flex-wrap gap-2">
                {currentEnemyData.animations.map((animation: string) => (
                  <Pressable
                    key={animation}
                    className="rounded bg-yellow-600 px-3 py-2"
                    onPress={() => handleEnemyAnimation(animation, true)}>
                    <Text className="text-xs font-semibold capitalize text-white">
                      {animation.replace('_', ' ')}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <View className="flex-row flex-wrap gap-2">
                <Pressable
                  className="rounded bg-green-600 px-3 py-2"
                  onPress={() => handleEnemyAnimation('idle', true)}>
                  <Text className="text-xs font-semibold text-white">Idle</Text>
                </Pressable>
                <Pressable
                  className="rounded bg-purple-600 px-3 py-2"
                  onPress={handleEnemyAttackSequence}>
                  <Text className="text-xs font-semibold text-white">Attack → Idle</Text>
                </Pressable>
                <Pressable
                  className="rounded bg-orange-600 px-3 py-2"
                  onPress={handleEnemyHitSequence}>
                  <Text className="text-xs font-semibold text-white">Hit → Idle</Text>
                </Pressable>
                <Pressable className="rounded bg-red-800 px-3 py-2" onPress={handleEnemyDie}>
                  <Text className="text-xs font-semibold text-white">Die</Text>
                </Pressable>
                <Pressable className="rounded bg-gray-600 px-3 py-2" onPress={stopEnemyAnimation}>
                  <Text className="text-xs font-semibold text-white">Stop</Text>
                </Pressable>
              </View>
            </View>

            {/* Player Controls */}
            <View>
              <Text className="mb-2 text-sm font-semibold text-blue-400">
                Player ({currentPlayerData.name}) Animations:
              </Text>
              <View className="mb-3 flex-row flex-wrap gap-2">
                {currentPlayerData.animations.map((animation: string) => (
                  <Pressable
                    key={animation}
                    className="rounded bg-blue-600 px-3 py-2"
                    onPress={() => handlePlayerAnimation(animation, true)}>
                    <Text className="text-xs font-semibold capitalize text-white">
                      {animation.replace('_', ' ')}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <View className="flex-row flex-wrap gap-2">
                <Pressable
                  className="rounded bg-green-600 px-3 py-2"
                  onPress={() => handlePlayerAnimation('idle', true)}>
                  <Text className="text-xs font-semibold text-white">Idle</Text>
                </Pressable>
                <Pressable
                  className="rounded bg-purple-600 px-3 py-2"
                  onPress={handlePlayerAttackSequence}>
                  <Text className="text-xs font-semibold text-white">Attack → Idle</Text>
                </Pressable>
                <Pressable
                  className="rounded bg-orange-600 px-3 py-2"
                  onPress={handlePlayerHurtSequence}>
                  <Text className="text-xs font-semibold text-white">Block Hit → Idle</Text>
                </Pressable>
                <Pressable className="rounded bg-gray-600 px-3 py-2" onPress={stopPlayerAnimation}>
                  <Text className="text-xs font-semibold text-white">Stop</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </StandardSafeLayout>
  );
};

export default BattleSpriteTestScreen;
