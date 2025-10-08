import { Stack } from 'expo-router';

export default function QuestLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="questRun"
        options={{
          title: 'Quest Run',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="questVictory"
        options={{
          title: 'Quest Victory',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="questDefeat"
        options={{
          title: 'Quest Defeat',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="levelUp"
        options={{
          title: 'Level Up',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
