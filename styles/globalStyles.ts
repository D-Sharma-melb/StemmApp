import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.screenPadding,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});