import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '../../styles/typography';

interface Props {
  score: number | string;
  color?: string;
  style?: any;
}

export const ScoreDisplay: React.FC<Props> = ({ score, color, style }) => (
  <Text style={[TYPOGRAPHY.score, color ? { color } : null, style]}>
    {score}
  </Text>
);