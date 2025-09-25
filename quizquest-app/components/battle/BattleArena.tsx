import React from 'react';
import { View, ImageBackground, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PlayerSprite from '@/components/sprites/PlayerSprite';
import EnemySprite from '@/components/sprites/EnemySprite';
import { useSpriteAnimation } from '@/lib/hooks/useSpriteAnimation';

interface BattleArenaProps {
  // Arena dimensions
  height?: number;
  width?: number | string;

  // Character configuration
  playerId: string;
  enemyId: string;
  playerSize?: number;
  enemySize?: number;
  spriteDistance?: number;
  spriteScale?: number;

  // Animation configuration
  playerDefaultAnimation?: string;
  enemyDefaultAnimation?: string;
  playerLoop?: boolean;
  enemyLoop?: boolean;
  playerFps?: number;
  enemyFps?: number;

  // Background configuration
  backgroundImage?: ImageSourcePropType;

  // Overlay configuration
  showGradientOverlay?: boolean;

  // Additional styling
  containerStyle?: any;
  playerStyle?: any;
  enemyStyle?: any;

  // Animation refs (optional - for external control)
  playerSpriteRef?: any;
  enemySpriteRef?: any;

  // Auto-play configuration
  autoPlay?: boolean;
}

const BattleArena: React.FC<BattleArenaProps> = ({
  // Default dimensions
  height = 250,
  width,

  // Character defaults
  playerId = 'heavyKnight_red',
  enemyId = 'goblin_default',
  playerSize = 150,
  enemySize = 150,
  spriteDistance = 200,
  spriteScale = 1.0,

  // Animation defaults
  playerDefaultAnimation = 'idle',
  enemyDefaultAnimation = 'idle',
  playerLoop = true,
  enemyLoop = true,
  playerFps = 10,
  enemyFps = 10,

  // Background defaults
  backgroundImage,

  // Overlay defaults
  showGradientOverlay = false,

  // Styling
  containerStyle,
  playerStyle,
  enemyStyle,

  // Animation refs
  playerSpriteRef,
  enemySpriteRef,

  // Auto-play
  autoPlay = true,
}) => {
  // Calculate arena width if not provided
  const arenaWidth = width || spriteDistance + Math.max(enemySize, playerSize) * spriteScale;

  return (
    <View
      className="bg-black-500 relative items-center justify-end"
      style={[
        {
          height,
          width: arenaWidth,
          minHeight: height,
        },
        containerStyle,
      ]}>
      {/* Background Image */}
      {backgroundImage && (
        <ImageBackground source={backgroundImage} resizeMode="cover" className="absolute inset-0" />
      )}

      {/* Top Darkened Gradient Overlay */}
      {showGradientOverlay && (
        <LinearGradient
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.8)', 'transparent']}
          locations={[0, 0.5, 1]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            height: height / 2,
          }}
        />
      )}

      {/* Enemy Sprite */}
      <View
        className="absolute items-center justify-end"
        style={{
          left: 0,
          bottom: 16,
          width: spriteDistance / 2,
          height,
          zIndex: 3,
        }}>
        <EnemySprite
          key={enemyId}
          variantId={enemyId}
          defaultAnimation={enemyDefaultAnimation}
          autoPlay={autoPlay}
          spriteRef={enemySpriteRef}
          size={enemySize * spriteScale}
          loop={enemyLoop}
          fps={enemyFps}
          styles={[
            {
              position: 'relative',
            },
            enemyStyle,
          ]}
        />
      </View>

      {/* Player Sprite */}
      <View
        className="absolute items-center justify-end"
        style={{
          right: 0,
          bottom: 16,
          width: spriteDistance / 2,
          height,
          zIndex: 3,
        }}>
        <PlayerSprite
          key={playerId}
          variantId={playerId}
          defaultAnimation={playerDefaultAnimation}
          autoPlay={autoPlay}
          spriteRef={playerSpriteRef}
          size={playerSize * spriteScale}
          loop={playerLoop}
          fps={playerFps}
          styles={[
            {
              position: 'relative',
            },
            playerStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default BattleArena;
