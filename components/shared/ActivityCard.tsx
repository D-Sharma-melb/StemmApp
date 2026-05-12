import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardContainer } from './CardContainer';
import { AppButton } from './AppButton';
import { TYPOGRAPHY } from '../../styles/typography';
import { SPACING } from '../../styles/spacing';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

interface Props {
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  accentColor: string;
  onStart: () => void;
}

export const ActivityCard: React.FC<Props> = ({ title, description, iconName, accentColor, onStart }) => (
  <CardContainer style={styles.container}>
    <View style={[styles.accent, { backgroundColor: accentColor }]} />
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={32} color={accentColor} />
      </View>
      <Text style={[TYPOGRAPHY.cardTitle, styles.title]}>{title}</Text>
      <Text style={[TYPOGRAPHY.body, styles.desc]}>{description}</Text>
      <AppButton title="Start" onPress={onStart} />
    </View>
  </CardContainer>
);

const styles = StyleSheet.create({
  container: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: SPACING.sectionGap,
  },
  accent: {
    height: 8,
    width: '100%',
  },
  content: {
    padding: SPACING.cardPadding,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
  },
  desc: {
    color: COLORS.subText,
    marginBottom: 20,
    fontSize: 14,
  }
});