import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../styles/typography";
import { LeaderboardCard } from "../shared";

export function LeaderboardPreview() {
  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Top Teams</Text>
      <LeaderboardCard rank={1} teamName="Tech Titans" score={5200} />
      <LeaderboardCard rank={2} teamName="Science Squad" score={4800} />
      <LeaderboardCard rank={3} teamName="Math Magicians" score={4650} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
});
