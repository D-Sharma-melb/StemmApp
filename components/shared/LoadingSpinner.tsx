import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

interface Props {
  text?: string;
}

export const LoadingSpinner: React.FC<Props> = ({ text }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
    {text && <Text style={styles.text}>{text}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#757575',
  }
});