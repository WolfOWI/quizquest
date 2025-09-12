import { Stack } from 'expo-router';

export default function StoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="storyDetail"
        options={{
          title: 'Story Details',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(quest)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
