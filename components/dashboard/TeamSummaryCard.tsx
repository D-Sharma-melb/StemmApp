import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";
import { CardContainer, ScoreDisplay } from "../shared";

export function TeamSummaryCard() {
  return (
    <View style={styles.section}>
      <CardContainer style={styles.rowCard}>
        <View style={styles.statItem}>
          <Text style={TYPOGRAPHY.cardTitle}>Global Rank</Text>
          <Text style={[TYPOGRAPHY.screenTitle, { color: COLORS.primary }]}>
            #4
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={TYPOGRAPHY.cardTitle}>Total Score</Text>
          <ScoreDisplay score="4,250" color={COLORS.secondary} />
        </View>
      </CardContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
});
