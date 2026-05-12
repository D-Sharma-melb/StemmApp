import { Stack } from 'expo-router';

export default function ActivitiesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='reaction' />
      <Stack.Screen name='sound' />
      <Stack.Screen name='earthquake' />
      <Stack.Screen name='breathing' />
      <Stack.Screen name='results' />
    </Stack>
  );
}