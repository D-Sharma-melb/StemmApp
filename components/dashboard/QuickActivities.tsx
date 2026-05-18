import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../styles/typography";
import { ActivityCard } from "../shared";

export function QuickActivities() {
  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Quick Activities</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.quickActivityWrapper}>
          <ActivityCard
            title="Reaction Test"
            description="Test your reaction time."
            iconName="timer-outline"
            accentColor="#4DB6AC"
            onStart={() => {}}
          />
        </View>
        <View style={styles.quickActivityWrapper}>
          <ActivityCard
            title="Sound Meter"
            description="Measure decibels."
            iconName="mic-outline"
            accentColor="#FF8A65"
            onStart={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  quickActivityWrapper: {
    width: 280,
    marginRight: 16,
  },
});
