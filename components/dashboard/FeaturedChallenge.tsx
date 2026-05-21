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
        title="Design a Parachute"
        description="Use basic materials to create a parachute that can safely land a small object."
        iconName="flask-outline"
        accentColor={COLORS.primary}
        onStart={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
});
