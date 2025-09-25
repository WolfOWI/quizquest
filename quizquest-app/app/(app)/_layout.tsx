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
        name="(tabs)"
        options={{
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
      {/* TODO Remove Test Files Later */}
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
        name="credits"
        options={{
          title: 'Credits',
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
      <Stack.Screen
        name="(story-creation)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(story)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
