import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { COLORS } from '../../styles/colors';
import { SHADOWS } from '../../styles/shadows';
import { SPACING } from '../../styles/spacing';

export const CardContainer: React.FC<ViewProps> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: SPACING.cardPadding,
    ...SHADOWS.card,
  }
});