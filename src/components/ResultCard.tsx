import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLORS } from "../../styles/colors";
import { SPACING } from "../../styles/spacing";
import { TYPOGRAPHY } from "../../styles/typography";
import { CardContainer } from "./CardContainer";

interface Props {
  score: number | string;
  summary: string;
}

export const ResultCard: React.FC<Props> = ({ score, summary }) => (
  <CardContainer style={styles.container}>
    <Text style={styles.emoji}>🎉</Text>
    <Text style={TYPOGRAPHY.sectionTitle}>Result</Text>
    <Text style={[TYPOGRAPHY.score, styles.score]}>{score}</Text>
    <Text style={[TYPOGRAPHY.body, styles.summary]}>{summary}</Text>
  </CardContainer>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: SPACING.screenPadding,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  score: {
    marginVertical: 12,
  },
  summary: {
    textAlign: "center",
    color: COLORS.subText,
  },
});
