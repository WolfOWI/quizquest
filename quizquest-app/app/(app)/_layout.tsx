import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="start"
        options={{
          title: 'Start',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="spriteTests"
        options={{
          title: 'Sprite Tests',
          headerShown: false,
        }}
      />
      {/* TODO Hide / Remove later */}
      <Stack.Screen
        name="playerSpriteTest"
        options={{
          title: 'Player Sprite Test',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="enemySpriteTest"
        options={{
          title: 'Enemy Sprite Test',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="battleSpriteTest"
        options={{
          title: 'Battle Sprite Test',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
