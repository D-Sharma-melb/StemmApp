import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { TYPOGRAPHY } from "../../styles/typography";
import { ActivityCard } from "../shared";

export function FeaturedChallenge() {
  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Featured Challenge</Text>
      <ActivityCard
        title="Earthquake "
        description="Use accelerometer to measure vibrations and simulate an earthquake."
        iconName="flask-outline"
        accentColor={COLORS.primary}
        onStart={() => router.push("/(tabs)/activities/earthquake")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
});
