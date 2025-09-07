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
    </Stack>
  );
}
