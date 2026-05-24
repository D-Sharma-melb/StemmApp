import React from "react";
import { StyleSheet, Text } from "react-native";
import { TYPOGRAPHY } from "../../../styles/typography";
import { CardContainer } from "../../shared/CardContainer";

interface Props {
  vibration: number;
}

export const ShakeMeter: React.FC<Props> = ({ vibration }) => {
  let status = "SAFE";
  let color = "#4CAF50";

  if (vibration > 0.8) {
    status = "UNSTABLE";
    color = "#F44336";
  } else if (vibration > 0.3) {
    status = "WARNING";
    color = "#FF9800";
  }

  return (
    <CardContainer
      style={[styles.container, { borderColor: color, borderWidth: 2 }]}
    >
      <Text style={[styles.statusText, { color }]}>{status}</Text>
      <Text style={styles.valueText}>
        Current Force: {vibration.toFixed(2)}G
      </Text>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  statusText: {
    ...TYPOGRAPHY.screenTitle,
    fontSize: 28,
    marginBottom: 8,
  },
  valueText: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
  },
});
