import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS as colors } from "../../../styles/colors";
import { TYPOGRAPHY as typography } from "../../../styles/typography";

interface DecibelMeterProps {
  decibels: number;
  maxDecibels: number;
}

export function DecibelMeter({ decibels, maxDecibels }: DecibelMeterProps) {
  // Risk evaluation based on provided table
  const getRiskLevel = (db: number) => {
    if (db <= 30) return { label: "No risk", color: "#4CAF50" }; // Whisper
    if (db <= 60) return { label: "Safe", color: "#8BC34A" }; // Conversation
    if (db <= 85) return { label: "Generally safe", color: "#FFC107" }; // Traffic
    if (db <= 90) return { label: "Damage possible", color: "#FF9800" }; // Lawn mower
    if (db <= 100) return { label: "Damage likely", color: "#FF5722" }; // Motorbike
    if (db <= 120) return { label: "Serious damage", color: "#F44336" }; // Nightclub, Siren
    return { label: "Instant damage", color: "#B71C1C" }; // Explosion
  };

  const currentRisk = getRiskLevel(decibels);
  const maxRisk = getRiskLevel(maxDecibels);

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: currentRisk.color }]}>
        <Text style={styles.value}>{decibels}</Text>
        <Text style={styles.unit}>dB</Text>
      </View>
      <Text style={[styles.riskLabel, { color: currentRisk.color }]}>
        {currentRisk.label}
      </Text>
      <View style={styles.maxContainer}>
        <Text style={styles.maxText}>
          Max: {maxDecibels} dB - {maxRisk.label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.card,
  },
  value: {
    ...typography.score,
    fontSize: 48,
    color: colors.text,
  },
  unit: {
    ...typography.cardTitle,
    color: colors.subText,
  },
  riskLabel: {
    ...typography.sectionTitle,
    marginTop: 16,
  },
  maxContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
  },
  maxText: {
    ...typography.body,
    color: colors.subText,
  },
});
