import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";
import { CardContainer } from "./CardContainer";

interface Props {
  rank: number;
  teamName: string;
  score: number;
  subtitle?: string;
}

export const LeaderboardCard: React.FC<Props> = ({
  rank,
  teamName,
  score,
  subtitle,
}) => {
  let rankColor = COLORS.text;
  if (rank === 1)
    rankColor = "#FFD700"; // Gold
  else if (rank === 2)
    rankColor = "#C0C0C0"; // Silver
  else if (rank === 3) rankColor = "#CD7F32"; // Bronze

  return (
    <CardContainer style={styles.container}>
      <View style={[styles.rankCircle, { borderColor: rankColor }]}>
        <Text style={[styles.rankText, { color: rankColor }]}>#{rank}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.teamName}>{teamName}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <Text style={styles.score}>{score} pts</Text>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 12,
  },
  rankCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  teamName: {
    ...TYPOGRAPHY.cardTitle,
    fontSize: 16,
  },
  subtitle: {
    ...TYPOGRAPHY.subText,
    fontSize: 12,
    marginTop: 2,
  },
  score: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: COLORS.primary,
  },
});
