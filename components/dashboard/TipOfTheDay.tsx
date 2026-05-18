import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../styles/typography";
import { CardContainer } from "../shared";

export function TipOfTheDay() {
  return (
    <View style={styles.section}>
      <Text style={TYPOGRAPHY.sectionTitle}>Tip of the Day</Text>
      <CardContainer>
        <Text style={TYPOGRAPHY.body}>
          "Collaboration is key! Make sure to discuss your ideas with your team
          before starting an experiment."
        </Text>
      </CardContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
});
