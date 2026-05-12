import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button title='Go to Register' onPress={() => router.push('/(auth)/register')} />
      <Button title='Login & Go to App' onPress={() => router.replace('/(tabs)')} />
    </View>
  );
}