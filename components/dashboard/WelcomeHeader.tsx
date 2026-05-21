import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../styles/typography";

export function WelcomeHeader() {
  return (
    <View style={styles.headerSection}>
      <Text style={TYPOGRAPHY.screenTitle}>Hello, Team Alpha! 👋</Text>
      <Text style={TYPOGRAPHY.subText}>Ready for today's STEMM adventure?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    marginBottom: 24,
  },
});
