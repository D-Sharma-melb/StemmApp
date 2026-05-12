import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import { TYPOGRAPHY } from '../../styles/typography';
import { CardContainer } from './CardContainer';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

export const SensorDataCard: React.FC<Props> = ({ icon, label, value }) => (
  <CardContainer style={styles.container}>
    <Ionicons name={icon} size={28} color={COLORS.secondary} />
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </CardContainer>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    ...TYPOGRAPHY.subText,
  },
  value: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: COLORS.text,
  }
});