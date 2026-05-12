import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { ActivityCard } from '../../components/shared/ActivityCard';

export default function TabTwoScreen() {
  return (
    <>
    <ActivityCard
      title="Morning Yoga"
      description="Start your day with a refreshing yoga session to boost energy and flexibility."
      iconName="sunny-outline"
      accentColor="#FFB74D"
      onStart={() => console.log('Starting Morning Yoga')}
    />
    </>
  );
}

