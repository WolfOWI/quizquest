import { Stack } from 'expo-router';

export default function StoryCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="topicInput" options={{ headerShown: false }} />
    </Stack>
  );
}
