import { Stack } from 'expo-router';

export default function StoryCreationLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="topicInput" options={{ headerShown: false }} />
      <Stack.Screen name="aiValidation" options={{ headerShown: false }} />
      <Stack.Screen name="topicOptions" options={{ headerShown: false }} />
      <Stack.Screen name="contentGeneration" options={{ headerShown: false }} />
      <Stack.Screen name="storySuccess" options={{ headerShown: false }} />
    </Stack>
  );
}
