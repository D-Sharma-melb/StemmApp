import { router } from "expo-router";
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
            title="Earthquake Simulation"
            description="Measure vibration."
            iconName="pulse-outline"
            accentColor="#BA68C8"
            onStart={() => router.push("/(tabs)/activities/earthquake")}
          />
        </View>
        <View style={styles.quickActivityWrapper}>
          <ActivityCard
            title="Reaction Test"
            description="Test your reaction time."
            iconName="timer-outline"
            accentColor="#4DB6AC"
            onStart={() => router.push("/(tabs)/activities/reaction")}
          />
        </View>
        <View style={styles.quickActivityWrapper}>
          <ActivityCard
            title="Sound Meter"
            description="Measure decibels."
            iconName="mic-outline"
            accentColor="#FF8A65"
            onStart={() => router.push("/(tabs)/activities/sound")}
          />
        </View>
        <View style={styles.quickActivityWrapper}>
          <ActivityCard
            title="Breathing Exercise"
            description="Practice deep breathing."
            iconName="heart-outline"
            accentColor="#81C784"
            onStart={() => router.push("/(tabs)/activities/breathing")}
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
