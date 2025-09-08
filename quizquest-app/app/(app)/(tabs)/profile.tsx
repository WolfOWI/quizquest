import React from 'react';
import { View, Text } from 'react-native';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import TopAppBar from '@/components/navigation/TopAppBar';
import Heading from '@/components/typography/Heading';
import { useAppStore } from '@/lib/state/appStore';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';

const ProfileScreen = () => {
  const { userDoc } = useAppStore();
  const { spriteRef } = useSpriteAnimation();

  return (
    <StandardSafeLayout>
      <TopAppBar title="Profile" titleCenter />
      <View className="flex-1 items-center justify-center px-4">
        <Heading className="mb-4 text-center">Profile</Heading>

        {userDoc && (
          <>
            <Text className="mb-4 text-center text-lg text-gray-600 dark:text-gray-400">
              Welcome, {userDoc.username}!
            </Text>

            {/* Character Display */}
            <View className="mb-6">
              <PlayerSprite
                characterId={userDoc.selections.characterId ?? 'heavyKnight_red'}
                defaultAnimation="idle"
                autoPlay={true}
                spriteRef={spriteRef}
              />
            </View>

            <Text className="text-center text-gray-600 dark:text-gray-400">
              Character: {userDoc.selections.characterId}
            </Text>
          </>
        )}
      </View>
    </StandardSafeLayout>
  );
};

export default ProfileScreen;
