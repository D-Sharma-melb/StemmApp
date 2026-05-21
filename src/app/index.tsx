import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppButton } from "../components/AppButton";
import { ResultCard } from "../components/ResultCard";
import { ScoreDisplay } from "../components/ScoreDisplay";
import { ScreenContainer } from "../components/ScreenContainer";
import { useReactionTimer } from "../hooks/useReactionTimer";

export default function ReactionChallengeScreen() {
  const {
    status,
    reactionTime,
    bestScore,
    average,
    attempts,
    startChallenge,
    handlePress,
    resetScores,
  } = useReactionTimer();

  const message =
    status === "waiting"
      ? "WAIT..."
      : status === "ready"
        ? "TAP NOW!"
        : status === "early"
          ? "Too Early!"
          : status === "finished"
            ? "Completed!"
            : "Press Start";

  return (
    <ScreenContainer>
      <Text style={styles.title}>Reaction Challenge</Text>

      <Text style={styles.subtitle}>
        Tap as soon as the signal appears and test your reaction speed.
      </Text>

      <TouchableOpacity
        style={[
          styles.challengeBox,
          status === "ready" && styles.readyBox,
          status === "early" && styles.earlyBox,
          status === "waiting" && styles.waitingBox,
        ]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <Text style={styles.challengeText}>{message}</Text>
      </TouchableOpacity>

      <View style={styles.scoreRow}>
        <ScoreDisplay
          score={`Current: ${reactionTime === null ? "--" : reactionTime + " ms"}`}
        />
        <ScoreDisplay
          score={`Best: ${bestScore === null ? "--" : bestScore + " ms"}`}
        />
      </View>

      <View style={styles.scoreRow}>
        <ScoreDisplay
          score={`Average: ${average === null ? "--" : average + " ms"}`}
        />
        <ScoreDisplay score={`Attempts: ${attempts.length}`} />
      </View>

      {reactionTime !== null && (
        <ResultCard
          score={`${reactionTime} ms`}
          summary="Your reaction time has been recorded. Try again to improve your speed."
        />
      )}

      <AppButton
        title={status === "idle" ? "Start Challenge" : "Retry Challenge"}
        onPress={startChallenge}
        style={styles.buttonSpacing}
      />

      <AppButton
        title="Reset Scores"
        onPress={resetScores}
        variant="secondary"
        style={styles.buttonSpacing}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>STEMM Learning Link</Text>
        <Text style={styles.infoText}>
          This activity helps students understand coordination, brain response,
          reaction time, averages, and performance improvement through repeated
          attempts.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "800",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  challengeBox: {
    height: 220,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F46E5",
  },
  readyBox: {
    backgroundColor: "#16A34A",
  },
  earlyBox: {
    backgroundColor: "#DC2626",
  },
  waitingBox: {
    backgroundColor: "#F59E0B",
  },
  challengeText: {
    color: "white",
    fontSize: 38,
    fontWeight: "900",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 14,
  },
  buttonSpacing: {
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
