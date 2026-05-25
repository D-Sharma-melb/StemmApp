import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TYPOGRAPHY } from "../../../styles/typography";
import { CardContainer } from "../../shared/CardContainer";

export const ParachuteDiagram: React.FC = () => {
  return (
    <CardContainer style={styles.card}>
      <Text style={styles.title}>Parachute Diagram (sketch)</Text>
      <View style={styles.box}>
        <Text style={styles.caption}>Toy attached to parachute</Text>
        <Text style={styles.caption}>Drop height marked</Text>
        <Text style={styles.caption}>Target landing zone on floor</Text>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: 8,
  },
  box: {
    height: 120,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  caption: {
    fontSize: 14,
    color: "#666",
  },
});
