import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { ResultCard } from "../components/ResultCard";
import { ScoreDisplay } from "../components/ScoreDisplay";
import { ScreenContainer } from "../components/ScreenContainer";
import { useSoundMeter } from "../hooks/useSoundMeter";

export default function SoundPollutionHunterScreen() {
  const {
    status,
    soundLevel,
    readings,
    average,
    max,
    soundCategory,
    startMeter,
    stopMeter,
    resetReadings,
  } = useSoundMeter();

  const meterWidth =
    soundLevel === null ? "0%" : `${Math.min(soundLevel, 100)}%`;

  return (
    <ScreenContainer>
      <Text style={styles.title}>Sound Pollution Hunter</Text>

      <Text style={styles.subtitle}>
        Use the microphone to detect sound intensity and identify quiet,
        moderate, and loud environments.
      </Text>

      <View style={styles.meterCard}>
        <Text style={styles.label}>Live Sound Level</Text>

        <Text style={styles.dbText}>
          {soundLevel === null ? "--" : soundLevel} dB
        </Text>

        <View style={styles.meterBackground}>
          <View style={[styles.meterFill, { width: meterWidth }]} />
        </View>

        <Text style={styles.category}>{soundCategory}</Text>
      </View>

      <View style={styles.scoreRow}>
        <ScoreDisplay
          score={`Average: ${average === null ? "--" : average + " dB"}`}
        />
        <ScoreDisplay score={`Max: ${max === null ? "--" : max + " dB"}`} />
      </View>

      <View style={styles.scoreRow}>
        <ScoreDisplay score={`Readings: ${readings.length}`} />
        <ScoreDisplay score={`Status: ${status}`} />
      </View>

      {status !== "listening" ? (
        <AppButton
          title="Start Listening"
          onPress={startMeter}
          style={styles.button}
        />
      ) : (
        <AppButton
          title="Stop Listening"
          onPress={stopMeter}
          style={styles.button}
        />
      )}

      <AppButton
        title="Reset Readings"
        onPress={resetReadings}
        variant="secondary"
        style={styles.button}
      />

      {soundLevel !== null && (
        <ResultCard
          score={`${soundLevel} dB`}
          summary={`The current environment is classified as: ${soundCategory}. Students can compare sound levels from different activities and locations.`}
        />
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>STEMM Learning Link</Text>
        <Text style={styles.infoText}>
          This feature supports environmental science by helping students
          measure classroom noise, compare sound levels, and understand how
          prolonged loud sounds may affect concentration and hearing health.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  meterCard: {
    backgroundColor: "white",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "700",
  },
  dbText: {
    fontSize: 46,
    fontWeight: "900",
    marginVertical: 12,
  },
  meterBackground: {
    height: 18,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 12,
  },
  category: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 12,
  },
  button: {
    marginTop: 14,
  },
  infoBox: {
    marginTop: 22,
    backgroundColor: "#EAF2FF",
    borderRadius: 18,
    padding: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4F46E5",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 20,
  },
});
