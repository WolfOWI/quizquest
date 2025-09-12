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
        name="questResult"
        options={{
          title: 'Quest Result',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
