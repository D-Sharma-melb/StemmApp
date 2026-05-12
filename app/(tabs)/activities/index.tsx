import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function ActivitiesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Activities</Text>
      <Button title='Reaction' onPress={() => router.push('/(tabs)/activities/reaction')} />
      <Button title='Sound' onPress={() => router.push('/(tabs)/activities/sound')} />
    </View>
  );
}