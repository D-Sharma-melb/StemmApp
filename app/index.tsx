import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

export default function SplashScreen() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate checking authentication state
    setTimeout(() => {
      setIsLoggedIn(false); // Change to true to test logged-in state
      setIsReady(true);
    }, 1500);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8F0' }}>
        <ActivityIndicator size='large' color='#FF8A65' />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href='/(tabs)' />;
  } else {
    return <Redirect href='/(auth)/login' />;
  }
}