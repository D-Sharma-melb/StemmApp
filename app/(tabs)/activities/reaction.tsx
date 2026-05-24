import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TapReaction } from "../../../components/activity/reaction/TapReaction";
import { TracingChallenge } from "../../../components/activity/reaction/TracingChallenge";
import { ActivityLayout } from "../../../components/shared/ActivityLayout";
import { AppButton } from "../../../components/shared/AppButton";
import { auth } from "../../../config/firebase";
import { saveAttempt } from "../../../services/firebase/attempts";
import { COLORS as colors } from "../../../styles/colors";
import { TYPOGRAPHY as typography } from "../../../styles/typography";

export default function ReactionActivity() {
  const router = useRouter();
  const user = auth.currentUser;

  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1); // 4 = results
  const [results, setResults] = useState<{
    dominant?: number;
    nonDominant?: number;
    tracing?: number;
  }>({});
  const [isSaving, setIsSaving] = useState(false);

  const handlePhase1Complete = (time: number) => {
    setResults((prev) => ({ ...prev, dominant: time }));
    setPhase(2);
  };

  const handlePhase2Complete = (time: number) => {
    setResults((prev) => ({ ...prev, nonDominant: time }));
    setPhase(3);
  };

  const handlePhase3Complete = (time: number) => {
    setResults((prev) => ({ ...prev, tracing: time }));
    setPhase(4);
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "Must be logged in to save attempts.");
      return;
    }

    setIsSaving(true);
    try {
      // Calculate a combined score: lower is better, so maybe return a string or inversely mapped score
      // We will save raw MS in metadata. Score can just be dominant tap time for leaderboard purposes.
      const bestScore = results.dominant || 0;

      await saveAttempt({
        activityId: "reaction_board",
        userId: user.uid,
        teamId: null,
        score: bestScore,
        metadata: {
          ...results,
        },
      });

      router.push({
        pathname: "/(tabs)/activities/results",
        params: {
          score: bestScore.toString(),
          metric: "ms",
          activityType: "Reaction Board Challenge",
        },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save activity data");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActivityLayout
        title="Reaction Board Challenge"
        instructions="Measure reaction time and coordination"
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Your Progress:</Text>
            <Text>
              Dominant Hand:{" "}
              {results.dominant ? `${results.dominant} ms` : "---"}
            </Text>
            <Text>
              Non-Dominant:{" "}
              {results.nonDominant ? `${results.nonDominant} ms` : "---"}
            </Text>
            <Text>
              Tracing: {results.tracing ? `${results.tracing} ms` : "---"}
            </Text>
          </View>

          {phase === 1 && (
            <TapReaction
              title="Phase 1: Your Dominant Hand"
              onComplete={handlePhase1Complete}
            />
          )}

          {phase === 2 && (
            <TapReaction
              title="Phase 2: Your Non-Dominant Hand"
              onComplete={handlePhase2Complete}
            />
          )}

          {phase === 3 && (
            <TracingChallenge onComplete={handlePhase3Complete} />
          )}

          {phase === 4 && (
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Challenge Complete!</Text>

              <View style={styles.comparisonBox}>
                <Text style={styles.comparisonTitle}>How did you do?</Text>
                <Text style={styles.comparisonText}>
                  Your non-dominant hand was{" "}
                  {results.nonDominant && results.dominant
                    ? Math.abs(results.nonDominant - results.dominant)
                    : 0}{" "}
                  ms{" "}
                  {(results.nonDominant || 0) > (results.dominant || 0)
                    ? "slower"
                    : "faster"}{" "}
                  than your dominant hand.
                </Text>
                <Text style={styles.comparisonText}>
                  Tracing took {results.tracing} ms.
                </Text>
              </View>

              <AppButton
                title={isSaving ? "Saving..." : "Finish & Save"}
                onPress={handleSubmit}
                variant="primary"
                disabled={isSaving}
              />
            </View>
          )}
        </ScrollView>
      </ActivityLayout>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
  resultsHeader: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultsTitle: {
    ...typography.cardTitle,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  summaryTitle: {
    ...typography.screenTitle,
    color: colors.primary,
    marginBottom: 20,
  },
  comparisonBox: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    width: "100%",
    marginBottom: 20,
  },
  comparisonTitle: {
    ...typography.sectionTitle,
    marginBottom: 10,
  },
  comparisonText: {
    ...typography.body,
    marginBottom: 8,
  },
});
