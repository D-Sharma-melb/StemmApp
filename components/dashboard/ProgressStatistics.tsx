import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../styles/typography";
import { CardContainer, TimerDisplay } from "../shared";

export function ProgressStatistics() {
  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Weekly Progress</Text>
      <CardContainer>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={TYPOGRAPHY.subText}>Activities Completed</Text>
            <Text style={TYPOGRAPHY.cardTitle}>12 / 15</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={TYPOGRAPHY.subText}>Time Spent</Text>
            <TimerDisplay time="04:30" />
          </View>
        </View>
      </CardContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
});
