import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../styles/typography";
import { EmptyState } from "../shared";

export function UpcomingChallenge() {
  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Upcoming</Text>
      <EmptyState
        icon="calendar-outline"
        message="Math Marathon begins entirely online this Friday!"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
});
