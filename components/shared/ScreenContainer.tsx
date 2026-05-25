import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../styles/colors';
import { SPACING } from '../../styles/spacing';

export const ScreenContainer: React.FC<ViewProps> = ({ children, style }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={[styles.container, style]}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: SPACING.screenPadding,
    backgroundColor: COLORS.background,
  }
});