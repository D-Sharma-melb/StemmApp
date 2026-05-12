import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  message: string;
}

export const EmptyState: React.FC<Props> = ({ icon = "planet-outline", message }) => (
  <View style={styles.container}>
    <Ionicons name={icon} size={80} color={COLORS.primaryLight} />
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    marginTop: 16,
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.subText,
    textAlign: 'center',
  }
});