import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../styles/typography";
import { ResultCard } from "../shared";

export function RecentResults() {
  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Recent Results</Text>
      <ResultCard
        score={850}
        summary="Great accuracy in the Earthquake simulation!"
      />
      <View style={{ height: 12 }} />
      <ResultCard score={400} summary="Reaction time: 0.25s. Good job!" />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
});
