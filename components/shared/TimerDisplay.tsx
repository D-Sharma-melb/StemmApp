import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

interface Props {
  time: string; // e.g., "01:23"
}

export const TimerDisplay: React.FC<Props> = ({ time }) => (
  <View style={styles.container}>
    <Text style={styles.timeText}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE0D6', // soft background container
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    alignSelf: 'center',
  },
  timeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 36,
    color: COLORS.primary,
  }
});