import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TYPOGRAPHY } from '../../styles/typography';
import { COLORS } from '../../styles/colors';

interface Props {
  title: string;
  onBack?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}

export const AppHeader: React.FC<Props> = ({ title, onBack, rightIcon, onRightPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} disabled={!onBack} style={styles.iconButton}>
      {onBack && <Ionicons name="arrow-back" size={24} color={COLORS.text} />}
    </TouchableOpacity>
    
    <Text style={styles.title}>{title}</Text>
    
    <TouchableOpacity onPress={onRightPress} disabled={!rightIcon} style={styles.iconButton}>
      {rightIcon && <Ionicons name={rightIcon} size={24} color={COLORS.text} />}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  title: {
    ...TYPOGRAPHY.screenTitle,
    fontSize: 24, // Explicitly requesting 24px SemiBold from prompt
  },
  iconButton: {
    width: 40,
    alignItems: 'center',
  }
});