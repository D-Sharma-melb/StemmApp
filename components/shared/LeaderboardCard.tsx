import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardContainer } from './CardContainer';
import { TYPOGRAPHY } from '../../styles/typography';
import { COLORS } from '../../styles/colors';

interface Props {
  rank: number;
  teamName: string;
  score: number;
}

export const LeaderboardCard: React.FC<Props> = ({ rank, teamName, score }) => {
  let rankColor = COLORS.text;
  if (rank === 1) rankColor = '#FFD700'; // Gold
  else if (rank === 2) rankColor = '#C0C0C0'; // Silver
  else if (rank === 3) rankColor = '#CD7F32'; // Bronze

  return (
    <CardContainer style={styles.container}>
      <View style={[styles.rankCircle, { borderColor: rankColor }]}>
        <Text style={[styles.rankText, { color: rankColor }]}>#{rank}</Text>
      </View>
      <Text style={styles.teamName}>{teamName}</Text>
      <Text style={styles.score}>{score} pts</Text>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 12,
  },
  rankCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  teamName: {
    flex: 1,
    ...TYPOGRAPHY.body,
    fontFamily: 'Poppins_500Medium',
  },
  score: {
    ...TYPOGRAPHY.body,
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.primary,
  }
});